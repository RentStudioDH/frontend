import React, { useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { useContextGlobal } from '../../../contexts/global.context';

const ProductCardReservation = ({ data }) => {

    const {state, getProductById} = useContextGlobal();
    const {reservaData} = state
    

    useEffect(async ()=>{
      await console.log(getProductById(reservaData.id));
    }, [])
  
  // const firstImage = data.attachments && data.attachments.length > 0
  //   ? data.attachments[0].url
  //   : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png';

  return (
    <Card style={{ display: 'flex', marginBottom: '16px' }}>
      <CardMedia
        component="img"
        style={{ width: 160 }}
        image={"firstImage"}
        alt={"data.name"}
      />
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Rating name="read-only" value={"data.rating "|| 4} readOnly />
          <Typography variant="h5" fontWeight={500} color={"#511C29"} component="div">
            {"data.name"}
          </Typography>
          <Typography variant="body1" color="#A29C9B">
            {"data.description"}
          </Typography>
        </div>
        <Typography variant="body1" fontWeight={500} color={"#511C29"} style={{ marginTop: '16px' }}>
          Precio por día: ${"data.price"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCardReservation;
