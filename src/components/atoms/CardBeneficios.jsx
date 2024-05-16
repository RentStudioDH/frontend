import { Box, Typography } from "@mui/material";
import React from "react";

const CardBeneficios = ({ IconComponent, title, textInfo }) => {
  const appliedStyles = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    gap: "5px",
    padding: "1rem 2px",
  };

  const iconStyles = {
    fontSize: {
      xs: "60px",  
      md: "80px",
    },
    color: "#87807F",
  };

  return (
    <Box id="card-beneficios" display="flex" justifyContent="center" alignItems="center">
      <Box sx={appliedStyles}>
        <IconComponent sx={iconStyles} />
        <Typography
          fontSize={{
            xs: "15px",
            md: "17px",
          }}
          fontWeight="600"
          color="#56494E"
          textAlign="center"
        >
          {title}
        </Typography>
        <Typography
          fontSize={{
            xs: "0.80rem",
            md: "0.9rem",
          }}
          fontWeight="500"
          color="#7C7675"
          textAlign="center"
        >
          {textInfo}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardBeneficios;
