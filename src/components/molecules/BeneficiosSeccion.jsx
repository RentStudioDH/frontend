import React from "react";
import beneficiosData from "../../utils/beneficiosData.json";
import CardBeneficios from "../atoms/CardBeneficios";
import { Grid } from "@mui/material";
import iconsMapping from "../../utils/iconsMapping";

const BeneficiosSeccion = () => {
  return (
    <Grid container id={"benefits-grid"} columns={12} spacing={2} display={"flex"} py={"1rem"} alignItems={"top"}>
      {beneficiosData.map((card) => {
        const IconComponent = iconsMapping[card.icon];
        return (
          <Grid key={card.id} item xs={6} md={3}>
            <CardBeneficios key={card.id} title={card.title} IconComponent={IconComponent} textInfo={card.textInfo} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BeneficiosSeccion;
