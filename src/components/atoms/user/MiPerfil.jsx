import { Avatar, Grid, Paper, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import InfoUserPassword from './InfoUserPassword';
import InfoUser from './InfoUser';
import EditProfileModal from './EditProfileModal';

const MiPerfil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "Juan Carlos",
    apellido: "Perez",
    email: "JuanCarlos@gmail.com",
    telefono: "353142414",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (newData) => {
    setUserData(newData);
  };

  return (
    <Paper elevation={4} sx={{ padding: 2, borderRadius: "9px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: "#56494E", margin: 'auto' }}>OP</Avatar>
          <InfoUser title="Nombre" subtitle={userData.nombre} />
          <InfoUser title="Apellido" subtitle={userData.apellido} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoUser title="Email" subtitle={userData.email} />
          <InfoUser title="Telefono" subtitle={userData.telefono} />
          <InfoUserPassword />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, marginTop: 2 }}>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: "#A62639", 
              color: "white",
              '&:hover': {
                bgcolor: "#A62639" // Mantén el mismo color al hacer hover
              } 
            }} 
            onClick={handleOpenModal}
          >
            Editar Perfil
          </Button>
        </Grid>
      </Grid>
      <EditProfileModal 
        open={isModalOpen} 
        handleClose={handleCloseModal} 
        userData={userData} 
        handleSave={handleSave} 
      />
    </Paper>
  );
};

export default MiPerfil;
