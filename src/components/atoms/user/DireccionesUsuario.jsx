import React, { useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Add as AddIcon, Home as HomeIcon, Delete as DeleteIcon } from '@mui/icons-material';
import InfoUser from './InfoUser';
import EditAddressModal from './EditAddressModal';

const DireccionesUsuario = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: "Calle 123",
      city: "Ciudad",
      country: "País",
      firstName: "Juan",
      lastName: "Pérez",
      phone: "123456789"
    },
    // Agrega más direcciones si es necesario
  ]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setIsModalOpen(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ color: "#56494E", marginBottom: 2 }}>
        <strong>Direcciones</strong>
      </Typography>
      <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{ marginLeft: 'auto' }}>
              Agregar Dirección
            </Button>
          </Grid>
          {addresses.map(address => (
            <Grid item xs={12} key={address.id}>
              <Paper elevation={2} sx={{ padding: 2, borderRadius: "9px" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1}><HomeIcon /></Grid>
                  <Grid item xs={9}>
                    <InfoUser title="Dirección" subtitle={address.address} />
                    <InfoUser title="Provincia" subtitle={address.city} />
                    <InfoUser title="País" subtitle={address.country} />
                    <InfoUser title="Nombre" subtitle={`${address.firstName} ${address.lastName}`} />
                    <InfoUser title="Teléfono" subtitle={address.phone} />
                  </Grid>
                  <Grid item xs={1}>
                    {/* Botón para editar dirección */}
                    <Button variant="contained" onClick={handleOpenModal}>Editar</Button>
                  </Grid>
                  <Grid item xs={1}>
                    {/* Botón para eliminar dirección */}
                    <Button variant="contained" color="error" onClick={() => handleDeleteAddress(address.id)}>
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <EditAddressModal open={isModalOpen} handleClose={handleCloseModal} handleSave={handleSaveAddress} />
      </Paper>
    </>
  );
};

export default DireccionesUsuario;
