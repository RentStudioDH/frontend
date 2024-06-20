import { Avatar, Grid, Paper, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useContextGlobal } from '../../../contexts/global.context';
import InfoUserPassword from './InfoUserPassword';
import InfoUser from './InfoUser';
import EditProfileModal from './EditProfileModal';

const MiPerfil = () => {
  const { state, getUserData } = useContextGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telefono: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    loadUserData();
  }, []); // Array vacío asegura que se ejecute solo una vez

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (newData) => {
    setUserData(newData);
  };

  // Obtener las primeras letras del nombre y apellido
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Paper elevation={4} sx={{ padding: 2, borderRadius: '9px' }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: '#56494E', margin: 'auto' }}>
            {getInitials(userData.firstName, userData.lastName)}
          </Avatar>          
          <InfoUser title='Nombre' subtitle={userData.firstName} />
          <InfoUser title='Apellido' subtitle={userData.lastName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoUser title='Email' subtitle={userData.email} />
          <InfoUser title='Telefono' subtitle={userData.telefono} />
          <InfoUserPassword />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, marginTop: 2 }}>
          <Button
            variant='contained'
            sx={{
              bgcolor: '#A62639',
              color: 'white',
              '&:hover': {
                bgcolor: '#A62639', // Mantén el mismo color al hacer hover
              },
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