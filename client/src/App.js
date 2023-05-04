import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import ItemsTable from "./components/ItemsTable";
import UserInfoCard from "./components/UserInfoCard";
import jsonData from "./extractedProcessBevetts.json";


// import { GridApi } from '@mui/x-data-grid-pro';
import AssignModal from './components/AssignModal'



function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [orderedItems, setOrderedItems] = useState();
  const [receiptInfo, setReceiptInfo] = useState();
  // const [receiptInfo, setReceiptInfo] = useState();
  const [isAssignPersonModalOn, setAssignModalOn] =
    useState(false);

  const [assignee, setAssignee] = useState('');
  // const [selectionModel, setSelectionModel] = useState();
  const [userTotals, setUserTotals] = useState(null);
  const [selected, setSelected] = useState([]);
  const [tipRate, setTipRate] = useState(); //Maybe add tip percentage as an option
  const [taxRate, setTaxRate] = useState();
  // const [purchasedItems, setPurchasedItems] = useState(receiptInfo?.purchasedItems)
  const [purchasedItems, setPurchasedItems] = useState([])
  // const [updatedPurchasedItems, setUpdatedPurchasedItems] = useState(receiptInfo?.purchasedItems);
  const [updatedPurchasedItems, setUpdatedPurchasedItems] = useState([]);
  // Set file
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
      return (
        // File details to display
        // <p> File Name: selectedFile</p>
        <p> File Name: {selectedFile.name}</p>
      );
    } else {
      return (
        // Display: "Choose file before pressinig the Upload button"
        <div>
          <br />
          <h4>Choose before pressing the Upload button</h4>
        </div>
      );
    }
  };

  const handleSaveUserAssignment = () => {
    setPurchasedItems(updatedPurchasedItems)
    console.log('UPDATED ITEMS >>>> ', updatedPurchasedItems)
  }

  const handleCalculate = () =>  {
    let userTotals = {}

    for (let item of purchasedItems) {
      const itemPrice = Number(item.totalPrice.slice(1)) // remove $ sign
      if (item.user in userTotals) {
        userTotals[item.user].subtotal = userTotals[item.user].subtotal + itemPrice;
      } else { // Initialize
        userTotals[item.user] = {
        subtotal: itemPrice,
        };
      }
      // TODO: add prop with array of purchased items by user
      userTotals[item.user].tax = (userTotals[item.user].subtotal * taxRate).toFixed(2);
      let subtotalWithTax = userTotals[item.user].subtotal * (1 + taxRate);

      userTotals[item.user].tip = (subtotalWithTax *  tipRate).toFixed(2);
      userTotals[item.user].owedTotal = (subtotalWithTax * (1 + tipRate)).toFixed(2);

    }
    setUserTotals(userTotals);
  }

  if (userTotals !== null) {
    console.log('>>> Calculated userTotals :', Object.entries(userTotals));
  }

  let remainderTotalInfoCard = null;
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Upload a file</h1>
      <div>
        <input
          style={{ border: "1px solid black" }}
          type='file'
          onChange={onFileChange}
        />
        <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-1 rounded' onClick={onFileUpload}>
          Upload!
        </button>
      </div>
      <div>
        {/* <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setAssignModalOn(true)}
        >
          Assign Person
        </button> */}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleSaveUserAssignment}
        >
          Save User Assignment
        </button>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleCalculate}
        >
          calculate
        </button>
      </div>

      {receiptInfo && (
        <>
          <h1>-------------</h1>
          {receiptInfo["Merchant Name"].length > 0 && <h1>{receiptInfo["Merchant Name"]}</h1>}
          <h2>{`Total: ${receiptInfo.Total}`}</h2>
          <h3>{`Subtotal: ${receiptInfo.Subtotal}`}</h3>
          <h3>{`Total Tax: ${receiptInfo["Total Tax"]}`}</h3>
          {taxRate && <h3>{`Calculated Tax: ${taxRate}`}</h3>}
          <h3>{`Tip: ${receiptInfo["Tip"]}`}</h3>
           {tipRate && <h3>{`Calculated Tip: ${tipRate}`}</h3>}
          <h3>{`TODO: User can enter tip amount`}</h3>
          <h1>-------------</h1>
        </>
      )}


      <div>

      {userTotals && (
        Object.entries(userTotals).map( (item, index) => {
          if ( item[0] === '') {
            remainderTotalInfoCard = <UserInfoCard username="Remaining Total" data={item[1]}/>
          } else {
            return <UserInfoCard username={item[0]} data={item[1]} />
          }
        })

      )}
      {remainderTotalInfoCard}

      </div>



      <ItemsTable
        purchasedItems={purchasedItems}
        updatedPurchasedItems={updatedPurchasedItems}
        setUpdatedPurchasedItems={setUpdatedPurchasedItems}
        selected={selected}
        setSelected={setSelected}
      />
      <h3>Totals</h3>





{/*
      {isAssignPersonModalOn &&
        <AssignModal
          setAssignModalOn={setAssignModalOn}
          assignee={assignee}
          setAssignee={setAssignee}
          assignPersonToSelectedItems={assignPersonToSelectedItems}
        />} */}

      </>

  );
}

export default App;
