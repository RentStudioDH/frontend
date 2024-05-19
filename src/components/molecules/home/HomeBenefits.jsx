import beneficiosData from '../../../utils/json/beneficiosData.json'
import Cards from '../../atoms/Cards'

const HomeBenefits = ({ title }) => {
  return (
    <>
      { title && <h2 className='txt-accent bb-primary title'><strong>{title}</strong></h2> }
      <div className="flex cont-benefits g-10">
        {beneficiosData.map(card => {
          return (
            <Cards key={card.id} type="benefit" data={card} />
          )
        })}
      </div>
    </>
  )
}

export default HomeBenefits