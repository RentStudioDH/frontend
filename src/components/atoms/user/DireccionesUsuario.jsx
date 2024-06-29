import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import EditAddressModal from './EditAddressModal';
import { useContextGlobal } from '../../../contexts/global.context';

const DireccionesUsuario = () => {
  const { state, getUserData } = useContextGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData && userData.address) {
        setAddresses([userData.address]);
      }
    };
    fetchUserData();
  }, [getUserData]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAddress = (newAddress) => {
    setAddresses([newAddress]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ color: "#56494E", marginBottom: 2 }}>
        <strong>Dirección</strong>
      </Typography>
      <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px" }}>
        <Grid container spacing={2} alignItems="center">
          {addresses.length === 0 ? (
            <Grid item xs={12} sx={{ textAlign: 'center', height: "10rem" }}>
              <Typography variant="h6" color="#56494E">
                No tienes ninguna dirección guardada.
              </Typography>
              <Button 
                variant="contained" 
                sx={{
                  bgcolor: "#A62639",
                  marginTop: 2,
                  color: "white",
                  '&:hover': {
                    bgcolor: "#8C1D31", // Color de fondo al pasar el cursor sobre el botón
                  },
                }}
                onClick={handleOpenModal}
              >
                Agregar Dirección
              </Button>
            </Grid>
          ) : (
            addresses.map((address, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={2} sx={{ padding: 2, borderRadius: "9px" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={1}><HomeIcon /></Grid>
                    <Grid item xs={9}>
                      <Typography variant='h4' color={"#56494E"} fontWeight={500}>{address.street}</Typography>
                      <Typography variant='h6' fontWeight={400}>{address.city}, {address.state}, {address.country}</Typography>
                      <Typography variant='h6' fontWeight={400}>{`${state.user.firstName} ${state.user.lastName}`}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Button sx={{ color: "#A62639", '&:hover': { bgcolor: "#A62639", color: "white" } }} onClick={handleOpenModal}>
                        Editar
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
        <EditAddressModal open={isModalOpen} handleClose={handleCloseModal} handleSave={handleSaveAddress} />
      </Paper>
    </>
  );
};

export default DireccionesUsuario;
