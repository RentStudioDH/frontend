import { useLocation } from 'react-router-dom'
import { useContextGlobal } from '../../contexts/global.context'
import HeaderNavUser from '../molecules/header/HeaderNavUser'
import HeaderNavCategories from '../molecules/header/HeaderNavCategories'

const Header = () => {
  const { state } = useContextGlobal()
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')
  // console.log(isAdminPage)
  return (
    <header className="grid place-items-center bg-base">
      <HeaderNavUser />
      { !isAdminPage && state.isDesktop && <HeaderNavCategories /> }
    </header>
  )
}

export default Header