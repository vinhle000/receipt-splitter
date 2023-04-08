import React from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



function AssignModal({
  setAssignModalOn,
  assignee,
  setAssignee,
  assignPersonToSelectedItems
}) {

  return(
    <Modal
    open
    onClose={() => setAssignModalOn(false)}
    >
      <Box sx={style} component='form'>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Assign a person
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Enter a person to assign selected items to
        </Typography>

        <TextField
          required
          id='outlined-required'
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          />
          <div>
            <Button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                  onClick={()=> setAssignModalOn(false)}>
              Close
            </Button>
            <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  onClick={assignPersonToSelectedItems}>
              Confirm
            </Button>
          </div>
      </Box>
    </Modal>
  )

}

export default AssignModal;