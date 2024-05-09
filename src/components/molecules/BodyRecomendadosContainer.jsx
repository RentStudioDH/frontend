import { Box, Grid } from "@mui/material";
import React from "react";
import CardProductoRecomendado from "./CardProductoRecomendado";
import productosRecomendadosData from "../../utils/productosRecomendadosData.json";

const BodyRecomendadosContainer = () => {

  return (
    <Box>
      <Grid
        container
        spacing={2}
        display={"flex"}
        justifyContent={"center"}
      >
        {productosRecomendadosData.map((card) => (
          <Grid key={card.id} item xs={12} md={6}>
            <CardProductoRecomendado key={card.id} title={card.title} textInfo={card.textInfo} price={card.price} img={card.img}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BodyRecomendadosContainer;
