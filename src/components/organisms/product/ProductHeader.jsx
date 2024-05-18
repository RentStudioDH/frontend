import { Link, useNavigate } from 'react-router-dom'
import Buttons from '../../atoms/Buttons'

const ProductHeader = ({ data }) => {
  // console.log(data);
  const navigate = useNavigate()
  
  return (
    <section className='bg-back grid place-items-center productHeader'>
      <div className='w-full max-w-screen-xl flex flex-col sm:flex-row justify-between items-start sm:items-center g-15 p-15'>
        <div className='flex items-center g-5'>
          <Link onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left txt-primary title"></i></Link>
          <h1 className='txt-primary title bb-primary'><strong>{data.title}</strong></h1>
        </div>
        <Buttons text={'Crear cuenta'} bColor={'#A62639'} color={'#fff'} bgColor={'#A62639'}/>
      </div>
    </section>
  )
}

export default ProductHeader