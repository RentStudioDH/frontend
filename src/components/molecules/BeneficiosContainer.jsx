import beneficiosData from '../../utils/beneficiosData.json'
import Card from '../atoms/Card'

const BeneficiosContainer = () => {
  return (
    <div className="d-flex cont-benefits g-15">
      {beneficiosData.map(card => {
        return (
          <Card key={card.id} type="benefit" data={card} />
        );
      })}
    </div>
  );
}

export default BeneficiosContainer