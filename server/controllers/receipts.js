const butlerWrapper = require('./butlerWrapper')
const sampleReceiptData = require('../files/sampleButler.json') // SampleData from meal receipt
const { uuid } = require('uuidv4')

class receipt {

  downloadFile(file) {
    //Download from GET request
  }

  async extractInfoFromImage(filePath) {
    console.log('FILE PATHS : ', filePath)
    let receiptInfo = {};
    let purchasedItems = [];
    try{
      const uploadID = await butlerWrapper.uploadFiles(filePath)
      const extractionResults = await butlerWrapper.getExtractionResults(uploadID);

      extractionResults.items.forEach(documentResult => {
      const fileName = documentResult.fileName;

      documentResult.formFields.forEach(field => {
        const fieldName = field.fieldName;
        const extractedValue = field.value;

        receiptInfo[fieldName] = extractedValue;
      });

      documentResult.tables.forEach(table => {

        if (table.tableName === 'Items') {
          //Table Item (food)
          table.rows.forEach(row => {
            let purchasedItem = {}
            purchasedItem.id = uuid();
            purchasedItem.user = '';
            // Each column of item
            row.cells.forEach(cell => {
              // REFACTOR: Add confidenc level before creation
                  //"confidenceScore":"High"
                  //"ocrConfidenceValue":0.9956666666666666
              switch (cell.columnName) {
                case 'Description':
                  purchasedItem.description = cell.value;
                  break;
                case 'Quantity':

                  purchasedItem.quantity = cell.value;
                  // if quantity > 1 ,
                  // push the item x quanitty
                  break;
                case 'Price':
                  purchasedItem.price = cell.value;
                  break;
                case 'Total Price':
                  purchasedItem.totalPrice = cell.value;
                  break;

                default:
                  console.log('Non added item column: ', cell.columnName )
              }
            });

            while (purchasedItem.quantity > 1) {
              purchasedItems.push(purchasedItems);
              purchasedItem.quantity =  purchasedItem.quantity - 1;
              // TODO: change quantity for the split up item
            }

            purchasedItems.push(purchasedItem)
          })
        }
      })

    })
    receiptInfo.purchasedItems = purchasedItems;
    console.log('Extracted Results : \n', JSON.stringify(receiptInfo) )
    return receiptInfo
  } catch (error) {
    console.error('error extractingInfo ', error)
  }

  }


  // Format JSON to specific data

  async retrieveItemsFromJsonResponse(data){
    const lineItems = data.line_items;
    const purchasedItems = [];

    for(let i=0; i < lineItems.length; i++ ) {

      const purchasedItem = {
        id: lineItems[i].id,
        name: lineItems[i].description,
        price: lineItems[i].price,
        qty: lineItems[i].quantity,
        itemTotal: lineItems[i].total,
        text: lineItems[i].text,
      };
      purchasedItems.push(
        purchasedItem

      )
    }

    // console.log(purchasedItems)

    const receiptInfo = {
      date: data.date,
      subtotal: data.subtotal,
      total: data.total,
      tax: data.tax,
      tip: data.tip, /// might be null
      purchasedItems: purchasedItems,
      // ocrText: data.ocr_text,
    }
    return receiptInfo;

  }
  /*
  Vendor Name:
  Vendor Address:
  DATE:
  BillingAddress:

  Items = [ //acording to each data.line_items
    {
      id: data.id
      name: data.description
      price: data.price
      qty: data.quantity
      itemTotal: total
      text: data.text
    },
  ]
  subTotal;
  tax:
  total:
  currency:
  */

//   Merchant Name : Fern Thai Eatery & Bar
// Merchant Phone Number : (206) 858-6652
// Merchant Full Address : 1400 10th Ave Seattle WA 98122
// Merchant Street Address : 1400 10th Ave
// Merchant City : Seattle
// Merchant State : WA
// Merchant ZIP Code : 98122

// Subtotal : $128.80
// Total Tax :
// Tip :
// Total : $120.55




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
}

module.exports = new receipt();
