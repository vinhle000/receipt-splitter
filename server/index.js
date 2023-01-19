const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('files'));

const config = require('../config.js')
const receipt = require('./controllers/receipts.js')
const receiptObj = new receipt();
const sampleReceiptData = require('./files/sampleData.json') // SampleData from meal receipt

// console.log(JSON.stringify(sampleReceiptData))

const client_id = config.ID;
const client_secret = config.secret;
const username = config.username;
const api_key = config.apiKey;
const categories = ["Meals & Entertainment", "Grocery", "Travel"]
const file_path = 'files/FernThaiReceipt.jpg'


const Client = require('@veryfi/veryfi-sdk');
let veryfiClient = new Client(client_id, client_secret, username, api_key);

// ROUTE Handlers -> controllers
let data = receiptObj.retrieveItemsFromJson();


app.get('/', async(req, res) => {
  res.send('Hello World with GET')


})

// How to send image file over post request
app.post('/', (req, res) => {

  // Get file
  // Download file
  // get JSON from image file with VeriFy api
  //


  res.send('Made a POST request')
    // TODO:
  // Seperate this into a function
  // let response = await veryfiClient.process_document(file_path); // This may use up limited Documents allowed per month from VeriFy's free tier
  // Will work with sample response for now
  // console.log(response)

})

app.listen(port, () => {
  console.log('Listening on port', port)
})