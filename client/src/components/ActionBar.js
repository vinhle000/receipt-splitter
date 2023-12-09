import React, {useState, useEffect} from 'react';
import axios from "axios";



function ActionBar ({
  purchasedItems,
  setPurchasedItems,
  updatedPurchasedItems,
  setUpdatedPurchasedItems,
  userInfo,
  setUserInfo,
  setReceiptInfo,
  taxRate,
  setTaxRate,
  tipRate,
  setTipRate,
  selectedFile,
  onFileChange,
}) {


  const handleCalculate = async () =>  {
    setPurchasedItems(updatedPurchasedItems)
    console.log('UPDATED ITEMS >>>> ', updatedPurchasedItems)
    let userInfo = {}

    for (let item of purchasedItems) {
      const itemPrice = Number(item.totalPrice.slice(1)) // remove $ sign
      if (item.user in userInfo) {
        userInfo[item.user].subtotal = userInfo[item.user].subtotal + itemPrice;
      } else { // Initialize
        userInfo[item.user] = {
        subtotal: itemPrice,
        };
      }
      // TODO: add prop with array of purchased items by user
      userInfo[item.user].tax = (userInfo[item.user].subtotal * taxRate).toFixed(2);
      let subtotalWithTax = userInfo[item.user].subtotal * (1 + taxRate);

      userInfo[item.user].tip = (subtotalWithTax *  tipRate).toFixed(2);
      userInfo[item.user].owedTotal = (subtotalWithTax * (1 + tipRate)).toFixed(2);

    }
    setUserInfo(userInfo);
  }

  if (userInfo !== null) {
    console.log('>>> Calculated userInfo :', Object.entries(userInfo));
  }

  // Upload File //
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    console.log("== Details of uploaded file: ", selectedFile);

    axios({
      method: "POST",
      url: "http://localhost:8080/uploadfile",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("Response Success status: ", JSON.stringify(res.data, null, 2));
        setReceiptInfo(res.data);
        setPurchasedItems(res.data.purchasedItems);
        setUpdatedPurchasedItems(res.data.purchasedItems);

         // calculate tax and tip to add to owedTotal
        const subtotal = Number(res.data['Subtotal'].slice(1));
        const total = Number(res.data['Total'].slice(1));
        // TODO: Move this process to the server side,
        // Butler has issues discerning between subtotals and Total of the receipt
          // Flip them if Subtotals is greater than Totals,
            // Assign Totals = Subtotals
            // and Subtotals = Totals
        // Maybe in the server, add the calculated fields to the extracted and process/formatted receipt info
        // {
        //   calculated:{
        //     total:
        //     subtotal:
        //     tax:
        //   }
        // }

        let taxRate = (total - subtotal) / total
        console.log(' tax rate is >>> ', taxRate)

        // TODO: tipRate
        // const total = Number(res.data.Total.slice(1));
        // let tipAmount = '' // if amount was provided
        // let tipRate = tipAmount / total;
        // console.log(' tax rate is >>> ', taxRate)
        // NOTE: Could place tip rate or tip amount field to calculate
        let tipRate = 0.20 // percentage TODO: create input field for user

        setTaxRate(taxRate)
        setTipRate(tipRate);
      })
      .catch((error) => {
        console.error("Error occurred sending file ", error);
      });
  };

  const fileData = () => {
    if (selectedFile) {
      return <p> File Name: {selectedFile.name}</p>;
    } else {
      return (
        <div className="mt-4">
          {/* <h4>Choose before pressing the Upload button</h4> */}
        </div>
      );
    }
  };

  return (
    <div className='ActionBarContainer p-4  md:container md:mx-auto basis-04'>

      {/* File upload section */}
      <div className="mb-4">
        <input
          className="border p-1 mr-2"
          type='file'
          onChange={onFileChange}
        />
        <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded' onClick={onFileUpload}>
          Upload!
        </button>
      </div>

      {/* File details section */}
      <div className="mb-4">
        {fileData()}
      </div>

      {/* Calculate button section */}
      <div>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
    </div>
  )
}


export default ActionBar;