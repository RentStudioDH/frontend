import React from 'react';
import { Box, Grid, Button, Typography, Container } from '@mui/material';
import ProductCardReservation from '../../components/molecules/reservation/ProductCardReservation';
import UserDetailsForm from '../../components/molecules/reservation/UserDetailsForm';
import { useContextGlobal } from '../../contexts/global.context';
import ReservaSection from '../../components/molecules/reservation/ReservaSection';

const ReservationDetail = () => {
    const { state } = useContextGlobal();
    const { data, user } = state;


    return (
      <Container>
        <Typography>titulo</Typography>
        <ReservaSection 
          titulo="Tus selecciones" 
          icono="person" 
          cardContent={UserDetailsForm} 
          data={user} 
        />
        <ReservaSection 
          titulo="Tus datos" 
          icono="person" 
          cardContent={UserDetailsForm} 
          data={user} 
        />
        <ReservaSection 
          titulo="Medio de pago" 
          icono="shopping_cart" 
          cardContent={UserDetailsForm} 
          data={data} 
        />
        <Button>reservar</Button>
      </Container>
    );
}

export default ReservationDetail;
