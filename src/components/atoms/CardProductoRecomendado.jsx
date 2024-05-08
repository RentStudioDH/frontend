import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CardProductoRecomendado = () => {
  return (
    <Card>
        <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            Nombre del producto
            </Typography>
            <Typography variant="body2" color="text.secondary">
            La demás info aun no miramos referencias
            </Typography>
        </CardContent>
    </Card>
  )
}

export default CardProductoRecomendado