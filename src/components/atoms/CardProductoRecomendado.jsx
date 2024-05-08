import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CardProductoRecomendado = () => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        sx={{ width: "35%", height: 250 }}
        title="product"
        image='https://fastly.picsum.photos/id/250/4928/3264.jpg?hmac=4oIwzXlpK4KU3wySTnATICCa4H6xwbSGifrxv7GafWU'
      />
      <CardContent
        sx={{width: "65%", maxHeight:"250px"}}
      >
        <Typography gutterBottom variant="h5" component="div">
          Nombre del producto
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae ipsam explicabo impedit cumque quos vitae adipisci nemo! Ad laudantium maiores blanditiis, ab soluta in repudiandae, numquam accusantium pariatur impedit possimus.
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardProductoRecomendado
