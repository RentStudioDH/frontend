import React, { useContext } from 'react';
import { Card, CardContent, Typography, Grid, TextField, MenuItem } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context';

const PaymentForm = () => {
  const { state, dispatch } = useContextGlobal();
  const { cardHolder, cardType, cardNumber, expirationDate, securityCode } = state.paymentInfo;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    switch (name) {
      case 'cardHolder':
        formattedValue = value.toUpperCase(); // Convertir a mayúsculas
        break;
      case 'expirationDate':
        // Asegurar formato MM/YY
        formattedValue = value.replace(/[^0-9]/g, '').slice(0, 4); // Quitar caracteres no numéricos
        if (formattedValue.length > 2) {
          formattedValue = formattedValue.replace(/(\d{2})(\d{2})/, '$1/$2');
        }
        break;
      case 'securityCode':
        // Limitar a 3 caracteres numéricos
        formattedValue = value.replace(/\D/g, '').slice(0, 3);
        break;
      default:
        break;
    }

    dispatch({ type: 'UPDATE_PAYMENT_INFO', payload: { [name]: formattedValue } });
  };

  const formatCardNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    // Format with dashes every 4 characters
    return numericValue.replace(/(\d{4})/g, '$1-').slice(0, 19);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="#511C29" fontWeight="600" marginBottom="1rem">
          ¿Cómo te gustaría pagar?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Titular de la Tarjeta"
              fullWidth
              variant="outlined"
              name="cardHolder"
              value={cardHolder || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Tipo de Tarjeta"
              fullWidth
              variant="outlined"
              name="cardType"
              value={cardType || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="debito">Débito</MenuItem>
              <MenuItem value="credito">Crédito</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Número de Tarjeta"
              fullWidth
              variant="outlined"
              name="cardNumber"
              value={formatCardNumber(cardNumber || '')}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Caducidad (MM/YY)"
              fullWidth
              variant="outlined"
              name="expirationDate"
              value={expirationDate || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Código de Seguridad"
              fullWidth
              variant="outlined"
              name="securityCode"
              value={securityCode || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
