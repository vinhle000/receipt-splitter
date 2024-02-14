import React from 'react';
import { useState } from 'react'
import { uuid } from 'uuidv4';


function ItemsTable({
  purchasedItems,
  updatedPurchasedItems,
  setUpdatedPurchasedItems,
  selected,
  setSelected,
  setPurchasedItems,
  taxRate,
  tipRate,
  setUserInfo,}) {

  const [isEditing, setIsEditing] = useState(null);

  const setUsername = (newUsername, index) => {
    const updatedItems = updatedPurchasedItems;
    updatedItems[index].user = newUsername;
    setUpdatedPurchasedItems(updatedItems)
  }

  const handleCalculate = async () =>  {
    setPurchasedItems(updatedPurchasedItems)
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


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Purchased Items</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Item
          </button>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={handleCalculate}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Calculate
          </button>
        </div>

      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Item
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
              {purchasedItems.map((item,index) => (
                  <tr key={index} className="even:bg-gray-50">

                    <td
                      contentEditable={isEditing === index}
                      onClick={() => setIsEditing(index)}
                      onBlur={(e) => {
                        setIsEditing(null)
                        setUsername(e.target.textContent, index)
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setIsEditing(null);
                        }
                      }}
                      className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${isEditing === index ? 'border-2 border-blue-500 bg-blue-100' : ''}`}
                    >
                      {item.username}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.totalPrice}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {item.user}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

}


export default ItemsTable;
