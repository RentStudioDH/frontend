import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useContextGlobal } from "../../../contexts/global.context"
import { fetchData } from "../../../utils/js/apiRequest"
import Buttons from "../Buttons"

const LoginForm = ({ closeModal }) => {
  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const { loginUser } = useContextGlobal()
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!usuario.email) {
      newErrors.email = 'Por favor, ingrese su correo electrónico.'
    } else if (!validateEmail(usuario.email)) {
      newErrors.email = 'Por favor, ingrese un correo electrónico válido.'
    }

    if (!usuario.password) {
      newErrors.password = 'Por favor, ingrese su contraseña.'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetchData({
          method: 'post',
          endpoint: '/auth/login',  // Usar el endpoint correcto
          data: usuario
        })
        const { token } = response  // Ajusta esto según la estructura de tu respuesta API

        loginUser(token)
        closeModal()
        navigate('/admin/dashboard')
      } catch (error) {
        setErrors({ ...newErrors, general: 'Error al iniciar sesión. Por favor, intente de nuevo.' })
      }
    }
  }
  const handleChange = ({ target }) => {
    setUsuario({ ...usuario, [target.name]: target.value })

    if (errors[target.name]) {
      setErrors({ ...errors, [target.name]: '' })
    }
  }

  return (
    <div className="bg-gray-100 grid place-items-center p-section">
      <p className="txt-accent txt-centersubtitle"><strong>Iniciar sesión</strong></p>
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
          <Buttons text='Continuar' type={'submit'} bColor='#A62639' color='#fff' bgColor='#A62639' />
        </div>
        <span className="w-full h-[1px] bg-accent flex"></span>
        <div className="flex justify-between items-center g-15">
          <Buttons text={<><i className="fa-brands fa-google txt-primary subtitle"></i> Continuar con Google</>} type={'button'} bColor='#56494E' color='#56494E' bgColor='#fff' />
          <Buttons text={<><i className="fa-brands fa-facebook-f txt-primary subtitle"></i> Continuar con Facebook</>} type={'button'} bColor='#56494E' color='#56494E' bgColor='#fff' />
        </div>
      </form>
      {errors.general && <p className="text-red-500 paragraph">{errors.general}</p>}
    </div>
  );
}

export default LoginForm;