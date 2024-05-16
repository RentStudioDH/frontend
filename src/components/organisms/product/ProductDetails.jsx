import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ProductDetails = ({details}) => {
  return (
    <Paper elevation={4} display={"flex"} flexDirection={"column"} 
    sx={{ borderRadius: '15px', padding: "3rem"}}>
      <Box display={"flex"} justifyContent={"center"}>
        <Box width={"150px"} sx={{ borderBottom: '2px solid #DB324D', paddingBottom: '8px', display:"flex", justifyContent:"center", marginBottom: "20px" }}>
          <Typography variant='h5' color={"#511C29"}>Detalles</Typography>
        </Box>
      </Box>
      <Typography variant='body1' color={"#56494E"} fontWeight={600} >{details}</Typography>
    </Paper>
  )
}

export default ProductDetails
