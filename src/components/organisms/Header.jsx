import NavCategoriasContainer from "../molecules/header/NavCategoriasContainer"
import LogoUserContainer from "../molecules/header/LogoUserContainer"
import { useContextGlobal } from "../../contexts/global.context"
import MenuMobileContainer from "../molecules/header/MenuMobileContainer"

const Header = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  return (
    <header className="grid place-items-center bg-base">
      <LogoUserContainer/>
      { isDesktop ? <NavCategoriasContainer/> : <MenuMobileContainer/> }
    </header>
  )
}

export default Header