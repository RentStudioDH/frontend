import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const ProductIdeas = () => {
  return (
    <Paper elevation={4}
      sx={{ borderRadius: '15px', padding: "3rem", gap: "1rem", display:"flex", flexDirection:"column", alignItems: "center" }}>
      <Box sx={{ borderBottom: '2px solid #DB324D', paddingBottom: '8px', display:"flex", justifyContent: "center", alignItems: "center" }}>
        <LightbulbOutlinedIcon sx={{ color: '#DB324D', marginRight: '0.1rem', width: "35px", height:"35px" }} />
        <Typography variant='h5' fontWeight={500} color={"#511C29"}>Ideal para:</Typography>
      </Box>
      <Box display={"flex"} flexDirection={{xs: "row", md: "column"}} justifyContent={"space-between"} gap={"1rem"}>
        <Typography variant='h6' fontWeight={500} sx={{ marginBottom: { xs: '1rem', md: '0' } }}>Lore</Typography>
        <Typography variant='h6' sx={{ marginBottom: { xs: '1rem', md: '0' } }}>Dolor</Typography>
        <Typography variant='h6' sx={{ marginBottom: { xs: '1rem', md: '0' } }}>Ipsum</Typography>
      </Box>
    </Paper>
  );
};

export default ProductIdeas;
