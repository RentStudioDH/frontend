import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useContextGlobal } from "../../../contexts/global.context"
import Buttons from "../Buttons"
import LoadingOverlay from "../LoadingOverlay.jsx"

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Por favor, ingrese un correo electrónico válido').required('Por favor, ingrese su correo electrónico.'),
  password: Yup.string().required('Por favor, ingrese su contraseña.'),
})

const LoginForm = ({ closeModal }) => {
  const [usuario, setUsuario] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { loginRequest } = useContextGlobal()
  const navigate = useNavigate()

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUsuario({ ...usuario, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // Limpiar errores previos
    setLoading(true)
    try {
      await validationSchema.validate(usuario, { abortEarly: false })

      const response = await loginRequest(usuario)

      closeModal()
      navigate('/admin/dashboard')
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {}
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message
        })
        setErrors(newErrors)
      } else {
        setErrors({ general: error.response?.data?.message || 'Error al iniciar sesión. Por favor, intente de nuevo.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LoadingOverlay open={loading} />
      <div className="bg-gray-100 grid place-items-center p-section">
        <p className="txt-accent txt-center subtitle"><strong>Iniciar sesión</strong></p>
        <form className="grid g-15" onSubmit={handleSubmit}>
          <div className="grid g-5">
            <label htmlFor="email" className="txt-tertiary paragraph">E-mail</label>
            <input className={`bg-back block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} txt-tertiary paragraph rounded-lg focus:ring-red-500 focus:border-red-500 p-2`} placeholder="Ingresa tu correo electrónico" type="email" name="email" id="email" role="email" onChange={handleChange} />
            {errors.email && <p className="text-red-500 legal">{errors.email}</p>}
          </div>
          <div className="grid g-5">
            <div className="flex justify-between items-end g-15">
              <label htmlFor="password" className="txt-tertiary paragraph">Contraseña</label>
              <Link to="/forgot-password" className="txt-primary underline decoration-solid legal">Olvidé mi contraseña</Link>
            </div>
            <input className={`bg-back block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} txt-tertiary paragraph rounded-lg focus:ring-red-500 focus:border-red-500 p-2`} placeholder="Ingrese su contraseña" type="password" name="password" onChange={handleChange} />
            {errors.password && <p className="text-red-500 legal">{errors.password}</p>}
          </div>
          <div className="flex justify-center">
            <Buttons text="Continuar" type="submit" bColor="#A62639" color="#fff" bgColor="#A62639" />
          </div>
          <span className="w-full h-[1px] bg-accent flex"></span>
          <div className="flex justify-between items-center g-15">
            <Buttons text={<><i className="fa-brands fa-google txt-primary subtitle"></i> Continuar con Google</>} type="button" bColor="#56494E" color="#56494E" bgColor="#fff" />
            <Buttons text={<><i className="fa-brands fa-facebook-f txt-primary subtitle"></i> Continuar con Facebook</>} type="button" bColor="#56494E" color="#56494E" bgColor="#fff" />
          </div>
        </form>
        {errors.general &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <span className="block sm:inline">{errors.general}</span>
          </div>}
      </div>
    </>
  )
}

export default LoginForm