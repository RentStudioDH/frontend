import React from 'react';
import { Paper, Typography, Box, Icon } from '@mui/material';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';

const iconMapping = {
  PaidRoundedIcon: <PaidRoundedIcon sx={{ fontSize: '34px', color: '#A62639' }} />,
  LocalOfferIcon: <LocalOfferIcon sx={{ fontSize: '34px', color: '#A62639' }} />,
  PersonIcon: <PersonIcon sx={{ fontSize: '34px', color: '#A62639' }} />,
};

const ReservaSection = ({ titulo, icono, cardContent: CardContentComponent, data }) => {
  const IconComponent = iconMapping[icono];

  return (
    <Box mb={6}>
      <Box display="flex" alignItems="center" mb={3}>
        {IconComponent || <Icon sx={{ fontSize: '34px', color: '#A62639' }}>{icono}</Icon>}
        <Typography 
          variant="h4" 
          fontWeight={600} 
          ml={2} 
          color={"#A62639"} 
          component="span" 
          sx={{ display: 'flex', alignItems: 'center' }}
        >
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
