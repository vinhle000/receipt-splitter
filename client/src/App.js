import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

import ItemsTable from "./components/ItemsTable";
import jsonData from "./extractedProcessBevetts.json";


import { GridApi } from '@mui/x-data-grid-pro';
import AssignModal from './components/AssignModal'



function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [orderedItems, setOrderedItems] = useState();
  const [receiptInfo, setReceiptInfo] = useState(jsonData);
  const [isAssignPersonModalOn, setAssignModalOn] =
    useState(false);

  const [assignee, setAssignee] = useState('');
  const [selectionModel, setSelectionModel] = useState();
  const [peoplesTotals, setPeoplesTotals] = useState({});


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
        console.log("Success status: ", res);
        setReceiptInfo(res);
      })
      .catch((error) => {
        console.error("Error occurred sending file ", error);
      });
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        // File details to dislplay
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

  // TODO: Perform use effect after assigning users to items
  // => create user cards, or update user cards with totals
  const assignPersonToSelectedItems = () => {

    let totals = peoplesTotals;

    totals[assignee] = {items: selectionModel};
    setPeoplesTotals(totals);
    setAssignee('');
    setAssignModalOn(false);
    //Clear selection of table


  }
  console.log('PEOPLES ITEMS', peoplesTotals)
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
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded' onClick={onFileUpload}>
          Upload!
        </button>
      </div>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setAssignModalOn(true)}
        >
          Assign Person
        </button>
      </div>
      <ItemsTable purchasedItems={receiptInfo.purchasedItems} selectionModel={selectionModel} setSelectionModel={setSelectionModel}/>
      <h3>Totals</h3>



      {isAssignPersonModalOn &&
        <AssignModal
          setAssignModalOn={setAssignModalOn}
          assignee={assignee}
          setAssignee={setAssignee}
          assignPersonToSelectedItems={assignPersonToSelectedItems}
        />}



    </>

  );
}

export default App;
