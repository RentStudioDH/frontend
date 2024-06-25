import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';

const UserDetailsForm = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Datos del Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Apellido" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Teléfono" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="País" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Dirección de Entrega" fullWidth variant="outlined" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserDetailsForm;
