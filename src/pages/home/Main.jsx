import { Box, Container } from '@mui/material'
import React from 'react'
import HomeBodyRecomendados from "../../Components/organisms/HomeBodyRecomendados";
import MainBodyBeneficios from '../../Components/organisms/MainBodyBeneficios';
const Main = () => {
  return (
    <Box className={'body'}>
        <Box>
            <MainBodyBeneficios/>
        </Box>

        <Box marginTop={'20px'}>
            <HomeBodyRecomendados/>
        </Box>
    </Box>
  )
}

export default Main