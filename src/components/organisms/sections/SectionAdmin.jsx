import { useParams } from 'react-router-dom'
import AdminMenu from '../../molecules/admin/AdminMenu'

const SectionAdmin = () => {
  const { admin } = useParams()
  console.log(admin)
  return (
    <>
      <AdminMenu />
      <section className='w-full p-section'>

      </section>
    </>
  )
}

export default SectionAdmin