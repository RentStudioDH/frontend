import { useParams } from "react-router-dom"
import { useContextGlobal } from "../../contexts/global.context"
import SectionAdmin from "../../components/organisms/sections/SectionAdmin"
import Cards from "../../components/atoms/Cards"
import UserMenu from "../../components/molecules/user/UserMenu"
import UserPerfil from "../../components/molecules/user/UserPerfil"
import DireccionesUsuario from "../../components/atoms/user/DireccionesUsuario"

const User = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  const { user } = useParams()

  const renderSectionAdmin = () => {
    switch (user) {
      case 'MiPerfil':
        return <SectionAdmin title="Mi Perfil" type="MiPerfil" ContainerComponent={UserPerfil} />
      case 'Direcciones':
        return <SectionAdmin title="Direcciones" type="Direcciones" ContainerComponent={DireccionesUsuario} />
      case 'Reservas':
        return <SectionAdmin title="Reservas" type="Reservas" ContainerComponent={""} />
      case 'Favoritos':
        return <SectionAdmin title="Favoritos" type="Favoritos" ContainerComponent={""} />
      case 'Tarjetas':
        return <SectionAdmin title="Tarjetas" type="Tarjetas" ContainerComponent={""} />
      default:
        return <h1>NO hay nada que mostrar</h1>
    }
  }
  return (
    <main className="flex">
      {isDesktop ? (
        <>
          <UserMenu />
          { renderSectionAdmin() }
        </>
      ) : (
        <Cards type="error-admin" data='' />
      )}
    </main>
  )
}

export default User