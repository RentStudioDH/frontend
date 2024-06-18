import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'
import SectionHome from '../../components/organisms/sections/SectionHome'
import SectionProducto from '../../components/organisms/sections/SectionProducto'
import ProductLists from '../../components/molecules/product/ProductLists'
import HomeSearch2 from '../../components/molecules/home/HomeSearch2'

const Products = () => {
  const { state } = useContextGlobal()
  const location = useLocation()
  const [displayData, setDisplayData] = useState([])

  useEffect(() => {
    if (location.state && location.state.useSuggestions && state.suggestions.length > 0) {
      console.log(location.state);
      setDisplayData(state.suggestions)
    } else {
      setDisplayData(state.data)
    }
  }, [location.state, state.data, state.suggestions])

  return (
    <main>
      <SectionProducto Component={HomeSearch2} containerClass='grid place-items-center' />
      <SectionProducto data={displayData} Component={ProductLists} containerClass='grid p-section g-15' />
    </main>
  )
}

export default Products
