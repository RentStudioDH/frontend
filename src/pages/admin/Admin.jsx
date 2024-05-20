import { useContextGlobal } from "../../contexts/global.context"
import SectionAdmin from "../../components/organisms/sections/SectionAdmin"
import Cards from "../../components/atoms/Cards"

const Admin = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  return (
    <main className="flex">
      {isDesktop ? (
        <SectionAdmin/>
      ) : (
        <Cards type="error-admin" data='' />
      )}
    </main>
  )
}

export default Admin