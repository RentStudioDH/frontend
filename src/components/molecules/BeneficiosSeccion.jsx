import React from 'react';
import beneficiosData from "../../utils/beneficiosData.json";
import CardBeneficios from "../atoms/CardBeneficios";
import { Grid, Box } from '@mui/material';

const BeneficiosSeccion = () => {
    return (
        <Box display="flex" alignItems={"center"}>
            <Grid container spacing={2}>
                {beneficiosData.map((card) => (
                    <Grid key={card.id} item xs={12} md={3}  justifyContent={'space-evenly'} alignItems={'center'}>
                        <CardBeneficios key={card.id} title={card.title} img={card.img} textInfo={card.textInfo}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default BeneficiosSeccion;
