import ListUsers from "../../atoms/admin/permisos/ListUsers"

const AdminPermissions = ({ title }) => {

  return (
    <>
      <h1 className="txt-accent bigtitle"><strong>{title}</strong></h1>
      <ListUsers />
    </>
  )
}

export default AdminPermissions