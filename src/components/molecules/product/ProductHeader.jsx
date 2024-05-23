import { Link, useNavigate } from 'react-router-dom'
import Buttons from '../../atoms/Buttons'

const ProductHeader = ({ data }) => {
  // console.log(data)
  const navigate = useNavigate()
  
  return (
    <>
      <div className='flex items-center g-5'>
        <Link onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left txt-primary title"></i></Link>
        <h1 className='txt-primary title bb-primary'><strong>{data.name}</strong></h1>
      </div>
      <Buttons text={'Rentar'} bColor={'#A62639'} color={'#fff'} bgColor={'#A62639'}/>
    </>
  )
}

export default ProductHeader