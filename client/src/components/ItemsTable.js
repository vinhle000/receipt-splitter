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
    id: 'description',
    numeric: false,
    disabledPadding: true,
    label: 'Name',
  },
  {
    id: 'price',
    numeric: true,
    disabledPadding: true,
    label: 'Price',
  },
  {
    id: 'quantity',
    numeric: true,
    disabledPadding: true,
    label: 'Quantity',
  },
  {
    id: 'totalPrice',
    numeric: false,
    disabledPadding: true,
    label: 'Total Price',
  },
  {
    id: 'user',
    numeric: false,
    disabledPadding: true,
    label: 'User',
  }
];

// function EnhancedTabledHead({onSelectedAllClick, order, orderBym, numSelected, rowCount}) {
  function EnhancedTabledHead({numSelected, rowCount}) {
  return (
    <TableHead>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          // onChange={onSelectedAllClick}?
          inputProps={{
            'aria-label': 'select all items',
          }}
        />
      </TableCell>
      {headCells.map((headCell) => (
        <TableCell
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

// TODO: Move component to separate file
const EditableTableCell = ({ row, fieldName, rowIndex, handleTextFieldChange}) => {
  const onCellValueChange = e => {
    handleTextFieldChange(rowIndex, { // This is the binded(prop) function passed down into the EditableTableCell component
        fieldValue: e.target.value,
        fieldName: fieldName,
      });
  };

  return (
    <TableCell>
      <TextField
        onChange={onCellValueChange}
        id={fieldName}
        defaultValue={row[fieldName]}
        margin="normal"
      />
    </TableCell>
  )
}



function ItemsTable({purchasedItems, updatedPurchasedItems, setUpdatedPurchasedItems, selected, setSelected}) {

  console.log('>>>>> purchasedItems: ', purchasedItems)
  const handleTextFieldChange = (rowIndex, change) => {
    // set state of purchasedItems
    // TODO:
      //1 setUpdatedItems from the entering the values
      //2 create button to setPurchaseItems to updatedItems
      //
    const updatedItems = updatedPurchasedItems;
    updatedItems[rowIndex][change.fieldName] = change.fieldValue

    console.log('>>>>>> ROW updated to: ', updatedItems[rowIndex])
    setUpdatedPurchasedItems(updatedItems)

  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleCheckboxClick = (event, id) => {
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
        <EnhancedTabledHead
          numSelected={selected.length}
          rowCount={purchasedItems.length}
        />
        <TableBody>
          {purchasedItems.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            return (
              <TableRow
                hover
                onClick={(event) => handleCheckboxClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                // key={row.description}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    // inputProps={{
                    //   'aria-lablelledby': labelId,
                    // }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.totalPrice}</TableCell>
                <EditableTableCell
                  row={row}
                  fieldName="user"
                  rowIndex={index}
                  handleTextFieldChange={handleTextFieldChange}
                />
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

