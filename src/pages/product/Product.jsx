import React from 'react'
import { Grid } from '@mui/material'
import ProductHeader from '../../components/organisms/product/ProductHeader'
import ProductDetails from '../../components/organisms/product/ProductDetails'
import PrductIdeas from '../../components/organisms/product/ProductIdeas'
import ProductImages from '../../components/organisms/product/ProductImages'

const Product = () => {

    const productDefault = {
        title: "Cámara Canon C200, Cine Digital, 3 zoom Canon",
        detail: "Lorem ipsum dolor sit amet consectetur adipiscing elit imperdiet ac phasellus, sodales venenatis quis pharetra torquent posuere tellus iaculis velit tempor nam, metus feugiat purus ornare gravida eleifend ut nec duis. Nisi auctor nascetur neque nulla urna egestas pharetra, integer fusce parturient fringilla commodo sociis phasellus, torquent ac cubilia ligula non platea. Faucibus euismod sociis montes tortor volutpat mus vulputate, aptent semper nullam cubilia tempus gravida, nostra sodales facilisi pulvinar donec facilisis."
    }


  return (
    <Grid container spacing={3} sx={{paddingX: {xs: "5%", md: "10%"}, marginBottom:"2rem", marginTop: "2px"}}>
        <Grid item xs= {12} md= {12}>
            <ProductHeader title={productDefault.title}/>
        </Grid>
        <Grid item xs= {12} md= {12}>
            <ProductImages/>
        </Grid>
        <Grid item xs= {12} md= {9}>
            <ProductDetails details={productDefault.detail}/>
        </Grid>
        <Grid item xs= {12} md= {3}>
            <PrductIdeas/>
        </Grid>
    </Grid>
  )
}

export default Product