import React from 'react';
import { Box, Button, Paper, Typography, Divider } from '@mui/material';
import ProductCardReservation from './ProductCardReservation';

const ReservationSummaryModal = ({ show, onHide, reservaDataPost, confirmReservation }) => {
  if (!show) return null;


  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        bgcolor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
        backdropFilter: 'blur(4px)', // Efecto de desenfoque del fondo (opcional, requiere soporte de navegador)
        overflow: 'auto', // Permite hacer scroll si el contenido es largo
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 600,
          width: '90%', // Ancho del modal ajustable
          position: 'relative', // Asegura que el Paper se posicione correctamente
          borderRadius: "20px",
          maxHeight: '80vh', // Altura máxima del Paper
          overflowY: 'auto', // Habilita el scroll vertical si es necesario
        }}
      >
        <Typography variant="h5" fontWeight={600} sx={{ color: "#A62639" }} gutterBottom>
          Resumen de la Reserva
        </Typography>
        
        {/* Detalles del Producto */}
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Detalles del Producto
          </Typography>
          <Divider />
          <ProductCardReservation data={reservaDataPost} />
        </Box>

        {/* Divider */}
        <Divider />

        {/* Fechas de Entrega y Devolución */}
        <Box mt={2}>
          <Typography variant="body1" sx={{ color: "#511C29" }}>
            <p><strong>Fecha de Entrega:</strong> {reservaDataPost.startDate}</p>
            <p><strong>Fecha de Devolución:</strong> {reservaDataPost.endDate}</p>
            {/* Calcular y mostrar Duración Total si es necesario */}
            {/* <p><strong>Duración Total:</strong> {calculateDuration(reservaDataPost.startDate, reservaDataPost.endDate)}</p> */}
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Datos del Usuario */}
        <Box mt={2}>
          <Typography variant="body1" sx={{ color: "#511C29" }}>
            <p><strong>Nombre Completo:</strong> {reservaDataPost.nombre}</p>
            <p><strong>Dirección de Entrega:</strong> {reservaDataPost.direccion}</p>
            <p><strong>Teléfono de Contacto:</strong> {reservaDataPost.telefono}</p>
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Método de Pago y Total a Pagar */}
        <Box mt={2}>
          <Typography variant="body1" sx={{ color: "#511C29" }}>
            <p><strong>Método de Pago:</strong> {reservaDataPost.metodoPago}</p>
            <p><strong>Total a Pagar:</strong> {reservaDataPost.totalReservationCost}</p>
          </Typography>
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined"
              sx={{
                color: "#A62639",
                borderColor: "#A62639",
                fontWeight: "600",
                '&:hover': {
                  color: "#8C1C2E",
                  borderColor: "#8C1C2E",
                },
              }} onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="contained"
              sx={{
                bgcolor: "#A62639",
                fontWeight: "600",
                '&:hover': {
                  bgcolor: "#8C1C2E",
                },
              }} onClick={confirmReservation}>
            Confirmar Reserva
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReservationSummaryModal;
