import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import ProductGalery from '../../molecules/product/ProductGalery'

const ProductImages = ({images}) => {
  console.log(images);

  return (
    <Card elevation={4} sx={{ borderRadius: '15px', padding: "1.5rem"}}>
      <Box sx={{ borderBottom: '2px solid #DB324D', paddingBottom: '8px'}} marginBottom={"2rem"}>
        <Typography variant="h5" color={"#A62639"} fontWeight={"700"}>Galería</Typography>
      </Box>

      <Box height={{xs: 600, md: 600}} >
        <Grid container display={"flex"} justifyContent={"space-between"} height={{xs: "100%", md: "100%"}} spacing={{xs: 2, md: 0}}>
          <Grid item xs={12} md={6}>
            <Box height={{xs: "100%", md: "100%"}} width={{xs: "100%", md: "98%"}} >
              <img src={`../${images}`} alt="Foto principal" style={{ width: '100%', height: '100%' }}/>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box height={{xs: "100%", md: "100%"}} width={{xs: "100%", md: "98%"}}>
                <ProductGalery images={images}/>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box height={35} display={"flex"} justifyContent={"flex-end"} width={{xs: "100%", md: "98%"}}>
        {/* <Button variant="text" onClick={handleClick}> */}
            <Typography variant='h5' color={"#A62639"} fontWeight={600}>Ver más</Typography>
        {/* </Button> */}
      </Box>
    </Card>
  )
}

export default ProductImages
