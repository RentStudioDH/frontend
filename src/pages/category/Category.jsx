import { useParams } from 'react-router-dom'
import ListProductsCategory from '../../components/organisms/lists/ListProductsCategory'
import { useEffect, useState } from 'react'
import { fetchData } from '../../utils/js/apiRequest'

const Category = () => {
  const { category } = useParams()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // console.log(category)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchData({ method: 'get', endpoint: '/categories' })
        setCategories(categoriesData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getCategories()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching categories: {error.message}</div>

  console.log(categories)

  const getFormattedCategoryName = (category) => {
    const foundCategory = categories.find(cat => cat.slug.includes(category))
    return foundCategory ? foundCategory.name : category
  }

  console.log(getFormattedCategoryName(category));

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