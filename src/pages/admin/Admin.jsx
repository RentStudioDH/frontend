import { useContextGlobal } from "../../contexts/global.context"
import SectionAdminMobile from "../../components/organisms/sections/SectionAdminMobile"
import SectionAdmin from "../../components/organisms/sections/SectionAdmin"

const Admin = () => {
  const { state } = useContextGlobal()
  const { isDesktop } = state
  return (
    <main className="flex">
      {isDesktop ? (
        <SectionAdmin/>
      ) : (
        <SectionAdminMobile />
      )}
    </main>
  )
}

export default Admin