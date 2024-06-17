import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

const EditProfileModal = ({ open, handleClose, userData, handleSave }) => {
  const [editedData, setEditedData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    handleSave(editedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="nombre"
          value={editedData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={editedData.apellido}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={editedData.email}
          fullWidth
          margin="normal"
          disabled // Campo de correo electrónico deshabilitado
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={editedData.telefono}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nueva Contraseña"
          type="password"
          name="password"
          value={editedData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSaveChanges} variant="contained" color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
