import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'
import productosRecomendadosData from '../../utils/json/productosRecomendadosData.json'
import ProductHeader from '../../components/organisms/product/ProductHeader'
import ProductDetails from '../../components/organisms/product/ProductDetails'
import ProductImages from '../../components/organisms/product/ProductImages'
import ProductIdeas from '../../components/organisms/product/ProductIdeas'

const Product = () => {
  const params = useParams()
  const { state, dispatch } = useContextGlobal()

  const { id } = params
  const [product, setProduct] = useState(null)
  useEffect(() => {
    const foundProduct = productosRecomendadosData.find(item => item.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      setProduct({
        title: "Producto no encontrado"
      })
    }
  }, [id])

  if (!product) {
    return <div>Cargando...</div>
  }

  return (
    <Grid container spacing={3} sx={{paddingX: {xs: "5%", md: "10%"}, marginBottom:"2rem", marginTop: "2px"}}>
      <Grid item xs={12} md={12}>
        <ProductHeader title={product.title}/>
      </Grid>
      <Grid item xs={12} md={12}>
        <ProductImages images={product.img}/>
      </Grid>
      <Grid item xs={12} md={9}>
        <ProductDetails details={product.textInfo}/>
      </Grid>
      <Grid item xs={12} md={3}>
        <ProductIdeas/>
      </Grid>
    </Grid>
  )
}

export default Product