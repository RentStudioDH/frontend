import React from 'react'
import { Box, Typography } from '@mui/material'


const Footer = () => {
  return (
    <Box
    bgcolor={"#511C29"}
    width={"100%"}
    height={"70px"}
    display={"flex"} 
    justifyContent={"space-between"}
    alignItems={'center'}
    sx={{paddingX: {xs: "10px", md: "10%" }}}
    marginTop={"1rem"}
    >
        <Typography color={"#FFFFFF"} variant='body1' 
        sx={{width: {xs: "60%", md: "70%" }}}>
            Todos los derechos reservados. Hecho por el Grupo7
        </Typography>
        <Box color={"#FFFFFF"} display={"flex"} justifyContent={"space-between"} 
        sx={{width: {xs: "30%", md: "10%" }}}>
            <img src="footer/facebook.svg" alt="facebook" />
            <img src="footer/twitter.svg" alt="twitter" />
            <img src="footer/instagram.svg" alt="instagram" />
        </Box>
    </Box>
  )
}

export default Footer