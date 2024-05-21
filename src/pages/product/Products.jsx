import { useContextGlobal } from '../../contexts/global.context'
import ProductLists from '../../components/molecules/product/ProductLists'
import SectionProducto from '../../components/organisms/sections/SectionProducto'

const Products = () => {
  const { state } = useContextGlobal()
  const { data } = state
  // console.log(data)
  return (
    <main>
      <SectionProducto data={data} Component={ProductLists} containerClass='grid p-section g-15' />
    </main>
  )
}

export default Products