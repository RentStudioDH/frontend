import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmDeleteModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
        width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 
      }}>
        <Typography variant="h5" component="h2" gutterBottom color={"black"}>
          Confirmar Eliminación
        </Typography>
        <Typography sx={{ mb: 2 }} color={"black"}>
          ¿Está seguro de que desea eliminar esta dirección?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 2 }}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleConfirm}>Eliminar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
