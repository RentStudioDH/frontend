import { useParams } from "react-router-dom"
import { useContextGlobal } from "../../contexts/global.context"
import SectionAdmin from "../../components/organisms/sections/SectionAdmin"
import UserPerfil from "../../components/molecules/user/UserPerfil"
import DireccionesUsuario from "../../components/atoms/user/DireccionesUsuario"
import UserReservas from "../../components/molecules/user/UserReservas"
import UserFavoritos from "../../components/molecules/user/UserFavoritos"
import Cards from "../../components/atoms/Cards"
import SidebarMenu from "../../components/organisms/SidebarMenu"

const User = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  const { user } = useParams()

  const renderSectionAdmin = () => {
    switch (user) {
      case 'perfil':
        return <SectionAdmin title="Mi Perfil" type="perfil" ContainerComponent={UserPerfil} />
      case 'direcciones':
        return <SectionAdmin title="Direcciones" type="direcciones" ContainerComponent={DireccionesUsuario} />
      case 'reservas':
        return <SectionAdmin title="Reservas" type="reservas" ContainerComponent={UserReservas} />
      case 'favoritos':
        return <SectionAdmin title="Favoritos" type="favoritos" ContainerComponent={UserFavoritos} />
      default:
        return <h1>NO hay nada que mostrar</h1>
    }
  }
  return (
    <main className="flex">
      {isDesktop ? (
        <>
          <SidebarMenu />
          { renderSectionAdmin() }
        </>
      ) : (
        <Cards type="error-admin" data='' />
      )}
    </main>
  )
}

export default User