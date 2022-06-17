import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PopupTable from './PopupTable'
import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-left: 30px;
`

const style = {
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: 760,
  maxHeight: 500,
  align: 'space-between',
};

export default function BasicModal() {
  const [open, setOpen] = useState(false)
  const [newRow, setNewRow] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  window.open = handleOpen

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PopupTable setNewRow={setNewRow} addRow={newRow}/>
          <ButtonWrapper>
          <Button onClick={() => {setNewRow(true)}}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
          </ButtonWrapper>
        </Box>
      </Modal>
    </div>
  );
}