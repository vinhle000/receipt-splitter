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
  { field: 'user', headerName: 'User', flex: 160, editable: true}
  // {valueSetter: params => {
  //   const
  // }}
]


function ItemsTable({purchasedItems, selectionModel, setSelectionModel}) {



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



  // const handleCellEditCommit = React.useCallback(
  //   ({ id, field, value }) => {
  //     if (field === 'user') {
  //       const [firstName, lastName] = value.toString().split(' ');
  //       const updatedRows = rows.map((row) => {
  //         if (row.id === id) {
  //           return { ...row, firstName, lastName };
  //         }
  //         return row;
  //       });
  //       setRows(updatedRows);
  //     }
  //   },
  //   [rows],
  // );

  // const handleEditRowsModelChange = () => {

  // }


  //api.setEditCellValue({ id, field, value: newValue });
  return (
    <>
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
      getRowId={()=> uuidv4()}
      autoHeight
      // onCellEditCommit={handleCellEditCommit}
      autoPageSize={true}
        rows={purchasedItems}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        onSelectionModelChange={newSelectionModel => setSelectionModel(newSelectionModel)}
        selectionModel={selectionModel}
        setEditCellValue={ (params, event) =>{}
          //trigger event from asignee modal confirmation
          //

          // setEditCellValue	(params: GridEditCellValueParams, event?: MuiBaseEvent) => Promise<boolean> | voi

        }
      />
    </div>

    </>
  )
}

export default ItemsTable;

