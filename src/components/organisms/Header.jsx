import Navbar from "../molecules/header/Navbar"
import LogoLoginContainer from "../molecules/header/LogoLoginContainer"


const Header = () => {
  return (
    <header className="d-grid pi-center">
      <LogoLoginContainer/>
      <Navbar/>
    </header>
  )
}

export default Header