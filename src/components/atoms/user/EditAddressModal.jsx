import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const EditAddressModal = ({ open, handleClose, handleSave }) => {
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    country: "",
    firstName: "",
    lastName: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveAddress = () => {
    handleSave(addressData);
    setAddressData({
      address: "",
      city: "",
      country: "",
      firstName: "",
      lastName: "",
      phone: ""
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Dirección</DialogTitle>
      <DialogContent>
        <TextField
          label="Dirección"
          name="address"
          value={addressData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Provincia"
          name="city"
          value={addressData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="País"
          name="country"
          value={addressData.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nombre"
          name="firstName"
          value={addressData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apellido"
          name="lastName"
          value={addressData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={addressData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='warning'>Cancelar</Button>
        <Button onClick={handleSaveAddress} variant="contained" color="success">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressModal;
