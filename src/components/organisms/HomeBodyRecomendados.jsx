import { Box, Typography } from '@mui/material'
import React from 'react'
import BodyRecomendadosContainer from '../molecules/BodyRecomendadosContainer'


const HomeBodyRecomendados = () => {
  return (
    <Box width={"80%"} mx={"10%"} padding={"1rem"} bgcolor={"#FFFFFF"}> {/* Se puede modificar */}
        <Typography variant='h5' fontWeight={'700'} color={'#56494E'} sx={{marginBottom: "10px",borderBottom: '4px solid #A62639', width: '20%'}}>Productos recomendados</Typography>
        <BodyRecomendadosContainer/>
    </Box>
  )
}

export default HomeBodyRecomendados