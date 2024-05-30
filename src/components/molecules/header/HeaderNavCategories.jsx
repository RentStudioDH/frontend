import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContextGlobal } from '../../../contexts/global.context'

const HeaderNavCategories = () => {
  const { state, getCategories } = useContextGlobal()
  const { categories } = state
  useEffect(() => {
    getCategories()
  }, [])
  const location = useLocation()
  // console.log(location.pathname)
  // console.log(categories)
  return (
    <div className='bg-quaternary w-full flex justify-center'>
      <nav className='w-full max-w-screen-xl flex justify-center navCategorias g-15'>
        {categories.map((category) => (
          <Link key={category.id} to={category.slug} className={`txt-tertiary paragraph p-15 ${location.pathname === category.slug ? 'active' : ''}`}>{category.name}</Link>
        ))}
      </nav>
    </div>
  )
}

export default HeaderNavCategories