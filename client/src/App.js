import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import ItemsTable from "./components/ItemsTable";
import UserInfoCard from "./components/userInfoList/UserInfoCard";
import testDataSample from "./extractedProcessBevetts.json";

import AssignModal from './components/AssignModal';
import UserInfoList from './components/userInfoList/UserInfoList';
import ActionBar from './components/ActionBar';
//styled components:




function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [orderedItems, setOrderedItems] = useState();
  const [receiptInfo, setReceiptInfo] = useState(testDataSample);
  // const [receiptInfo, setReceiptInfo] = useState();
  const [isAssignPersonModalOn, setAssignModalOn] =
    useState(false);

  const [assignee, setAssignee] = useState('');
  // const [selectionModel, setSelectionModel] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const [selected, setSelected] = useState([]);
  const [tipRate, setTipRate] = useState(.18); //Maybe add tip percentage as an option
  const [taxRate, setTaxRate] = useState(.10);


  // const [purchasedItems, setPurchasedItems] = useState([])
  // const [updatedPurchasedItems, setUpdatedPurchasedItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState(testDataSample.purchasedItems)
  const [updatedPurchasedItems, setUpdatedPurchasedItems] =useState(testDataSample.purchasedItems)
  // Set file
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };




  return (
    <>
    <div className='TopBarContainer  flex justify-between md:container md:mx-auto ' >
      <ActionBar
        purchasedItems={purchasedItems}
        setPurchasedItems={setPurchasedItems}
        updatedPurchasedItems={updatedPurchasedItems}
        setUpdatedPurchasedItems={setUpdatedPurchasedItems}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setReceiptInfo={setReceiptInfo}
        taxRate={taxRate}
        setTaxRate={setTaxRate}
        tipRate={tipRate}
        setTipRate={setTipRate}
        selectedFile={selectedFile}
        onFileChange={onFileChange}
      />

      {receiptInfo && (
        <div className='ReceiptInfoContainer text-r font-medium text-black '>
          <h1 className='text-xl font-bold underline'>Receipt Info</h1>
          {receiptInfo["Merchant Name"].length > 0 && <h1>{receiptInfo["Merchant Name"]}</h1>}
          <h2>{`Total: ${receiptInfo.Total}`}</h2>
          <h3>{`Subtotal: ${receiptInfo.Subtotal}`}</h3>
          <h3>{`Total Tax: ${receiptInfo["Total Tax"]}`}</h3>
          <h3>{`Tip: ${receiptInfo["Tip"]}`}</h3> <textField></textField>
          {taxRate && <h3>{`Estimated Tax: ${taxRate}`}</h3>}
          {tipRate && <h3>{`Estimated Tip: ${tipRate}`}</h3>}
        </div>
      )}
    </div>


      <div className='PurchasedItemsContainer text-r md:container md:mx-auto px-8'>
        <ItemsTable
          purchasedItems={purchasedItems}
          updatedPurchasedItems={updatedPurchasedItems}
          setUpdatedPurchasedItems={setUpdatedPurchasedItems}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <h1 className='text-3xl font-bold underline'>User Totals</h1>
      <div className='UserInfoListContainer'>
        <UserInfoList userInfo={userInfo}/>
      </div>

      </>

  );
}

export default App;
