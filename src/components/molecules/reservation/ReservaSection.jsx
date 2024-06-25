import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Icon } from '@mui/material';

const ReservaSection = ({ titulo, icono, cardContent: CardContentComponent, data }) => {
  return (
    <Box mb={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <Icon>{icono}</Icon>
        <Typography variant="h5" fontWeight={600} ml={1} color={"#A62639"}>
          {titulo}
        </Typography>
      </Box>
      <Paper elevation={0} sx={{ padding: 2, borderRadius: '1rem' }}>
        <CardContentComponent data={data} />
      </Paper>
    </Box>
  );
};

export default ReservaSection;
