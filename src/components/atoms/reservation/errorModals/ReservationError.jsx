import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link, useNavigate } from 'react-router-dom';

const ReservationError = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className='flex items-center g-5 mb-6 mt-8'>
        <Link onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left txt-accent title"></i>
        </Link>
        <h1 className='txt-accent title '><strong>Detalles de la reserva</strong></h1>
      </div>
      <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" minHeight="50vh" textAlign="center">
        <ErrorOutlineIcon color="error" style={{ fontSize: 100, marginBottom: '1rem' }} />
        <Typography variant="h5" color="textPrimary" gutterBottom>
          ¡Oops! Parece que hubo un problema.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Los datos de la reserva no fueron cargados con éxito. Por favor, inténtalo nuevamente más tarde.
        </Typography>
        <Box marginTop={4}>
          <Button variant="contained" sx={{bgcolor:"#A62639"}} onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ReservationError;
