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

const file = fs.createReadStream('files/FernThaiReceipt.jpg')

// Reading MIME form data and write data
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files') //for error handling
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = (multer({storage: storage}));


app.post('/uploadfile', upload.single('myFile'), async (req, res, next) => {

  // Download file
  const file_path = `${req.file.destination}/${req.file.filename}`
  console.log('File downloaded to ', file_path)
  const filePaths = [`${file_path}`];

  const results = await receipt.extractInfoFromImage(filePaths) //

  res.send(`Extraced Info: ${results}`)
})

app.post('/extractInfo', (req, res) => {
  res.status(200)
})

app.listen(port, () => {
  console.log('Listening on port', port)
})

// Uploading files to Bultler for processing  ======= Current RESULT
// Listening on port 8080
// UPLOAD ID ----  196bb9c7-201e-4f35-ac65-d9094b1105e1
// Fetching extraction results
// Extraction still in progress. Sleeping for 5 seconds...
// Fetching extraction results
// Extraction results ready
// Extraction results from FernThaiReceipt.jpg
// Fields
// Transaction Date : 12/7/2022
// Transaction Time : 5:22 PM
// Arrival Date :
// Departure Date :
// Merchant Name : Fern Thai Eatery & Bar
// Merchant Phone Number : (206) 858-6652
// Merchant Full Address : 1400 10th Ave Seattle WA 98122
// Merchant Street Address : 1400 10th Ave
// Merchant City : Seattle
// Merchant State : WA
// Merchant ZIP Code : 98122
// Merchant Country/Region :
// Currency :
// Subtotal : $128.80
// Total Tax :
// Tip :
// Total : $120.55


// Tables
// Table name: Items
// Row 0:
// Description: Kom Soi($18.95)
// Category:
// Date:
// Price:
// Quantity: ×1
// Total Price: $18.95

// Row 1:
// Description: Pad Kee Mao($16.95)
// Category:
// Date:
// Price:
// Quantity: X1
// Total Price: $16.95

// Row 2:
// Description: Roast Duck Curry($18.95)
// Category:
// Date:
// Price:
// Quantity: x1
// Total Price: $18.95

// Row 3:
// Description: Gai Tod Hat Yai($23.95)
// Category:
// Date:
// Price:
// Quantity: X1
// Total Price: $23.95

// Row 4:
// Description: Sticky Rice($3.00)
// Category:
// Date:
// Price:
// Quantity: x1
// Total Price: $3.00

// Row 5:
// Description: Spicy Lychee Rita($15.00)
// Category:
// Date:
// Price:
// Quantity: x1
// Total Price: $15.00

// Row 6:
// Description: Elysian Stout($8.00)
// Category:
// Date:
// Price:
// Quantity: x4
// Total Price: $32.00
