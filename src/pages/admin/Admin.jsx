import { useParams } from "react-router-dom";

const Admin = () => {
  const { admin } = useParams()
  // console.log(admin);
  return (
    <>
      <div>Admin</div>
    </>
  )
}

export default Admin