import React from 'react';
import { Box, Typography } from '@mui/material';
import MiPerfil from '../../atoms/user/MiPerfil';

const UserPerfil = ({ title }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" component="h1" sx={{ color: "#56494E" }}>
          <strong>{title}</strong>
        </Typography>
      </Box>
      <MiPerfil />
    </Box>
  );
};

export default UserPerfil;
