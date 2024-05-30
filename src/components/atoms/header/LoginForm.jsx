import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

const LoginForm = () => {
  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema.validate(usuario, { abortEarly: false })
      .then(() => {
        setShow(true);
        console.log('Formulario válido');
        // usar fetch
      })
      .catch((error) => {
        const newValidationErrors = {};
        error.inner.forEach((err) => {
          newValidationErrors[err.path] = err.message;
        });
        setValidationErrors(newValidationErrors);
        setError(true);
        console.log('Formulario inválido');
      });
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-8">
        <img className="h-10" src="/public/logo/logo.png" alt="logo" />
      </div>
      <h1 className="text-black mb-8">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4 w-3/5">
          <label htmlFor="email" className="block text-black text-left">E-mail</label>
          <input
            className="rounded-xl px-5 py-2.5 w-full shadow-md"
            placeholder="Ingresa tu correo electrónico"
            type="email"
            name="email"
            id="email"
            role="email"
            value={usuario.email}
            onChange={handleChange}
          />
          {error && validationErrors.email && <div className="text-red-500">{validationErrors.email}</div>}
        </div>
        <div className="mb-4 w-3/5">
          <label htmlFor="password" className="block text-black text-left">Contraseña</label>
          <input
            className="rounded-xl px-5 py-2.5 w-full shadow-md"
            placeholder="Ingrese su contraseña"
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
          />
          {error && validationErrors.password && <div className="text-red-500">{validationErrors.password}</div>}
        </div>
        <Link className="flex justify-end w-3/5">
          <h4 className="text-[10px] underline decoration-solid">
            Olvidé mi contraseña
          </h4>
        </Link>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button type="submit" className="flex bg-red-800 text-white px-4 py-2 rounded">Continuar</button>
        </div>
        <span className="w-full h-[1px] bg-accent my-2"></span>
        <div className="flex justify-between w-11/12">
          <button type="button" className="flex items-center text-black px-4 py-2 rounded-2xl border border-black text-[10px]">
            <i className="fa-brands fa-google text-red-800 mr-3 text-[15px]"></i>Continuar con Google
          </button>
          <button type="button" className="flex items-center text-black px-4 py-2 rounded-2xl border border-black text-[10px]">
            <i className="fa-brands fa-facebook-f text-red-800 mr-2 text-[15px]"></i>Continuar con Facebook
          </button>
        </div>
      </form>
      {show && <p>exitoso</p>}
      {error && <p>Por favor verifique su información nuevamente</p>}
    </div>
  );
}

export default LoginForm;
