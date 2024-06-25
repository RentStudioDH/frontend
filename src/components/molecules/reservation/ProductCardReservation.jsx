import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';

const ProductCardReservation = ({ data }) => {
  if (!data) {
    return <div>No hay información para mostrar.</div>;
  }

  const firstImage = data.attachments && data.attachments.length > 0
    ? data.attachments[0].url
    : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png';

  return (
    <Card style={{ display: 'flex', marginBottom: '16px' }}>
      <CardMedia
        component="img"
        style={{ width: 160 }}
        image={firstImage}
        alt={data.name}
      />
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
          <Rating name="read-only" value={data.rating || 4} readOnly />
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </div>
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Precio por día: ${data.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCardReservation;
