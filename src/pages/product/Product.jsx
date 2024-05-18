import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'
import productosRecomendadosData from '../../utils/json/productosRecomendadosData.json'
import ProductHeader from '../../components/organisms/product/ProductHeader'
import ProductDetails from '../../components/organisms/product/ProductDetails'
import ProductGaleryImages from '../../components/organisms/product/ProductGaleryImages'
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
    <>
      <ProductHeader data={product}/>
      <ProductGaleryImages data={product}/>
      <ProductDetails data={product}/>
      <Grid item xs={12} md={3}>
        {/* <ProductIdeas/> */}
      </Grid>
    </>
  )
}

export default Product