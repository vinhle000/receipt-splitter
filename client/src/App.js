import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

import ItemsTable from "./components/ItemsTable";
import jsonData from "./extractedProcessBevetts.json";


// import { GridApi } from '@mui/x-data-grid-pro';
import AssignModal from './components/AssignModal'



function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [orderedItems, setOrderedItems] = useState();
  const [receiptInfo, setReceiptInfo] = useState(jsonData);
  const [isAssignPersonModalOn, setAssignModalOn] =
    useState(false);

  const [assignee, setAssignee] = useState('');
  // const [selectionModel, setSelectionModel] = useState();
  const [userTotals, setUserTotals] = useState({});
  const [selected, setSelected] = useState([]);

  const [purchasedItems, setPurchasedItems] = useState(receiptInfo.purchasedItems)
  const [updatedPurchasedItems, setUpdatedPurchasedItems] = useState(receiptInfo.purchasedItems);
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
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("Success status: ", JSON.stringify(res, null, 2));
        setReceiptInfo(res);
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

    // Create key/val obj, users
    // Iterate through item list
    // build dictionary based off users,
    // users : {
    //     total:
    //     tip:
    //     tax:
    //     owedTotal:

    // }

    let userTotals = {}

    for (let item of purchasedItems) {
      // console.log('>>> slice: ',item.totalPrice.slice(1) )
      // console.log('>>', parseInt(item.totalPrice.slice(1)))
      // console.log('>>', Number(item.totalPrice.slice(1)))
      const itemPrice = Number(item.totalPrice.slice(1)) // remove $ sign
      if (item.user in userTotals) {
        userTotals[item.user].total = userTotals[item.user].total + itemPrice;
      } else { // Initialize
        userTotals[item.user] = {
        total: itemPrice,
        };
      }
    }
    console.log('>>> Calculated userTotals :', userTotals)
    setUserTotals(userTotals);
  }
  // console.log('PEOPLES ITEMS', purchasedItems)
  // const handleModalClose = () => [setAssignModalOn()];
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
