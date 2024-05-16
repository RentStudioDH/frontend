import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, IconButton, InputBase, Paper } from '@mui/material';

export default function SearchInput() {
  return (
    <Paper elevation={2} sx={{ width: 350, borderRadius: "15px"}}>
        <InputBase  
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        color='#56494E'
        inputProps={{ 'aria-label': 'search google maps' }}
      />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search"> 
            <img src="../../../public/search_icon.png" alt="" />
        </IconButton> 

    </Paper>
  );
}

