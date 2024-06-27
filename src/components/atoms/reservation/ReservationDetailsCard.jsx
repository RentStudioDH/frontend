import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context';

const ReservationDetailsCard = ({ data }) => {

  const { setReservationCost } = useContextGlobal();
  const { startDate, endDate } = data;


  // Validación de datos
  if (!data || !data.startDate || !data.endDate) {
    return (
      <Card style={{ height: '16rem', marginBottom: 2, boxShadow: 3, paddingY: "5px" }}>
        <CardContent>
          <Typography variant="body1" color={"#511C29"}>
            No se seleccionó una fecha disponible correctamente para la reserva.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Validación de fecha de devolución posterior a fecha de entrega
  if (data.startDate > data.endDate) {
    return (
      <Card style={{ height: '16rem', marginBottom: 2, boxShadow: 3, paddingY: "5px" }}>
        <CardContent>
          <Typography variant="body1" color={"#511C29"}>
            La fecha de devolución debe ser posterior a la fecha de entrega.
          </Typography>
        </CardContent>
      </Card>
    );
  }


  // Calcular duración total en días
  const calculateTotalDays = () => {
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convertir a días
    return Math.ceil(differenceInDays); // Redondear hacia arriba
  };

  // Calcular total a pagar
  const calculateTotalPayment = () => {
    const totalDays = calculateTotalDays();
    const pricePerDay = data.productData ? data.productData.price : 0; // Obtener el precio por día del producto
    const totalPayment = totalDays * pricePerDay;
    const totalPaymentFixed = totalPayment.toFixed(2)
    return `$${totalPaymentFixed}`; // Formatear el total a pagar
  };

  const totalDays = calculateTotalDays();
  const totalPayment = calculateTotalPayment();

  useEffect(() => {
    setReservationCost(totalPayment); // Actualizar el costo de la reserva en el contexto global
  }, [totalPayment, setReservationCost]); 


  return (
    <Card style={{ height: '16rem', marginBottom: 2, boxShadow: 3, paddingY: "5px" }}>
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
