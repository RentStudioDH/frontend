import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const CardBeneficios = ({ img, title, textInfo }) => {
  const appliedStyles = {

    height: "12rem",
    width: "15rem",
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    overflow: "hidden",
    gap: '5px',
    padding: '1rem 2px',
  };

  const imageStyles = {
    width: "auto",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <Box display={"flex"} justifyContent={'center'} alignItems={'center'}>
      <Box sx={appliedStyles}>
        <Box width={'100%'} height={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <img src={img} alt="cardImg" style={imageStyles} />
        </Box>
        <Box width={'100%'} height={"50%"}  padding={"2px"}>
          <Typography fontSize={'1rem'} fontWeight={'600'} color={"#56494E"} sx={{ textAlign: "center" }}>{title}</Typography>
          <Typography fontSize={'0.8rem'} fontWeight={'600'} color={"#A29C9B"} sx={{ textAlign: "center" }}>{textInfo}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CardBeneficios;
