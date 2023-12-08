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
        <div className='ReceiptInfoContainer'>
          <h1 className='text-3xl font-bold underline'>Purchased Items</h1>
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
        </div>
      )}

      <div className='PurchasedItemsContainer'>
        <ItemsTable
          purchasedItems={purchasedItems}
          updatedPurchasedItems={updatedPurchasedItems}
          setUpdatedPurchasedItems={setUpdatedPurchasedItems}
          selected={selected}
          setSelected={setSelected}
        />
      </div>


      <h1 className='text-3xl font-bold underline'>User Totals</h1>
      <h3>Totals</h3>

      <div className='UserInfoListContainer'>
        <UserInfoList/>
      </div>



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
