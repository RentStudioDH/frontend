import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'
import { fetchData } from '../../utils/js/apiRequest'
import productosRecomendadosData from '../../utils/json/productosRecomendadosData.json'
import SectionProducto from '../../components/organisms/sections/SectionProducto'
import ProductHeader from '../../components/molecules/product/ProductHeader'
import ProductDetails from '../../components/molecules/product/ProductDetails'
import ProductGalery from '../../components/molecules/product/ProductGalery'
import ProductIdeas from '../../components/molecules/product/ProductIdeas'

const Product = () => {
  const { id } = useParams()
  // const { state, dispatch } = useContextGlobal()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchData({ method: 'GET', endpoint: `/products/${id}` })
        setProduct(productData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    };
    getProduct()
  }, [id])
  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error fetching product: {error.message}</div>
  // console.log(product);
  return (
    <main>
      <SectionProducto data={product} Component={ProductHeader} sectionClass='bg-back productHeader' containerClass='flex flex-col sm:flex-row justify-between items-start sm:items-center p-15 g-15' />
      <SectionProducto data={product} Component={ProductDetails} sectionClass='productDetails' containerClass='grid grid-cols-1 sm:grid-cols-2 p-section g-15' />
      {/* <SectionProducto data={product} Component={ProductGalery} sectionClass='bg-white productGalery' containerClass='grid p-section g-5' /> */}
      <SectionProducto data={product} Component={ProductIdeas} containerClass='p-section' />
    </main>
  )
}

export default Product