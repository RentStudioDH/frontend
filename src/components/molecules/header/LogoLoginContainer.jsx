import { Box } from "@mui/material"
import BtnLoginRegister from "../../atoms/header/BtnLoginRegister"
import { Link } from "react-router-dom"
import { routes } from "../../../utils/routes"
import { useContextGlobal } from "../../../contexts/global.context"

const LogoLoginContainer = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  return (
    <Box className='d-flex cont-wrap g-15' sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', padding: '15px' }}>
      <div className='d-flex logo'>
        <Link to={routes.home}>
          <img src='/logo/logo.png' alt="logo" title="logo" width={150} height={30} />
        </Link>
        <Link className="slogan" to={routes.home}>Captura tus recuerdos</Link>
      </div>
      { isDesktop && <BtnLoginRegister/> }
    </Box>
  )
}

export default LogoLoginContainer