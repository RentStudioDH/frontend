import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, parseISO, isWithinInterval, eachDayOfInterval, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { useContextGlobal } from '../../../contexts/global.context'
import Swal from 'sweetalert2'
import Modals from '../../atoms/Modals'
import { fetchData } from '../../../utils/js/apiRequest'

const ProductAvailability = ({ data }) => {
  const { price, rentType, stock, id } = data
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('loginUser')
  const [occupiedDates, setOccupiedDates] = useState([])
  const [currentStock, setCurrentStock] = useState(stock)

  const navigate = useNavigate()
  const { state, setReservaData } = useContextGlobal()

  const fetchOccupiedDates = async () => {
    try {
      const response = await fetchData({
        method: 'get',
        endpoint: `/public/products/${id}/availability`,
        requireAuth: false,
      })
      console.log(response)  // Verifica la estructura de la respuesta

      const dates = response.occupiedDates.map(range => ({
        startDate: parseISO(range.startDate),
        endDate: parseISO(range.endDate),
      }))
      setOccupiedDates(dates)
    } catch (error) {
      console.error('Error fetching occupied dates:', error)
    }
  }

  useEffect(() => {
    fetchOccupiedDates()
  }, [id])

  useEffect(() => {
    const calculateStock = () => {
      const availableStock = stock - occupiedDates.length
      setCurrentStock(availableStock)
    }

    calculateStock()
  }, [occupiedDates, stock])

  const isOccupied = (date) => {
    return occupiedDates.some((range) => {
      return isWithinInterval(date, { start: range.startDate, end: range.endDate })
    })
  }

  const handleChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

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

  const filterDate = (date) => {
    if (isOccupied(date) || date < new Date()) return false
    if (rentType === 'DAILY') return true
    if (rentType === 'WEEKLY' && startDate && differenceInDays(date, startDate) + 1 > 5) return false
    if (rentType === 'MONTHLY' && startDate && differenceInDays(date, startDate) + 1 > 30) return false
    return true
  }

  const rangeDates = occupiedDates.flatMap(range => {
    const start = range.startDate
    const end = range.endDate
    return eachDayOfInterval({ start, end })
  })

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-range": rangeDates,
    },
  ]

  const rentarHandle = () => {
    if (state.isLoggedIn) {
      if (startDate && endDate) {
        setReservaData({ startDate, endDate, id: data.id })
        navigate('/reservation/' + data.id)
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Fechas incompletas',
          text: 'Debe agregar una fecha disponible para continuar con la reserva.',
          confirmButtonText: 'Entendido',
          confirmButtonColor: "#A62639"
        })
      }
    } else {
      setIsModalVisible(true)
    }
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="bg-white shadow-lg grid br-15 p-15 g-15">
      <h2 className="txt-accent bb-primary subtitle"><strong>Disponibilidad del producto:</strong></h2>
      <div className="w-fit flex flex-col md:flex-row g-15">
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
            {currentStock <= 0 && (
              <p style={{ backgroundColor: '#56494E', color: "white" }} className="font-bold text-xl py-2 px-4">No hay unidades disponibles</p>
            )}
            {currentStock > 0 && (
              <button style={{ backgroundColor: '#A62639', color: "white" }} className="text-white py-2 px-4 rounded-md" onClick={rentarHandle}>Ir a Rentar</button>
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
      {isModalVisible && (
        <Modals type={modalType} visible={isModalVisible} onClose={closeModal} />
      )}
    </div>
  )
}

export default ProductAvailability