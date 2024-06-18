import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const EditProfileModal = ({ open, handleClose, userData, handleSave }) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Aquí puedes hacer una llamada a la API para actualizar los datos del usuario
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <TextField
          name='nombre'
          label='Nombre'
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          name='apellido'
          label='Apellido'
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          name='telefono'
          label='Telefono'
          value={formData.telefono}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant='contained' onClick={handleSubmit} sx={{ bgcolor: '#A62639', color: 'white' }}>
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default EditProfileModal;
