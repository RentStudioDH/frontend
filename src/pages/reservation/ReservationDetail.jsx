import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import ProductCardReservation from '../../components/molecules/reservation/ProductCardReservation';
import ReservationDetailsCard from '../../components/molecules/reservation/ReservationDetailsCard';
import UserDetailsForm from '../../components/molecules/reservation/UserDetailsForm';
import PaymentForm from '../../components/molecules/reservation/PaymentForm';

const ReservationDetail = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Detalles del Producto y Datos de la Reserva */}
        <Grid item xs={12} container spacing={3}>
            <Grid item xs={12} md={12}>
                <Typography variant='h4' color={"#A62639"}>Tus Selecciones</Typography>                
            </Grid>
          {/* Producto Seleccionado */}
          <Grid item xs={12} md={6}>
            <ProductCardReservation />
          </Grid>
          
          {/* Datos de la Reserva */}
          <Grid item xs={12} md={6}>
            <ReservationDetailsCard />
          </Grid>
        </Grid>
        
        {/* Datos del Usuario */}
        <Grid item xs={12} md={12}>
                <Typography variant='h4' color={"#A62639"}>Datos del Usuario</Typography>                
        </Grid>
        <Grid item xs={12}>
          <UserDetailsForm/>
        </Grid>
        
        {/* Medio de Pago */}
        <Grid item xs={12} md={12}>
                <Typography variant='h4' color={"#A62639"}>Medio de Pago</Typography>                
        </Grid>
        <Grid item xs={12}>
          <PaymentForm />
        </Grid>
        
        {/* Botón para Completar la Reserva */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Completar Reserva
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReservationDetail;
