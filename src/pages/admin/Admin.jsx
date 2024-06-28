import { useParams } from "react-router-dom"
import { useContextGlobal } from "../../contexts/global.context"
import SectionAdmin from "../../components/organisms/sections/SectionAdmin"
import AdminDashboard from "../../components/molecules/admin/AdminDashboard"
import AdminProducts from "../../components/molecules/admin/AdminProducts"
import AdminCategories from "../../components/molecules/admin/AdminCategories"
import AdminPermissions from "../../components/molecules/admin/AdminPermissions"
import SidebarMenu from "../../components/organisms/SidebarMenu"
import Cards from "../../components/atoms/Cards"

const Admin = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  const { admin } = useParams()
  // console.log(admin)

  const renderSectionAdmin = () => {
    switch (admin) {
      case 'dashboard':
        return <SectionAdmin title="Dashboard" type="dashboard" ContainerComponent={AdminDashboard} />
      case 'productos':
        return <SectionAdmin title="Productos" type="product" ContainerComponent={AdminProducts} />
      case 'categorias':
        return <SectionAdmin title="Categorías" type="category" ContainerComponent={AdminCategories} />
      case 'permisos':
        return <SectionAdmin title="Permisos" type="permissions" ContainerComponent={AdminPermissions} />
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

export default Admin