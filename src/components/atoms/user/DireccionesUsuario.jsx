import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import EditAddressModal from './EditAddressModal';
import { useContextGlobal } from '../../../contexts/global.context';

const DireccionesUsuario = () => {
  const { state, getUserData } = useContextGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        if (userData && userData.address) {
          setAddresses([userData.address]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Cambia el estado a false después de la carga (incluso si hubo error)
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
    setLoading(true); // Activar el spinner al guardar la dirección
    // Simular una operación de guardado (aquí deberías implementar la lógica real)
    setTimeout(() => {
      setAddresses([newAddress]);
      setIsModalOpen(false);
      setLoading(false); // Desactivar el spinner después de guardar
    }, 1500); // Ejemplo de retardo para simular una operación de guardado
  };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ color: "#56494E", marginBottom: 2 }}>
        <strong>Dirección</strong>
      </Typography>
      <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px" }}>
        {loading ? (
          <Grid container justifyContent="center" alignItems="center" sx={{ height: '10rem' }}>
            <CircularProgress />
          </Grid>
        ) : addresses.length === 0 ? (
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
      </Paper>
      <EditAddressModal open={isModalOpen} handleClose={handleCloseModal} handleSave={handleSaveAddress} />
    </>
  );
};

export default DireccionesUsuario;
