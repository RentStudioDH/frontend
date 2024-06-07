import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useContextGlobal } from '../../../contexts/global.context'
import Buttons from '../Buttons'
import LoadingOverlay from '../LoadingOverlay.jsx'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirmar contraseña es obligatorio'),
})

const RegistrarForm = ({ closeModal }) => {
  const [usuario, setUsuario] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { registerUser } = useContextGlobal()

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUsuario({ ...usuario, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await validationSchema.validate(usuario, { abortEarly: false })
      const { firstName, lastName, email, password } = usuario
      const response = await registerUser({ firstName, lastName, email, password })

      setSuccessMessage('Registro exitoso. Por favor, inicie sesión.')
      setUsuario({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {}
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message
        })
        setErrors(newErrors)
      } else {
        setErrors({ general: error.response?.data?.message || 'Error al registrar. Por favor, intente de nuevo.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LoadingOverlay open={loading} />
      <div className="bg-gray-100 grid place-items-center p-section">
        <p className="txt-accent txt-center subtitle"><strong>Registrar</strong></p>
        <form className="grid g-15" onSubmit={handleSubmit}>
          <div className="grid g-5">
            <label htmlFor="firstName" className="txt-tertiary paragraph">Nombre</label>
            <input className={`bg-back block w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} txt-tertiary paragraph rounded-lg focus:ring-red-500 focus:border-red-500 p-2`} placeholder="Ingresa tu nombre" type="text" name="firstName" id="firstName" value={usuario.firstName} onChange={handleChange} />
            {errors.firstName && <p className="text-red-500 legal">{errors.firstName}</p>}
          </div>
          <div className="grid g-5">
            <label htmlFor="lastName" className="txt-tertiary paragraph">Apellido</label>
            <input className={`bg-back block w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} txt-tertiary paragraph rounded-lg focus:ring-red-500 focus:border-red-500 p-2`} placeholder="Ingresa tu apellido" type="text" name="lastName" id="lastName" value={usuario.lastName} onChange={handleChange} />
            {errors.lastName && <p className="text-red-500 legal">{errors.lastName}</p>}
          </div>
          <div className="grid g-5">
            <label htmlFor="email" className="txt-tertiary paragraph">E-mail</label>
            <input className={`bg-back block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} txt-tertiary paragraph rounded-lg focus:ring-red-500 focus:border-red-500 p-2`} placeholder="Ingresa tu correo electrónico" type="email" name="email" id="email" value={usuario.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 legal">{errors.email}</p>}
          </div>
          <div className="grid g-5">
            <label htmlFor="password" className="txt-tertiary paragraph">Contraseña</label>
            <input className={`bg-back block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} txt-tertiary paragraph rounded-lg focus:ring-red-500 focus:border-red-500 p-2`} placeholder="Ingresa tu contraseña" type="password" name="password" id="password" value={usuario.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 legal">{errors.password}</p>}
          </div>
          <div className="grid g-5">
            <label htmlFor="confirmPassword" className="txt-tertiary paragraph">Confirmar Contraseña</label>
            <input className={`bg-back block w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} txt-tertiary paragraph rounded-lg focus:ring-red-500 focus:border-red-500 p-2`} placeholder="Confirma tu contraseña" type="password" name="confirmPassword" id="confirmPassword" value={usuario.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="text-red-500 legal">{errors.confirmPassword}</p>}
          </div>
          <Link to="/terms-and-conditions" className="txt-primary underline decoration-solid legal">
            Al registrarte, aceptas nuestros términos y condiciones, y nuestra política de privacidad.
          </Link>
          <div className="flex justify-center">
            <Buttons text="Registrarse" type="submit" bColor="#A62639" color="#fff" bgColor="#A62639" />
          </div>
        </form>
        {errors.general &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <span className="block sm:inline">{errors.general}</span>
          </div>}
        {successMessage &&
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>}
      </div>
    </>
  )
}

export default RegistrarForm