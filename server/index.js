const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');
app.use(express.static('files'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// const sampleReceiptData = require('./files/sampleButler.json') // SampleData from meal receipt

const config = require('../config.js');
const receipt = require('./controllers/receipts.js');


const fs = require('fs')
const axios = require('axios');
const FormData = require('form-data');

const localFilePaths = ['files/FernThaiReceipt.jpg']




const apiKey = config.apiKey;
const authHeaders = {
  'Authorization': 'Bearer ' + apiKey
};

const apiBaseURL = 'https://app.butlerlabs.ai/api';
const queueID = config.queueID;
const uploadUrl = `${apiBaseURL}/queues/${queueID}/uploads`;


// This async function uploads the files passed to it and returns the id
// needed for fetching results.
// It is used in our main execution function below
const uploadFiles = async (filePaths) => {
  //Prepare file for upload
  const formData = new FormData();
  filePaths.forEach((filePath) => {
    formData.append('files', fs.createReadStream(filePath));
  });


  // Upload files to upload API
  console.log('Uploading files to Bultler for processing')

  const uploadResponse = await axios.post(
      uploadUrl,
      formData,
      {
        headers: {
          ...authHeaders,
          ...formData.getHeaders(),
        }
      })
      .catch((error) => console.log(err))

  // Return the upload ID
  return uploadResponse.data.uploadId;
}


const getExtractionResults = async (uploadId) => {
  const apiBaseURL = 'https://app.butlerlabs.ai/api';
  const queueID = config.queueID;
  const extractionResultsUrl = `https://app.butlerlabs.ai/api/queues/${queueID}/extraction_results`;
  const params = { uploadId };

  // Simple helper function for use while polling on results
  const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

  let extractionResults = null;
  while(!extractionResults) {
    console.log('Fetching extraction results');
    const resultApiResponse = await axios.get(
      extractionResultsUrl,
      { headers: { ...authHeaders}, params, }
    )

    const firstDocument = resultApiResponse.data.items[0];
    const extractionStatus = firstDocument.documentStatus;

    // If extraction has not yuet completed, sleep for 5 seconds
    if ( extractionStatus !== 'Completed') {
      console.log('Extraction still in progress. Sleeping for 5 seconds...');
      await sleep(5 * 1000);

    } else {
      console.log('Extraction results ready');
      return resultApiResponse.data;
    }
  }


}

const main = async () => {

  // const uploadId = await uploadFiles(localFilePaths);
  const extractionResults = await getExtractionResults(uploadId);


  extractionResults.items.forEach(documentResult => {
    const fileName = documentResult.fileName;
    console.log(`Extraction results from ${fileName}`);

    console.log('Fields')
    documentResult.formFields.forEach(field => {
      const fieldName = field.fieldName;
      const extractedValue = field.Value;

      console.log(fieldName + ' : ' + extractedValue);
    })

    console.log('\n\nTables');
    documentResult.tables.forEach(table => {
      console.log('Table name: ' + table.tableName);
      table.rows.forEach((row, idx) => {
        let rowResults = 'Row ' + idx + ': \n';
        row.cells.forEach(cell => {
          // Add each cells name and extracted value to the row results
          rowResults += cell.columnName + ': ' + cell.value + ' \n';
         });

      console.log(rowResults);
      });
    });


  });

}

// main()

const file = fs.createReadStream('files/FernThaiReceipt.jpg')
// SYNC way
// const { Butler } = require('butler-sdk');
// const client = new Butler(apiKey);
// console.log('client', client)
// client.extractFile(queueID, file).then((x) => {
//   console.log(x)
// });









// Reading MIME form data and write data
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads') //for error handling
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = (multer({storage: storage}));


app.post('/uploadfile', upload.single('myFile'), async (req, res, next) => {

  // Download file
  const file_path = `${req.file.destination}/${req.file.filename}`
  console.log('File Path', file_path)



  res.status(200).send(file_path)
})

app.listen(port, () => {
  console.log('Listening on port', port)
})

