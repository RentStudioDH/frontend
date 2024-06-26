import React from 'react';
import { Box, Button, Container, createTheme, ThemeProvider, Typography } from '@mui/material';
import UserDetailsForm from '../../components/molecules/reservation/UserDetailsForm';
import { useContextGlobal } from '../../contexts/global.context';
import ReservaSection from '../../components/molecules/reservation/ReservaSection';
import TusSelecciones from '../../components/molecules/reservation/TusSelecciones';
import PaymentForm from '../../components/molecules/reservation/PaymentForm';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { Link, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ProductIcon from '@mui/icons-material/LocalOffer'; // Importar ícono de producto

const ReservationDetail = () => {
  const { state } = useContextGlobal();
  const { data, user, reservaData } = state;
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#A62639',
      }
    },
  });

  // Validación de carga de datos de reserva
  if (reservaData.id == null) {
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
  }

  return (
    <Container>
      <div className='flex items-center g-5 mb-6 mt-8'>
        <Link onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left txt-accent title"></i>
        </Link>
        <h1 className='txt-accent title '><strong>Detalles de la reserva</strong></h1>
      </div>

      <ReservaSection
        titulo="Tus selecciones"
        icono={<ProductIcon />} // Utilizar el ícono de producto importado
        cardContent={TusSelecciones}
        data={reservaData}
      />
      <ReservaSection
        titulo="Tus datos"
        icono="person"
        cardContent={UserDetailsForm}
        data={user}
      />
      <ReservaSection
        titulo="Medio de pago"
        icono={<PaidRoundedIcon />}
        cardContent={PaymentForm}
        data={data}
      />

      <Box marginBottom={2} display="flex" justifyContent="center">
        <ThemeProvider theme={theme}>
          <Button sx={{ borderRadius: '1rem' }} variant="contained" color='primary'>Completar la reserva</Button>
        </ThemeProvider>
      </Box>
    </Container>
  );
}

export default ReservationDetail;
