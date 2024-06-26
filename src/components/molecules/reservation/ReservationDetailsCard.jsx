import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ReservationDetailsCard = ({ data }) => {

  // Validación de datos
  if (!data || !data.startDate || !data.endDate) {
    return (
      <Card style={{ height: '15rem' }}>
        <CardContent>
          <Typography variant="body1" color={"#511C29"}>
            Datos de reserva no disponibles.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Validación de fecha de devolución posterior a fecha de entrega
  if (data.startDate > data.endDate) {
    return (
      <Card style={{ height: '15rem' }}>
        <CardContent>
          <Typography variant="body1" color={"#511C29"}>
            La fecha de devolución debe ser posterior a la fecha de entrega.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { startDate, endDate } = data;

  // Calcular duración total en días
  const calculateTotalDays = () => {
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convertir a días
    return Math.ceil(differenceInDays); // Redondear hacia arriba
  };

  // Calcular total a pagar
  const calculateTotalPayment = () => {
    // Aquí puedes implementar la lógica para calcular el total a pagar
    // Por ejemplo, multiplicar la duración total en días por un precio base, etc.
    const totalDays = calculateTotalDays();
    const pricePerDay = data.productData ? data.productData.price : 0; // Obtener el precio por día del producto
    const totalPayment = totalDays * pricePerDay; // Ejemplo de cálculo básico
    return `$${totalPayment.toFixed(2)}`; // Formatear el total a pagar
  };

  const totalDays = calculateTotalDays();
  const totalPayment = calculateTotalPayment();

  return (
    <Card style={{ height: '15rem' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', padding: '3rem' }}>
        <Typography variant="body1" color={"#511C29"}>
          <strong>Fecha de Entrega:</strong> {`${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}
        </Typography>
        <Typography variant="body1" color={"#511C29"}>
          <strong>Fecha de Devolución:</strong> {`${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}
        </Typography>
        <Typography variant="body1" color={"#511C29"}>
          <strong>Duración Total en Días:</strong> {totalDays} días
        </Typography>
        <Typography variant="body1" color={"#511C29"}>
          <strong>Total a Pagar:</strong> {totalPayment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReservationDetailsCard;
