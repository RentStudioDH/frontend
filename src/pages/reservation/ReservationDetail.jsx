import React, { useState } from "react";
import { Box, Button, Container, createTheme, ThemeProvider, Typography } from "@mui/material";
import { useContextGlobal } from "../../contexts/global.context";
import { Link, useNavigate } from "react-router-dom";
import UserDetailsForm from "../../components/molecules/reservation/UserDetailsForm";
import TusSelecciones from "../../components/molecules/reservation/TusSelecciones";
import PaymentForm from "../../components/atoms/reservation/PaymentForm";
import ReservaSection from "../../components/organisms/sections/ReservaSection";
import ReservationSummaryModal from "../../components/atoms/reservation/ReservationSummaryModal";
import Swal from "sweetalert2";
import ReservationError from "../../components/atoms/reservation/errorModals/ReservationError";
import ErrorModal from "../../components/atoms/reservation/errorModals/ErrorModal";
import { fetchData } from "../../utils/js/apiRequest";

const formatDate = (date) => {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#A62639",
    },
  },
});

const ReservationDetail = () => {
  const { state, setReservaData } = useContextGlobal();
  const { user, reservaData, totalReservationCost, paymentInfo } = state;
  const { startDate, endDate } = reservaData;
  const navigate = useNavigate();

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const [reservaDataPost, setReservaDataPost] = useState({
    productId: reservaData.id,
    userId: user.id,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    totalReservationCost: "",
    informacionDePago: "",
  });

  const handleCompleteReservation = () => {
    // Validar los datos antes de proceder
    const isValid = validarDatos();
    if (isValid) {
      setReservaDataPost({
        ...reservaDataPost,
        informacionDePago: paymentInfo,
      });

      // Mostrar el modal de resumen de reserva
      setShowSummaryModal(true);
    } else {
      // Mostrar el modal de error si los datos no son válidos
      setShowErrorModal(true);
    }
  };

  const validarDatos = () => {
    const errors = [];
    if (!user.firstName) errors.push("Nombre es obligatorio.");
    if (!user.lastName) errors.push("Apellido es obligatorio.");
    if (!user.email) errors.push("Email es obligatorio.");
    if (!user.address || !user.address.country) errors.push("País es obligatorio.");
    if (!user.address || !user.address.street) errors.push("Dirección de Entrega es obligatoria.");
    if (!user.address || !user.address.city) errors.push("Ciudad es obligatoria.");
    if (!user.address || !user.address.state) errors.push("Provincia/Estado es obligatorio.");
    if (!user.address || !user.address.zip) errors.push("Código Postal es obligatorio.");

    // Validar información de pago
    if (!paymentInfo.cardNumber) errors.push("Número de tarjeta es obligatorio.");
    if (!paymentInfo.expirationDate) errors.push("Fecha de vencimiento es obligatoria.");
    if (!paymentInfo.securityCode) errors.push("Codigo de seguridad es obligatorio.");

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const confirmReservation = async () => {
    setShowSummaryModal(false);

    try {
      const response = await fetchData({
        method: "POST",
        endpoint: "https://apidh.jackmoon.dev/reservations",
        data: {
          productId: reservaDataPost.productId,
          startDate: reservaDataPost.startDate,
          endDate: reservaDataPost.endDate,
          payment: reservaDataPost.informacionDePago,
        },
        requireAuth: true,
      });

      if (response.status !== 200) {
        throw new Error("Failed to confirm reservation");
      }

      Swal.fire({
        icon: "success",
        title: "¡Producto Reservado con Éxito!",
        html: `
          <p style="color: #7a7a7a">${reservaData.productData.name}</p>
          <br>
          <p>Redirigiendo a la página de Mis Reservas...</p>
        `,
        showConfirmButton: true,
        confirmButtonColor: "#511C29",
        confirmButtonText: "Ir a Mis Reservas",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user/reservas");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al confirmar la reserva. Por favor, inténtalo nuevamente más tarde.",
      });
    }
  };

  if (reservaData.id == null) {
    return <ReservationError />;
  }

  return (
    <Container>
      <div className="flex items-center g-5 mb-10 mt-8">
        <Link onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left txt-accent title "></i>
        </Link>
        <h1 className="txt-accent title ml-3">
          <strong>Detalles de la reserva</strong>
        </h1>
      </div>

      <ReservaSection titulo="Tus selecciones" icono="LocalOfferIcon" cardContent={TusSelecciones} data={reservaData} />
      <ReservaSection titulo="Tus datos" icono="PersonIcon" cardContent={UserDetailsForm} data={user} />
      <ReservaSection titulo="Medio de pago" icono="PaidRoundedIcon" cardContent={PaymentForm} />

      <Box marginBottom={2} display="flex" justifyContent="center">
        <ThemeProvider theme={theme}>
          <Button sx={{ borderRadius: "1rem" }} variant="contained" color="primary" onClick={handleCompleteReservation}>
            Ir a completar la reserva
          </Button>
        </ThemeProvider>
      </Box>

      <ReservationSummaryModal show={showSummaryModal} onHide={() => setShowSummaryModal(false)} confirmReservation={confirmReservation} reservaDataPost={reservaDataPost} user={user} totalReservationCost={totalReservationCost} paymentInfo={paymentInfo} />

      {showErrorModal && <ErrorModal errorMessages={errorMessages} onClose={() => setShowErrorModal(false)} />}
    </Container>
  );
};

export default ReservationDetail;
