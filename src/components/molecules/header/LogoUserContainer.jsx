import { Link } from "react-router-dom"
import { routes } from "../../../utils/routes"
import { useContextGlobal } from "../../../contexts/global.context"
import BtnLoginRegister from "../../atoms/header/BtnLoginRegister"

const LogoUserContainer = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  return (
    <div className='w-full max-w-screen-xl flex flex-col sm:flex-row justify-between items-center g-15 p-15'>
      <div className='flex flex-col md:flex-row justify-center items-center logo g-5'>
        <Link to={routes.home}>
          <img src='/logo/logo.png' alt="logo" title="logo" width={150} height={30} loading='lazy' />
        </Link>
        <Link className='txt-accent slogan' to={routes.home}>Captura tus recuerdos</Link>
      </div>
      { isDesktop && <BtnLoginRegister/> }
    </div>
  )
}

export default LogoUserContainer