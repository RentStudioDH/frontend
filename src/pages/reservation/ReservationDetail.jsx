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
  const { data, user, reservaData,totalReservationCost } = state;
  const {startDate, endDate} = reservaData
  const navigate = useNavigate();

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [reservaDataPost, setReservaDataPost] = useState({
    productId: reservaData.id,
    userId: user.id,
    startDate: "",
    endDate: "",
    totalReservationCost: "",
    informacionDePago: ""
  })

  // Guardar datos de la reserva
const handleCompleteReservation = () => {
    // Actualizar los datos de reserva a enviar
    setReservaDataPost({
      ...reservaDataPost,
      startDate: `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
      endDate: `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`,
      totalReservationCost: totalReservationCost,
      informacionDePago: data.paymentInfo 
    });

    // Validar datos antes de mostrar el modal
    if (validarDatos()) {
      setShowSummaryModal(true); // Mostrar modal de resumen si los datos son válidos
    } else {
      setShowErrorModal(true); // Mostrar modal de error si los datos no son válidos
    }
};

const validarDatos = ()=>{
  if ("condition") {
    // chequear que la informacion del usuario y direccion del mismo este completa
          // chequear que la informacion del pago este completa
  }
  return true
}


  // Function to confirm reservation after showing summary
  const confirmReservation = () => {
    // Send reservaDataPost to backend or perform final actions
    // Navigate to confirmation page or perform further actions
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
      confirmButtonColor: '#511C29', // Color del botón de confirmación
      confirmButtonText: 'Ir a Mis Reservas',
      allowOutsideClick: false, // Evita que se cierre haciendo clic fuera del modal
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


  // Modal for showing error on incomplete data
  const renderErrorModal = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor completa todos los datos requeridos.',
      confirmButtonText: 'Entendido'
    }).then(() => {
      setShowErrorModal(false);
    });
  };

  return (
    <Container>
      <div className='flex items-center g-5 mb-10 mt-8'>
        <Link onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left txt-accent title"></i>
        </Link>
        <h1 className='txt-accent title'><strong>Detalles de la reserva</strong></h1>
      </div>

      <ReservaSection
        titulo="Tus selecciones"
        icono="LocalOfferIcon" // Utilizar el nombre del ícono de producto importado
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
        data={data}
      />

      <Box marginBottom={2} display="flex" justifyContent="center">
        <ThemeProvider theme={theme}>
          <Button sx={{ borderRadius: '1rem' }} variant="contained" color='primary' onClick={handleCompleteReservation}>Ir a completar la reserva</Button>
        </ThemeProvider>
      </Box>

            {/* Modal for reservation summary */}
            <ReservationSummaryModal
        show={showSummaryModal}
        onHide={() => setShowSummaryModal(false)}
        reservaDataPost={reservaDataPost}
        confirmReservation={confirmReservation}
      />

      {/* Modal for validation error */}
      {showErrorModal &&
        renderErrorModal()
      }
    </Container>
  );
}

export default ReservationDetail;
