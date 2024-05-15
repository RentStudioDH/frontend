import Navbar from "../molecules/header/Navbar"
import LogoLoginContainer from "../molecules/header/LogoLoginContainer"
import { useContextGlobal } from "../../contexts/global.context"
import MenuMobile from "./header/MenuMobile"

const Header = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  return (
    <header className="d-grid pi-center">
      <LogoLoginContainer/>
      { isDesktop ? <Navbar/> : <MenuMobile/> }
    </header>
  )
}

export default Header