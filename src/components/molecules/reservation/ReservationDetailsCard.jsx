import React from 'react';
import { Card, CardContent, Typography, TextField } from '@mui/material';

const ReservationDetailsCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Fecha de Entrega
        </Typography>
        <TextField
          type="date"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Typography variant="h6">
          Fecha de Devolución
        </Typography>
        <TextField
          type="date"
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Typography variant="h6">
          Duración Total en Días
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          disabled
          value="X días"
        />
        <Typography variant="h6">
          Total a Pagar
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          disabled
          value="$XXX.XX"
        />
      </CardContent>
    </Card>
  );
}

export default ReservationDetailsCard;
