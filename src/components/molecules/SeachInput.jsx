import React from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '../../../public/searchIcon.png'; // Importa la imagen directamente

export default function SearchInput({ searchHandler }) { // Desestructura las props
  return (
    <Paper elevation={2} sx={{ width: {xs:"80%", md: "30%"}, borderRadius: "28px", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <InputBase  
        sx={{ ml: 2, flex: 1 }}
        placeholder="Buscar cámaras..."
        color='#56494E'
        inputProps={{ 'aria-label': 'Buscar cámaras...' }}
      />
      <IconButton type="button" onClick={searchHandler} sx={{ p: '10px' }} aria-label="search"> 
        <img width={"35px"} height={"35px"} src={SearchIcon} alt="search" /> {/* Usa la imagen importada */}
      </IconButton> 
    </Paper>
  );
}
