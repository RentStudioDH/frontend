import { Link } from 'react-router-dom'
import Buttons from './Buttons'

const Card = ({ type, data }) => {
  // console.log(type);
  // console.log(data);
  const renderCard = () => {
    if (!type || !data) {
      return <div>No hay información para mostrar.</div>
    }

    switch (type) {
      case 'benefit':
        return (
          <div className={`d-grid card ${type} g-5`}>
            <i className={`fa-solid fa-${data.icon} txt-quaternary icon`}></i>
            <div className="info">
              <h3 className="text-center txt-tertiary"><strong>{data.title}</strong></h3>
              <p className="text-center txt-tertiary paragraph">{data.textInfo}</p>
            </div>
          </div>
        );
      case 'category':
        return (
          <Link className={`flex items-end card ${type} br-15`} key={data.id} to={data.path}>
            <img src={`${data.img}`} alt={`${data.title}`} />
            <div className='grid place-items-center w-full info p-15'>
              <h3 className="text-white text-center subtitle"><strong>{data.title}</strong></h3>
            </div>
          </Link>
        );
      case 'product':
        return (
          <Link className={`d-grid card ${type} br-15`} key={data.id} to={'/producto/' + data.id}>
            <div className='image'>
              <img src={`${data.img}`} alt="" />
            </div>
            <div className='flex flex-col lg:justify-center info p-15'>
              <h3 className="txt-primary"><strong>{data.title}</strong></h3>
              <p className="txt-tertiary paragraph">{data.textInfo}</p>
              <p className="txt-primary paragraph" id='price'><strong>{data.price}</strong></p>
              <Buttons text={'Cotizar'} bColor={'#A62639'} color={'#fff'} bgColor={'#A62639'}/>
            </div>
          </Link>
        );
      default:
        return <div>Tipo no soportado.</div>;
    }
  }

  return (
    <>
      { renderCard() }
    </>
  )
}

export default Card