import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Icon } from '@mui/material';

const ReservaSection = ({ titulo, icono, cardContent: CardContentComponent, data }) => {
  return (
    <Box mb={6}>
      <Box display="flex" alignItems="center" mb={3}>
        <Icon>{icono}</Icon>
        <Typography variant="h4" fontWeight={600} ml={2} color={"#A62639"}>
          {titulo}
        </Typography>
      </Box>
      <Paper elevation={0} sx={{ padding: 4, borderRadius: '1rem' }}>
        <CardContentComponent data={data} />
      </Paper>
    </Box>
  );
};

export default ReservaSection;
