import { useContextGlobal } from '../../../contexts/global.context'
import Cards from '../../atoms/Cards'

const HomeCategories = () => {
  const { state } = useContextGlobal()
  const { categories } = state
  console.log(categories);
  return (
    <>
      {categories.map(card => {
        return (
          <Cards key={card.id} type="category" data={card} />
        )
      })}
    </>
  )
}

export default HomeCategories