import React from 'react';
import {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper'
import { v4 as uuidv4 } from 'uuid';


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

      // <TableCell>Description </TableCell>
      // <TableCell align="right">Price</TableCell>
      // <TableCell align="right">Quantity</TableCell>
      // <TableCell align="right">Total Price</TableCell>
      // <TableCell align="right">User</TableCell>
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
          // sortDirection={orderBy === headCell.id ? order : false}
        >
          {headCell.label}
          {/* <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null }
          </TableSortLabel> */}
        </TableCell>
      ))}
    </TableHead>
  );
}

function ItemsTable({purchasedItems, selectionModel, setSelectionModel}) {

  const assignUsername = (username) => {
  }

  const calculate = () => {
  }

  const [selected, setSelected] = useState([]);

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const handleClick = (event, description) => {

    const selectedIndex = selected.indexOf(description);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, description);
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

  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <EnhancedTabledHead
          numSelected={selected.length}
          rowCount={purchasedItems.length}
        />
        <TableBody>
          {purchasedItems.map((row) => {
            const isItemSelected = isSelected(row.description);
            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.description)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.description}
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
                <TableCell align="right">{row.user}</TableCell>
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

