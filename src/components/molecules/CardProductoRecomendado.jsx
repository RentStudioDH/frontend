import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import PrimaryButton from "../atoms/PrimaryButton";

const CardProductoRecomendado = ({ img, title, textInfo, price }) => {
  return (
    <Card sx={{ display: "flex", borderRadius: "15px", height: 250, width: "auto" }}>
      {/* Esta Card en mobile podria ser en vertical */}
      <CardMedia
        sx={{ width: "40%", height: "100%",objectFit: 'cover' }}
        title="product"
        image={img}
      />
      <CardContent sx={{ width: "60%", maxHeight: "250px" }}>
        <Box height={"80%"}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={"#A62639"}
            fontWeight={"600"}
          >
            {title}
          </Typography>

          <Typography variant="body2" color="#56494E" fontWeight={"500"}>
          {textInfo}
          </Typography>
        </Box>
        <Box>
          <Box display={"flex"} justifyContent={"flex-end"} height={"10%"}>
            <Typography variant="body1" color={"#A62639"} fontWeight={"600"}>
              {price}
            </Typography>
          </Box>

          <Box display={"flex"} justifyContent={"flex-end"} >
            <PrimaryButton text={"COTIZAR"} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardProductoRecomendado;
