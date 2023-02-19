import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import axios from 'axios';

import ItemsTable from './components/ItemsTable';
import jsonData from './extractedProcessBevetts.json'

function App() {

  const [selectedFile, setSelectedFile] = useState();
  const [orderedItems, setOrderedItems] = useState();
  const [receiptInfo, setReceiptInfo] = useState(jsonData);
  // Set file
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload File //
  const onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      'myFile',
      selectedFile,
      selectedFile.name
    )

    console.log('== Details of uploaded file: ', selectedFile);

    // POST request to send Form Data object
    axios({
      method: 'POST',
      url: 'http://localhost:8080/uploadfile',
      data: formData,
      // headers: { "Content-Type": "multipart/form-data" },
    })
    .then( res => {
      console.log('Success status: ', res)
      // setOrderedItems(sub)
      setReceiptInfo(res)
      // Get list of items from response
      // should provide all the items from the menu
    })
    .catch( error => {
      console.error('Error occurred sending file ', error);
    })
  }

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
  }


  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Upload a file
      </h1>
      <div>
        <input style={{'border': '1px solid black'}} type='file' onChange={onFileChange} />
        <button  style={{'border': '1px solid black'}} onClick={onFileUpload}>
          Upload!
        </button>

      </div>
      {fileData()}


        <ul className="divide-y divide-gray-200">
         {receiptInfo.purchasedItems.map(( item, index ) => (
          <li key={item.description} className="py-4 flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{item.description}</p>
              <p className="text-sm text-gray-500">{item.totalPrice}</p>
            </div>
          </li>
         ))}
        </ul>

        <ItemsTable />

    </>
    // https://www.geeksforgeeks.org/file-uploading-in-react-js/
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;