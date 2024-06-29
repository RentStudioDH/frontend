import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context';

const EditAddressModal = ({ open, handleClose, handleSave }) => {
  const { state, updateUserAddress } = useContextGlobal();
  const user = state.user || {};  // Asegurar que user no sea undefined
  const address = user.address || {};  // Asegurar que address no sea undefined

  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  useEffect(() => {
    if (user.address) {
      setAddressData({
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zip: address.zip || "",
        country: address.country || ""
      });
    }
  }, [user.address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveAddress = async () => {
    const updatedUser = {
      address: {
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        zip: addressData.zip,
        country: addressData.country
      }
    };
    await updateUserAddress(state.user.id, updatedUser);
    handleSave(updatedUser.address); // Actualiza el estado de la dirección en el componente principal
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{address.street ? "Editar Dirección" : "Agregar Dirección"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Calle"
          name="street"
          value={addressData.street}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ciudad"
          name="city"
          value={addressData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Provincia/Estado"
          name="state"
          value={addressData.state}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Código Postal"
          name="zip"
          value={addressData.zip}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='warning'>Cancelar</Button>
        <Button onClick={handleSaveAddress} variant="contained" sx={{
          bgcolor: "#A62639",
          color: "white",
          '&:hover': {
            bgcolor: "#8C1D31", // Color de fondo al pasar el cursor sobre el botón
          },
        }}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressModal;
