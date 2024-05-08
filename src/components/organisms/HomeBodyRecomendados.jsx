import { Box, Typography } from '@mui/material'
import React from 'react'
import BodyRecomendadosContainer from '../molecules/BodyRecomendadosContainer'

const HomeBodyRecomendados = () => {
  return (
    <Box bgcolor={'#E7E7E7'} width={'100%'}>
        <Typography variant='h5' color={'#511C29'} sx={{marginBottom: "10px", paddingLeft: '5%'}}>Productos recomendados</Typography>
    
        <BodyRecomendadosContainer/>
    </Box>
  )
}

export default HomeBodyRecomendados