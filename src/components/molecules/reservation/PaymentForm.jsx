import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';


const PaymentForm = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color={"#511C29"} fontWeight={"600"} marginBottom={"1rem"}>
        ¿Cómo te gustaría pagar?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Titular de la Tarjeta" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Tipo de Tarjeta" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Número de Tarjeta" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Fecha de Caducidad" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Código de Seguridad" fullWidth variant="outlined" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PaymentForm;
