import React from 'react';
import {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper'
import { uuid } from 'uuidv4';

import EditableTableCell from './purchasedItemsTable/EditableTableCell';

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


const headCells = [
  {
    id: 'user',
    numeric: false,
    disabledPadding: true,
    label: 'Name',
  },
  {
    id: 'description',
    numeric: false,
    disabledPadding: true,
    label: 'Item',
  },
   // TODO: Decide to split the quantity into individual items on server. Or have it split in the UI?
  // {
  //   id: 'price',
  //   numeric: true,
  //   disabledPadding: true,
  //   label: 'Price',
  // },
  // {
  //   id: 'quantity',
  //   numeric: true,
  //   disabledPadding: true,
  //   label: 'Quantity',
  // },
  {
    id: 'totalPrice',
    numeric: false,
    disabledPadding: true,
    label: 'Price',
  },

];


  function PurchasedItemsTabledHead({numSelected, rowCount}) {
  return (
    <TableHead >
      {/* <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          // onChange={onSelectedAllClick}?
          inputProps={{
            'aria-label': 'select all items',
          }}
        />
      </TableCell> */}
      {headCells.map((headCell) => (
        <TableCell
          // class='class="p-2 whitespace-nowrap"'
          class="text-s font-semibold uppercase text-gray-400 bg-gray-50 text-left"
          key={headCell.id}
          align={headCell.numeric ? 'right' : 'left'}
          padding={headCell.disabledPadding ? 'none' : 'normal'}
        >
          {headCell.label}
        </TableCell>
      ))}
    </TableHead>
  );
}


function ItemsTable({
  purchasedItems,
  updatedPurchasedItems,
  setUpdatedPurchasedItems,
  selected,
  setSelected}) {


  const handleTextFieldChange = (rowIndex, change) => {
    const updatedItems = updatedPurchasedItems;
    const username = change.fieldValue;
    updatedItems[rowIndex][change.fieldName] = username;

    console.log('>>>>>> ROW updated to: ', updatedItems[rowIndex].user)
    setUpdatedPurchasedItems(updatedItems)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleSelectedItem = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if ( selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if ( selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    };
    setSelected(newSelected);
    // console.log('>>>> selected:',  selected);
    // console.log('>>>> NEW selected:',  newSelected);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <PurchasedItemsTabledHead
          numSelected={selected.length}
          rowCount={purchasedItems.length}
        />
        <TableBody class="text-sm divide-y divide-gray-100 ">
          {purchasedItems.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            return (
              <TableRow
              // class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"
                hover
                onClick={(event) => handleSelectedItem(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                // key={row.description}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
              >
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    // inputProps={{
                    //   'aria-lablelledby': labelId,
                    // }}
                  />
                </TableCell> */}
                <EditableTableCell
                  row={row}
                  fieldName="user"
                  rowIndex={index}
                  handleTextFieldChange={handleTextFieldChange}
                />
                <TableCell
                  component="th"
                  scope="row"
                >
                  {row.description}
                </TableCell>
                {/* TODO: Either seperate price and quantity into individual items on server,
                 or handle here with a child list or some type of split button to make more items*/}
                {/* <TableCell align="right">{row.price}</TableCell> */}
                {/* <TableCell align="right">{row.quantity}</TableCell> */}
                <TableCell>{row.totalPrice}</TableCell>

              </TableRow>
            )
            })
          }

        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default ItemsTable;

