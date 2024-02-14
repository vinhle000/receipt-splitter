import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiReceipt } from "react-icons/bi";

function ActionBar({
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
  if (userInfo !== null) {
    console.log(">>> Calculated userInfo :", Object.entries(userInfo));
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
        console.log(
          "Response Success status: ",
          JSON.stringify(res.data, null, 2),
        );
        setReceiptInfo(res.data);
        setPurchasedItems(res.data.purchasedItems);
        setUpdatedPurchasedItems(res.data.purchasedItems);

        // calculate tax and tip to add to owedTotal
        const subtotal = Number(res.data["Subtotal"].slice(1));
        const total = Number(res.data["Total"].slice(1));
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

        let taxRate = (total - subtotal) / total;
        console.log(" tax rate is >>> ", taxRate);

        // TODO: tipRate
        // const total = Number(res.data.Total.slice(1));
        // let tipAmount = '' // if amount was provided
        // let tipRate = tipAmount / total;
        // console.log(' tax rate is >>> ', taxRate)
        // NOTE: Could place tip rate or tip amount field to calculate
        let tipRate = 0.2; // percentage TODO: create input field for user

        setTaxRate(taxRate);
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
    <div className="ActionBarContainer flex items-center justify-between p-4 text-black md:container md:mx-auto px-8 ">
      <div>
        {/* <h1 className="text-2xl font-bold">Logo</h1> */}
        <BiReceipt className="text-4xl text-indigo-600" />
      </div>

      {/* File upload section */}
      <div className="flex items-center">
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={onFileChange}
          aria-describedby="file-upload-help" // For Accessibility improvements
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded transition-colors duration-150 ease-in-out"
        >
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              {/* SVG for visual aid */}
              <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2m-1.5-4.5l-1.5 1.5m-5-5L12 6m0 0l3 3m-3-3L9 9m12 3h-6m6 0a9 9 0 0 1-18 0m18 0a9 9 0 0 0-18 0"></path>
            </svg>
            Select file
          </span>
        </label>
        <button
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onFileUpload}
        >
          Scan file
        </button>
        <span id="file-upload-help" className="text-xs text-gray-600 ml-2">
          No file chosen
        </span>{" "}
        {/* For Accessibility improvements */}
      </div>

      <div className="ml-4 flex items-center">{fileData()}</div>
    </div>
  );
}

export default ActionBar;
