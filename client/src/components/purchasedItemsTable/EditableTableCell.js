import react from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';



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

export default EditableTableCell;