const sampleReceiptData = require('../files/sampleButler.json') // SampleData from meal receipt


class receipt {

  downloadFile(file) {
    //Download from GET request
  }

  extractJsonFromImage(filePath) {
    // use VeriFy API to send document file
    // const data = JSON.parse(filePath);

    const data = sampleReceiptData;
    return data;
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


}

module.exports = new receipt();
