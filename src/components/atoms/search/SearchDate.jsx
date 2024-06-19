import { useState } from 'react'
import { es } from 'date-fns/locale'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Buttons from '../Buttons'

const SearchDate = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)

  const formatDate = (date) => {
    if (!date) return 'Agregar fecha'
    return date.toISOString().split('T')[0] // Formato YYYY-MM-DD
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: formatDate(start), endDate: formatDate(end) })
    console.log("Fecha seleccionada:", { start: formatDate(start), end: formatDate(end) })
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
    console.log("Calendario toggled, estado:", !showCalendar)
  }

  const selectSingleDay = () => {
    const start = startDate || new Date()
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: formatDate(start), endDate: formatDate(end) })
    setShowCalendar(false)
    console.log("Día seleccionado:", { start: formatDate(start), end: formatDate(end) })
  }

  const selectWeek = () => {
    const start = startDate || new Date()
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 días para una semana
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: formatDate(start), endDate: formatDate(end) })
    setShowCalendar(false)
    console.log("Semana seleccionada:", { start: formatDate(start), end: formatDate(end) })
  }

  const selectMonth = () => {
    const start = startDate || new Date()
    const end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000)
    setStartDate(start)
    setEndDate(end)
    onDatesChange({ startDate: formatDate(start), endDate: formatDate(end) })
    setShowCalendar(false)
    console.log("Mes seleccionado:", { start: formatDate(start), end: formatDate(end) })
  }

  return (
    <div className="relative searchDate">
      <div className="flex flex-col md:flex-row justify-center g-15">
        <button type="button" className="flex items-center txt-tertiary btn g-5" onClick={toggleCalendar}>
          <i className="txt-primary fa-solid fa-calendar subtitle"></i>
          <span className="grid place-items-start">
            <strong>Entrega</strong> {startDate ? formatDate(startDate) : 'Ingresa fecha'}
          </span>
        </button>
        <button type="button" className="flex items-center txt-tertiary btn g-5" onClick={toggleCalendar}>
          <i className="txt-primary fa-solid fa-calendar subtitle"></i>
          <span className="grid place-items-start">
            <strong>Devolución</strong> { endDate ? formatDate(endDate) : 'Ingresa fecha' }
          </span>
        </button>
      </div>
      {showCalendar && (
        <div className="bg-white shadow-lg br-15 z-10 w-fit calendar">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            showDisabledMonthNavigation
            monthsShown={2}
            minDate={new Date()}  // Deshabilitar días pasados
            placeholderText="Selecciona un rango de fechas"
            inline  // Mostrar calendario embebido
            locale={es}
            calendarContainer={({ children }) => (
              <div className="grid rounded-lg">
                <div className='flex md:justify-center overflow-x-auto md:overflow-clip g-5'>
                  {children}
                </div>
                <div className="flex justify-center p-15 g-5">
                  <Buttons text={'x día'} bColor='#A62639' color='#fff' bgColor='#A62639' onClick={selectSingleDay} />
                  <Buttons text={'x semana'} bColor='#A62639' color='#fff' bgColor='#A62639' onClick={selectWeek} />
                  <Buttons text={'x mes'} bColor='#A62639' color='#fff' bgColor='#A62639' onClick={selectMonth} />
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default SearchDate