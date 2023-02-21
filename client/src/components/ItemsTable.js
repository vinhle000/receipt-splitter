import React from 'react';
import {useState} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70, valueGetter: uuidv4()},
  { field: 'description', headerName: 'Description', flex: 140},
  { field: 'price', headerName: 'Price', flex: 140},
  { field: 'quantity', headerName: 'Quantity', flex: 140},
  { field: 'totalPrice', headerName: 'Tota lPrice', flex: 140},
  { field: 'user', headerName: 'User', flex: 160}
]


function ItemsTable({purchasedItems, setSelectedItems}) {


  /*TODO:
  Create field to add users
  -> User will be button
      - When highlighted


  Checkbox
    -> Assign to item to user in table
      -Clears selection

  When selection is done, or when 'calculate' button is pressed
    run throgh each item and
    create a key value pair with User,
      appending each item to that user

    once gathering all items for each user

    calculate the total for each user,
      -Get subtotal / recieipt sub total

    -> Apply tax and tip(if applicable)
      -Get total / receipt total

  */

  const assignUsername = (username) => {

  }

  const calculate = () => {

  }

  return (
    <>
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
      getRowId={()=> uuidv4()}
      autoHeight
      autoPageSize={true}
        rows={purchasedItems}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        onSelectionModelChange={selectionModel => setSelectedItems(selectionModel)}

      />
    </div>

    </>
  )
}

export default ItemsTable;

