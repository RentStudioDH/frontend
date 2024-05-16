import React from 'react'
import { Box, Typography } from '@mui/material'
import SearchInput from '../molecules/SeachInput'

const BodySearchSection = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'}
    gap={"10px"} bgcolor={'#FFFFFF'} marginX={"10%"} paddingY={"3rem"}
    sx={{width:{xs: "100%", md: '80%'}, marginX:{xs: "0%", md: '10%'} }}>
        <Typography variant='h5' color={"#56494E"} fontWeight={700}>¡Hola! ¿Qué estás buscando hoy?</Typography>
        <SearchInput/>
    </Box>
  )
}

export default BodySearchSection
