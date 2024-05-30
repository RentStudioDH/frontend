import React, { useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirmar contraseña es obligatorio'),
});

const RegistrarForm = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema.validate(usuario, { abortEarly: false })
      .then(() => {
        console.log('Formulario válido');
        // Aquí puedes enviar los valores del formulario a tu servidor
      })
      .catch((error) => {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg max-w-4xl mx-auto text-center">
      <div className="flex justify-center mb-8">
        <img className="object-none object-top  h-20" src="/public/logo/logo.png" alt="logo" />
      </div>
      <h1 className="text-black mb-8 font-bold">Crea tu cuenta en RentStudio</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4 w-3/5">
          <label htmlFor="nombre" className="block text-black text-left font-bold">Nombre</label>
          <input className="rounded-xl px-5 py-2.5 w-full shadow-md" type="text" name="nombre" id="nombre" value={usuario.nombre} onChange={handleChange} />
          {errors.nombre && <div className="text-red-500 text-left">{errors.nombre}</div>}
        </div>
        <div className="mb-4 w-3/5">
          <label htmlFor="apellido" className="block text-black text-left font-bold">Apellido</label>
          <input className="rounded-xl px-5 py-2.5 w-full shadow-md" type="text" name="apellido" id="apellido" value={usuario.apellido} onChange={handleChange} />
          {errors.apellido && <div className="text-red-500 text-left">{errors.apellido}</div>}
        </div>
        <div className="mb-4 w-3/5">
          <label htmlFor="email" className="block text-black text-left font-bold">E-mail</label>
          <input className="rounded-xl px-5 py-2.5 w-full shadow-md" type="email" name="email" id="email" value={usuario.email} onChange={handleChange} />
          {errors.email && <div className="text-red-500 text-left">{errors.email}</div>}
        </div>
        <div className="mb-4 w-3/5">
          <label htmlFor="password" className="block text-black text-left font-bold">Contraseña</label>
          <input className="rounded-xl px-5 py-2.5 w-full shadow-md" type="password" name="password" id="password" value={usuario.password} onChange={handleChange} />
          {errors.password && <div className="text-red-500 text-left">{errors.password}</div>}
        </div>
        <div className="mb-4 w-3/5">
          <label htmlFor="confirmPassword" className="block text-black text-left font-bold">Confirmar Contraseña</label>
          <input className="rounded-xl px-5 py-2.5 w-full shadow-md" type="password" name="confirmPassword" id="confirmPassword" value={usuario.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <div className="text-red-500 text-left">{errors.confirmPassword}</div>}
        </div>
        <Link>
          <p className="text-base text-gray-500 text-sm my-6 underline">
            Al registrarte, aceptas nuestros términos y condiciones, y nuestra política de privacidad.
          </p>
        </Link>
        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded">Registrarse</button>
        </div>
        <span className="w-full h-[1px] bg-accent my-4"></span>
        <div className="flex justify-between w-11/12">
          <button type="button" className="flex items-center text-black px-4 py-4 rounded-2xl border border-black text-[10px]">
            <i className="fab fa-google text-red-800 mr-3 text-[15px]"></i>Continuar con Google
          </button>
          <button type="button" className="flex items-center text-black px-4 py-4 rounded-2xl border border-black text-[10px]">
            <i className="fab fa-facebook-f text-red-800 mr-2 text-[15px]"></i>Continuar con Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarForm;
