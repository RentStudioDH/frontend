import React, { useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Add as AddIcon, Home as HomeIcon, Delete as DeleteIcon } from '@mui/icons-material';
import InfoUser from './InfoUser';
import EditAddressModal from './EditAddressModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

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

  const handleDeleteClick = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAddressToDelete(null);
  };

  const handleConfirmDelete = () => {
    setAddresses(addresses.filter(address => address.id !== addressToDelete));
    handleCloseDeleteModal();
  };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ color: "#56494E", marginBottom: 2 }}>
        <strong>Direcciones</strong>
      </Typography>
      <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px" }}>
        <Grid container spacing={2} alignItems="center">
          {addresses.map(address => (
            <Grid item xs={12} key={address.id}>
              <Paper elevation={2} sx={{ padding: 2, borderRadius: "9px" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1}><HomeIcon /></Grid>
                  <Grid item xs={9}>
                    <Typography variant='h4' color={"#56494E"} fontWeight={500}>{address.address} </Typography>
                    <Typography variant='h6' fontWeight={400}>{address.city}, {address.country} </Typography>
                    <Typography variant='h6' fontWeight={400}>{`${address.firstName} ${address.lastName}`} - {address.phone} </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {/* Botón para editar dirección */}
                    <Button sx={{ color: "#A62639", '&:hover': { bgcolor: "#A62639", color: "white" } }} onClick={handleOpenModal}>
                      Editar
                    </Button>
                  </Grid>
                  <Grid item xs={1}>
                    {/* Botón para eliminar dirección */}
                    <Button color="error" onClick={() => handleDeleteClick(address.id)}>
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal} sx={{ marginLeft: 'auto', bgcolor: "#A62639", color: "white", '&:hover': { bgcolor: "#A62639" } }}>
              Agregar Domicilio
            </Button>
          </Grid>
        </Grid>
        <EditAddressModal open={isModalOpen} handleClose={handleCloseModal} handleSave={handleSaveAddress} />
        <ConfirmDeleteModal open={isDeleteModalOpen} handleClose={handleCloseDeleteModal} handleConfirm={handleConfirmDelete} />
      </Paper>
    </>
  );
};

export default DireccionesUsuario;
