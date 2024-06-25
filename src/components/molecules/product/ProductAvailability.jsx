import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, addDays, parseISO, isWithinInterval, eachDayOfInterval, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNavigate, useParams } from 'react-router-dom'
import { useContextGlobal } from '../../../contexts/global.context'

// Simular datos recibidos desde una API
const occupiedDates = [
  { start: parseISO('2024-06-15'), end: parseISO('2024-06-16') },
  { start: parseISO('2024-06-20'), end: parseISO('2024-06-22') },
  { start: parseISO('2024-06-25'), end: parseISO('2024-06-26') },
  { start: parseISO('2024-07-01'), end: parseISO('2024-07-02') },
  { start: parseISO('2024-07-05'), end: parseISO('2024-07-06') },
  { start: parseISO('2024-07-10'), end: parseISO('2024-07-12') },
  { start: parseISO('2024-07-15'), end: parseISO('2024-07-16') },
  { start: parseISO('2024-07-20'), end: parseISO('2024-07-22') },
  { start: parseISO('2024-07-25'), end: parseISO('2024-07-26') },
  { start: parseISO('2024-08-01'), end: parseISO('2024-08-02') },
]

const ProductAvailability = ({ data }) => {
  const { price, rentType, stock } = data
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const navigate = useNavigate()
  const {state, getProductById, setReservaData} = useContextGlobal()



  const initialStock = stock - occupiedDates.length
  const [currentStock, setCurrentStock] = useState(initialStock)

  const isOccupied = (date) => {
    return occupiedDates.some((range) => {
      return isWithinInterval(date, { start: range.start, end: range.end })
    })
  }

  const handleChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  // Cálculo del costo total y la cantidad de días seleccionados
  const calculateTotalRent = () => {
    if (!startDate || !endDate) return { total: 0, daysSelected: 0 }
    const daysSelected = differenceInDays(endDate, startDate) + 1

    let total = 0
    switch (rentType) {
      case 'DAILY':
        total = daysSelected * price
        break
      case 'WEEKLY':
        total = Math.ceil(daysSelected / 7) * (price * 5)
        break
      case 'MONTHLY':
        total = Math.ceil(daysSelected / 30) * (price * 30)
        break
      default:
        break
    }

    return { total, daysSelected }
  }

  const { total, daysSelected } = calculateTotalRent()

  // Filtrar fechas según el tipo de renta
  const filterDate = (date) => {
    if (isOccupied(date) || date < new Date()) return false
    if (rentType === 'DAILY') return true
    if (rentType === 'WEEKLY' && startDate && differenceInDays(date, startDate) + 1 > 5) return false
    if (rentType === 'MONTHLY' && startDate && differenceInDays(date, startDate) + 1 > 30) return false
    return true
  }

  useEffect(() => {
    if (startDate && endDate) {
      setCurrentStock((prevStock) => (prevStock > 0 ? prevStock - 1 : 0))
    }
  }, [startDate, endDate])

  // Separar fechas individuales y expandir rangos
  const rangeDates = occupiedDates.flatMap(range => eachDayOfInterval({ start: range.start, end: range.end }))

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-range": rangeDates,
    },
  ]

  const rentarHandle = ()=>{
    setReservaData({ startDate: startDate, endDate: endDate, dataId: data.id });

    navigate('/reservation/' + data.id);
  }

  return (
    <div className="bg-white shadow-lg grid br-15 p-15 g-15">
      <h2 className="txt-accent bb-primary subtitle"><strong>Disponibilidad del producto:</strong></h2>
      <div className="flex flex-col md:flex-row gap-4">
        <ReactDatePicker
          selected={startDate}
          onChange={handleChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={es}
          monthsShown={2}
          className="w-full"
          filterDate={filterDate}
          highlightDates={highlightWithRanges}
        />
        <div className="flex flex-col g-15">
          <div className='grid g-10 fechas'>
            <div>
              <h3 className="txt-tertiary subtitle"><strong>Fecha seleccionada:</strong></h3>
              <p className='txt-tertiary paragraph'>{startDate && endDate ? `${format(startDate, 'dd MMM yyyy', { locale: es })} - ${format(endDate, 'dd MMM yyyy', { locale: es })}` : 'No seleccionada'}</p>
            </div>
            <p className="txt-quaternary paragraph">Días seleccionados: {daysSelected}</p>
            <p className="txt-tertiary paragraph">Costo total <span className='legal'>(DíasxPrecio)</span>: <strong className='txt-primary'>${total}</strong></p>
            <p className="txt-quaternary paragraph">Stock disponible: {currentStock}</p>
            {currentStock === 0 && (
              <p className="text-red-600 font-bold text-xl">No hay unidades disponibles</p>
            )}
            {currentStock > 0 && (
              <button className="bg-red-600 text-white py-2 px-4 rounded-md" onClick={()=> rentarHandle()}>Ir a Rentar</button>
            )}
          </div>
          <div className='grid info g-5'>
            <div className='flex items-center dato-disponible g-5'>
              <p className='txt-tertiary legal'>Fechas disponibles</p>
            </div>
            <div className='flex items-center dato-ocupado g-5'>
              <p className='txt-tertiary legal'>Fechas ocupadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAvailability