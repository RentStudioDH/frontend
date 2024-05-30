import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'
import ListProductsCategory from '../../components/organisms/lists/ListProductsCategory'

const Category = () => {
  const { category } = useParams()
  const { state, getCategories } = useContextGlobal()
  const { categories } = state
  // console.log(categories)

  useEffect(() => {
    getCategories()
  }, [])

  const getFormattedCategoryName = (category) => {
    const foundCategory = categories.find(cat => cat.slug.includes(category))
    return foundCategory ? foundCategory.name : category
  }
  // console.log(getFormattedCategoryName(category))

  return (
    <main>
      <section className='grid place-items-center'>
        <div className='grid w-full max-w-screen-xl g-15 p-section'>
          <h1 className='txt-accent bb-primary title capitalize'><strong>{getFormattedCategoryName(category)}</strong></h1>
          <ListProductsCategory category={getFormattedCategoryName(category)}/>
        </div>
      </section>
    </main>
  )
}

export default Category