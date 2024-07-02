import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context';
import { useNavigate } from 'react-router-dom';

const ReservaCard = ({ reservation, onClick }) => {
  const { getProductById } = useContextGlobal();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductById(reservation.productId);
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [reservation, getProductById]);

  const handleReservationClick = (id) => {
    navigate(`/producto/${id}`);
  };

  const firstImage =
    productData?.attachments?.length > 0
      ? productData.attachments[0].url
      : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png';

  const formattedDate = new Date(reservation.creationDateTime).toLocaleDateString();


  return (
    <Paper 
      elevation={3} 
      sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, cursor: 'pointer' }}
      onClick={() => handleReservationClick(reservation.productId)}
    >
      <Box 
        component="img"
        sx={{ width: '40%', height: '100%', maxHeight: "200px" , objectFit: 'cover' }}
        src={firstImage}
        alt={productData?.attachments?.[0]?.fileName || 'Default Image'}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: '50%' }}>
        <Typography variant="h6" component="div" color={"#511C29"}>
          {productData?.name || 'Loading...'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
        <strong>Fecha de cuando se realizó la reserva:</strong> {formattedDate}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
        <strong>Total:</strong> $ {reservation.amount}
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        sx={{ 
          bgcolor: "#A62639", 
          color: "white",
          alignSelf: 'flex-end',
          margin: 2,
          '&:hover': {
            bgcolor: "#A62639" // Mantén el mismo color al hacer hover
          } 
        }} 
      >
        Volver a Reservar
      </Button>
    </Paper>
  );
};

export default ReservaCard;
