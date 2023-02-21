import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

import ItemsTable from "./components/ItemsTable";
import jsonData from "./extractedProcessBevetts.json";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { GridApi } from '@mui/x-data-grid-pro';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [orderedItems, setOrderedItems] = useState();
  const [receiptInfo, setReceiptInfo] = useState(jsonData);
  const [isAssignPersonModalOn, setAssignModalOn] =
    useState(false);

  const [assignee, setAssignee] = useState('');
  const [selectedItems, setSelectedItems] = useState();
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
        // setOrderedItems(sub)
        setReceiptInfo(res);
        // Get list of items from response
        // should provide all the items from the menu
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
  const assignUserToSelectedItems = () => {

    let totals = peoplesTotals;

    totals[assignee] = {items: selectedItems};
    setPeoplesTotals(totals);
    setAssignee('');
    setAssignModalOn(false);
    //Clear selection of table


  }
  console.log('PEOPLES ITEMS', peoplesTotals)
  const handleModalClose = () => [setAssignModalOn()];
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Upload a file</h1>
      <div>
        <input
          style={{ border: "1px solid black" }}
          type='file'     s
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

      <Modal
        open={isAssignPersonModalOn}
        onClose={() => setAssignModalOn(false)}
      >
        <Box sx={style} component='form'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Assign a person
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Enter a person to assign selected items to
          </Typography>

          <TextField
            required
            id='outlined-required'
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            />
            <div>
              <Button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    onClick={()=> setAssignModalOn(false)}>
               Close
              </Button>
              <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={assignUserToSelectedItems}>
                Confirm
              </Button>
            </div>
        </Box>
      </Modal>

      <div className='flex h-auto'>
        <ItemsTable purchasedItems={receiptInfo.purchasedItems}  setSelectedItems={setSelectedItems}/>
      </div>

      <h3>Totals</h3>
    </>

  );
}

export default App;
