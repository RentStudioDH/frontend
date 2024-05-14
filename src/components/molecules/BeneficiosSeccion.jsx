import React from 'react';
import beneficiosData from "../../utils/beneficiosData.json";
import CardBeneficios from "../atoms/CardBeneficios";
import { Grid, Box } from '@mui/material';

const BeneficiosSeccion = () => {
    return (
        <Box >
            <Grid container spacing={2} display={'flex'}py={"1rem"}>
                {beneficiosData.map((card) => (
                    <Grid key={card.id} item xs={6} md={3}>
                        <CardBeneficios key={card.id} title={card.title} img={card.img} textInfo={card.textInfo}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default BeneficiosSeccion;
