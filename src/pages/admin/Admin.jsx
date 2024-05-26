import { useContextGlobal } from "../../contexts/global.context"
import SectionAdmin from "../../components/organisms/sections/SectionAdmin"
import Cards from "../../components/atoms/Cards"
import AdminMenu from "../../components/molecules/admin/AdminMenu"
import { useParams } from "react-router-dom"
import AdminProducts from "../../components/molecules/admin/AdminProducts"

const Admin = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  const { admin } = useParams()
  // console.log(admin)

  const renderSectionAdmin = () => {
    switch (admin) {
      case 'dashboard':
        return <SectionAdmin title="Dashboard" type="dashboard" ContainerComponent={AdminProducts} />
      case 'productos':
        return <SectionAdmin title="Productos" type="product" ContainerComponent={AdminProducts} />
      case 'categorias':
        return <SectionAdmin title="Categorías" type="category" ContainerComponent={AdminProducts} />
      default:
        return <h1>NO hay nada que mostrar</h1>
    }
  }
  return (
    <main className="flex">
      {isDesktop ? (
        <>
          <AdminMenu />
          { renderSectionAdmin() }
        </>
      ) : (
        <Cards type="error-admin" data='' />
      )}
    </main>
  )
}

export default Admin