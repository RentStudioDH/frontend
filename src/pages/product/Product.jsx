import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useContextGlobal } from "../../contexts/global.context.jsx"
import LoadingOverlay from "../../components/atoms/LoadingOverlay.jsx"
import ErrorDialog from "../../components/atoms/ErrorDialog"
import SectionProducto from "../../components/organisms/sections/SectionProducto"
import ProductHeader from "../../components/molecules/product/ProductHeader"
import ProductDetails from "../../components/molecules/product/ProductDetails"
import ProductAvailability from "../../components/molecules/product/ProductAvailability.jsx"
import ProductGallery from "../../components/molecules/product/ProductGallery"
import ProductPolicies from "../../components/molecules/product/ProductPolicies"

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProductById, getCategories } = useContextGlobal()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id)
        if (!productData.attachments || productData.attachments.length === 0) {
          throw new Error("El producto no tiene imágenes disponibles aún.")
        }
        setProduct(productData)
        transformAndSetImages(productData.attachments)
      } catch (error) {
        setError(new Error("No se pudo obtener el producto."))
        setOpenDialog(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
    getCategories()
  }, [id, getProductById])

  const transformAndSetImages = (attachments) => {
    const transformedImages = attachments.map((attachment, index) => ({
      ...attachment,
      id: index,
    }))
    setImages(transformedImages)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <LoadingOverlay open={loading} />
      </div>
    )
  }

  return (
    <main>
      {product && (
        <>
          <SectionProducto
            data={product}
            Component={ProductHeader}
            sectionClass="bg-back productHeader"
            containerClass="flex flex-row justify-between items-start sm:items-center p-15 g-15"
          />
          <SectionProducto
            data={product}
            Component={ProductDetails}
            sectionClass="productDetails"
            containerClass="grid grid-cols-1 sm:grid-cols-2 p-section g-15"
          />
          <SectionProducto
            data={product}
            Component={ProductAvailability}
            sectionClass="productAvailability"
            containerClass="p-section"
          />
          <SectionProducto
            data={{ ...product, attachments: images }}
            Component={ProductGallery}
            sectionClass="bg-white productGallery"
            containerClass="grid p-section g-5"
          />
          {/* <SectionProducto
            data={product}
            Component={ProductIdeas}
            containerClass="p-section"
          /> */}
          <SectionProducto
            data={product}
            Component={ProductPolicies}
            containerClass="p-section"
          />
        </>
      )}
      <ErrorDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        message={error ? error.message : "No se pudo obtener el producto"}
      />
    </main>
  )
}

export default Product
