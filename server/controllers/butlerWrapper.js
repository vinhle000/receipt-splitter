const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs')

const localFilePaths = ['files/FernThaiReceipt.jpg']
const config = require('../../config.js');

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
  console.log('FILE PATHS : ', typeof filePaths)
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
      .catch((error) => console.log(error))

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

// const main = async () => {

//   const uploadId = await uploadFiles(localFilePaths);
//   console.log('UPLOAD ID ---- ', uploadId)
//   const extractionResults = await getExtractionResults(uploadId);


//   extractionResults.items.forEach(documentResult => {
//     const fileName = documentResult.fileName;
//     console.log(`Extraction results from ${fileName}`);

//     console.log('Fields')
//     documentResult.formFields.forEach(field => {
//       const fieldName = field.fieldName;
//       const extractedValue = field.value;

//       console.log(fieldName + ' : ' + extractedValue);
//     })

//     console.log('\n\nTables');
//     documentResult.tables.forEach(table => {
//       console.log('Table name: ' + table.tableName);
//       table.rows.forEach((row, idx) => {
//         let rowResults = 'Row ' + idx + ': \n';
//         row.cells.forEach(cell => {
//           // Add each cells name and extracted value to the row results
//           rowResults += cell.columnName + ': ' + cell.value + ' \n';
//          });

//       console.log(rowResults);
//       });
//     });


//   });

// }

module.exports ={
  uploadFiles,
  getExtractionResults,
}