import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const CardBeneficios = ({ img, title, textInfo }) => {
  const appliedStyles = {
    bgcolor: "#FFFFFF",
    height: "9rem",
    width: "14rem",
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    overflow: "hidden",
    gap: '2px',
    padding: '0.4rem',
  };

  const imageStyles = {
    width: "40%",
    height: "auto",
    objectFit: "cover",
  };

  return (
    <Paper elevation={6} sx={appliedStyles}>
        <img src={img} alt="cardImg" style={imageStyles} />
      <Box width={'100%'} height={"60%"}  padding={"2px"}>
        <Typography fontSize={'1rem'} fontWeight={'600'} color={"#56494E"} sx={{ textAlign: "center" }}>{title}</Typography>
      </Box>
    </Paper>
  );
};

export default CardBeneficios;
