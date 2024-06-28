import { useEffect, useState } from 'react'
import { useContextGlobal } from '../../../contexts/global.context'
import Cards from '../../atoms/Cards'

const HomeRecommended = ({ title }) => {
  const { state } = useContextGlobal()
  const { data } = state
  // console.log(data)
  const [shuffledData, setShuffledData] = useState([])
  useEffect(() => {
    const shuffleArray = (array) => { return array.sort(() => Math.random() - 0.5) }
    if (data && data.length > 0) {
      setShuffledData(shuffleArray([...data]))
    }
  }, [data])
  return (
    <>
      { title && <h2 className='txt-accent bb-primary title'><strong>{title}</strong></h2> }
      <div className="grid cont-products g-10">
        {shuffledData.slice(0, 6).map(product => (
          <Cards key={product.id} type="product" data={product}  />
        ))}
      </div>
    </>
  )
}

export default HomeRecommended