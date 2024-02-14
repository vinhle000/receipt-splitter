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
import ReceiptStats from './components/ReceiptStats';


//TODO 2.13.24
// Keep original state of receipt info, and then use it to reset/default all values,
// Will provide a reset without making a new request to the Butler API for another scan


function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [orderedItems, setOrderedItems] = useState();
  const [receiptInfo, setReceiptInfo] = useState(testDataSample);
  // const [receiptInfo, setReceiptInfo] = useState();
  const [isAssignPersonModalOn, setAssignModalOn] =
    useState(false);


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
    <div className='TopBarContainer  flex justify-between md:container md:mx-auto px-4 ' >
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




    </div>
    {receiptInfo && (
        <ReceiptStats
          receiptInfo={receiptInfo}
        />
      )}

      <div className='PurchasedItemsContainer text-r md:container md:mx-auto px-4 pb-10'>
        <ItemsTable
          purchasedItems={purchasedItems}
          updatedPurchasedItems={updatedPurchasedItems}
          setUpdatedPurchasedItems={setUpdatedPurchasedItems}
          selected={selected}
          setSelected={setSelected}
          setPurchasedItems={setPurchasedItems}
          taxRate={taxRate}
          tipRate={tipRate}
          setUserInfo={setUserInfo}

        />
      </div>

      {/* <h1 className='text-3xl font-bold underline'>User Totals</h1>
      <div className='UserInfoListContainer'>
        <UserInfoList userInfo={userInfo}/>
      </div> */}

      <div className='PurchasedItemsContainer text-r md:container md:mx-auto px-4 pb-10'>
       <UserInfoList userInfo={userInfo}/>
      </div>
      </>

  );
}

export default App;
