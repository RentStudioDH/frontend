import React, { useState } from 'react';
import { Box, Button, Container, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useContextGlobal } from '../../contexts/global.context';
import { Link, useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import UserDetailsForm from '../../components/molecules/reservation/UserDetailsForm';
import TusSelecciones from '../../components/molecules/reservation/TusSelecciones';
import PaymentForm from '../../components/atoms/reservation/PaymentForm';
import ReservaSection from '../../components/organisms/sections/ReservaSection';
import ReservationSummaryModal from '../../components/atoms/reservation/ReservationSummaryModal ';
import Swal from 'sweetalert2';

const ReservationDetail = () => {
  const { state } = useContextGlobal();
  const { user, reservaData, totalReservationCost, paymentInfo } = state;
  const { startDate, endDate } = reservaData;
  const navigate = useNavigate();

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [reservaDataPost, setReservaDataPost] = useState({
    productId: reservaData.id,
    userId: user.id,
    startDate: "",
    endDate: "",
    totalReservationCost: "",
    informacionDePago: ""
  });

  const handleCompleteReservation = () => {
    setReservaDataPost({
      ...reservaDataPost,
      startDate: `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
      endDate: `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`,
      totalReservationCost: totalReservationCost,
      informacionDePago: paymentInfo
    });

    if (validarDatos()) {
      setShowSummaryModal(true);
    } else {
      setShowErrorModal(true);
    }
  };

  const validarDatos = () => {
    const errors = [];
    if (!user.firstName) errors.push('Nombre es obligatorio.');
    if (!user.lastName) errors.push('Apellido es obligatorio.');
    if (!user.email) errors.push('Email es obligatorio.');
    if (!user.address || !user.address.country) errors.push('País es obligatorio.');
    if (!user.address || !user.address.street) errors.push('Dirección de Entrega es obligatoria.');
    if (!user.address || !user.address.city) errors.push('Ciudad es obligatoria.');
    if (!user.address || !user.address.state) errors.push('Provincia/Estado es obligatorio.');
    if (!user.address || !user.address.zip) errors.push('Código Postal es obligatorio.');
    if (!reservaDataPost.informacionDePago) errors.push('La información de pago es obligatoria.');

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const confirmReservation = () => {
    setShowSummaryModal(false);
    Swal.fire({
      icon: 'success',
      title: '¡Producto Reservado con Éxito!',
      html: `
        <p style="color: #7a7a7a">${reservaData.productData.name}</p>
        <br>
        <p>Redirigiendo a la página de Mis Reservas...</p>
      `,
      showConfirmButton: true,
      confirmButtonColor: '#511C29',
      confirmButtonText: 'Ir a Mis Reservas',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/user/reservas');
      }
    });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#A62639',
      }
    },
  });

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

  const renderErrorModal = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      html: `<ul>${errorMessages.map((msg, index) => `<li key=${index}>${msg}</li>`).join('')}</ul>`,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#A62639'
    }).then(() => {
      setShowErrorModal(false);
    });
  };

  return (
    <Container>
      <div className='flex items-center g-5 mb-10 mt-8'>
        <Link onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left txt-accent title "></i>
        </Link>
        <h1 className='txt-accent title ml-3'><strong>Detalles de la reserva</strong></h1>
      </div>

      <ReservaSection
        titulo="Tus selecciones"
        icono="LocalOfferIcon"
        cardContent={TusSelecciones}
        data={reservaData}
      />
      <ReservaSection
        titulo="Tus datos"
        icono="PersonIcon"
        cardContent={UserDetailsForm}
        data={user}
      />
      <ReservaSection
        titulo="Medio de pago"
        icono="PaidRoundedIcon"
        cardContent={PaymentForm}
      />

      <Box marginBottom={2} display="flex" justifyContent="center">
        <ThemeProvider theme={theme}>
          <Button sx={{ borderRadius: '1rem' }} variant="contained" color='primary' onClick={handleCompleteReservation}>Ir a completar la reserva</Button>
        </ThemeProvider>
      </Box>

      <ReservationSummaryModal
        show={showSummaryModal}
        onHide={() => setShowSummaryModal(false)}
        confirmReservation={confirmReservation}
        reservaDataPost={reservaDataPost} // pasamos los datos de la reserva
        user={user}
        totalReservationCost={totalReservationCost}
        paymentInfo={paymentInfo}
      />

      {showErrorModal && renderErrorModal()}
    </Container>
  );
};

export default ReservationDetail;
