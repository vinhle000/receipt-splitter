const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');
app.use(express.static('files'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const config = require('../config.js');
const receipt = require('./controllers/receipts.js');




const sampleReceiptData = require('./uploads/harvestWontonJSONResponse.js') // SampleData from meal receipt

const client_id = config.ID;
const client_secret = config.secret;
const username = config.username;
const api_key = config.apiKey;
const categories = ["Meals & Entertainment", "Grocery", "Travel"]
const file_path = 'files/FernThaiReceipt.jpg'


const Client = require('@veryfi/veryfi-sdk');
let veryfiClient = new Client(client_id, client_secret, username, api_key);

// ROUTE Handlers -> controllers
// let data = receiptObj.retrieveItemsFromJson();



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
  // console.log('request from client ', req.file)

  // Download file
  const file_path = `${req.file.destination}/${req.file.filename}`
  console.log('File Path', file_path)

  // =======Send request to VeriFy with filePath  ======
  // let response = await veryfiClient.process_document(file_path); // This may use up limited Documents allowed per month from VeriFy's free tier
  // console.log('RES Body from VeriFy OCR api  ', response)
  // const receiptInfo = await receipt.retrieveItemsFromJsonResponse(response)

  const receiptInfo = await receipt.retrieveItemsFromJsonResponse(sampleReceiptData)


  console.log('RECIEPT INFO: ', receiptInfo)
  res.status(200).send(receiptInfo)
})

app.listen(port, () => {
  console.log('Listening on port', port)
})




   // https://stackoverflow.com/questions/31530200/node-multer-unexpected-field
    // let tmp_path = req.file.path;
    // let target_path  = 'upload/' + req.file.originalname +.jpg

    // let src = await fs.createReadStream(tmp_path);
    // let dest = await fs.createWriteStream(target_path);
    // src.pipe(dest)
    // scr.on('end', () => res.render('complete'));
    // src.on('error', (err) => res.render('error') )
