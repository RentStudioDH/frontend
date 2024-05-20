import { Link } from 'react-router-dom'
import Buttons from './Buttons'

const Cards = ({ type, data }) => {
  // console.log(type)
  // console.log(data)
  const renderCard = () => {
    if (!type) {
      return <div>No hay información para mostrar.</div>;
    }

    if ((type === 'benefit' || type === 'category' || type === 'product') && !data) {
      return <div>No hay información para mostrar.</div>;
    }

    switch (type) {
      case 'benefit':
        return (
          <div className={`grid card ${type} g-5`}>
            <i className={`fa-solid fa-${data.icon} txt-quaternary icon`}></i>
            <div className="info">
              <h3 className="text-center txt-tertiary subtitle"><strong>{data.title}</strong></h3>
              <p className="text-center txt-tertiary paragraph">{data.textInfo}</p>
            </div>
          </div>
        )
      case 'category':
        return (
          <Link className={`flex items-end shadow-lg card ${type} br-15`} key={data.id} to={data.path}>
            <img src={`${data.img}`} alt={`${data.title}`} loading='lazy' />
            <div className='grid place-items-center w-full info p-15'>
              <h3 className="text-white text-center subtitle"><strong>{data.label}</strong></h3>
            </div>
          </Link>
        )
      case 'product':
        return (
          <Link className={`grid shadow-lg card ${type} br-15`} key={data.id} to={'/producto/' + data.id}>
            <div className='image'>
              <img src={`${data.images[0]}`} alt={data.title} loading='lazy' width={210} height={210} />
            </div>
            <div className='flex flex-col justify-between info p-15 g-10'>
              <div className='flex flex-col details g-5'>
                <h3 className="txt-primary subtitle"><strong>{data.title}</strong></h3>
                <p className="txt-tertiary paragraph">{data.description}</p>
              </div>
              <div className='flex flex-col rent g-10'>
                <p className="txt-primary paragraph" id='price'><strong>{data.price} / {data.rentType}</strong></p>
                <Buttons text='Cotizar' bColor='#A62639' color='#fff' bgColor='#A62639' />
              </div>
            </div>
          </Link>
        )
      case 'error-admin':
        return (
          <section className='w-full grid place-items-center p-8'>
            <div className='bg-white grid place-items-center shadow-lg w-fit br-15 p-6 g-15'>
              <img src="/errores/screen-error-mobile.png" alt='Error admin mobile' title='Error admin mobile' width={260} height={209} loading='lazy' />
              <div className="info">
                <h1 className='txt-tertiary text-center title'><strong>Mobile no disponible</strong></h1>
                <p className='txt-quaternary text-center paragraph'>La versión móvil está en desarrollo. ¡Gracias por tu paciencia!</p>
              </div>
            </div>
          </section>
        )
      default:
        return <div>Tipo no soportado.</div>
    }
  }

  return (
    <>
      { renderCard() }
    </>
  )
}

export default Cards