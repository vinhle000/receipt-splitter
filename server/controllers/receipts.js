const sampleReceiptData = require('../files/sampleData.json') // SampleData from meal receipt


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

  async retrieveItemsFromJson(x){
    const data = sampleReceiptData.line_items;
    const purchasedItems = [];

    for(let i=0; i < data.length; i++ ) {

      const purchasedItem = {
        id: data[i].id,
        name: data[i].description,
        price: data[i].price,
        qty: data[i].quantity,
        itemTotal: data[i].total,
        text: data[i].text,
      };
      purchasedItems.push(
        purchasedItem

      )
    }

    console.log(purchasedItems)
    return data;

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

module.exports = receipt;