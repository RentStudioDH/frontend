
import { useState } from "react"
import { Link } from "react-router-dom"
 
const LoginForm = () => {

const [usuario, setUsuario] = useState({
    email:'',
    password:''
})
const [show, setShow] = useState()
const [error, seterror] = useState()



const handleSubmit = (e) =>{
    e.preventDefault()
    if (usuario.email && usuario.password ){
    setShow(true)
    console.log('paso');
    }
    else{
        seterror(true)
        console.log('nopaso');
    }
} 
 console.log(usuario);
  return (
    <div className="bg-gray-100 p-8 rounded-lg max-w-4xl mx-auto flex, pt-4, text-center">
        <img className="object-none object-top w-100 h-20 mx-3" src="/public/logo/logo.png" alt="logo" />
        <h1 className="h-10">Iniciar sesión</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block text-black relative right-20 ">E-mail</label>
        <input className="rounded-xl px-5  "placeholder="Ingresa tu correo electrónico"  type="email" name="email" id="email" role="email" onChange={({target}) => setUsuario({...usuario, email: target.value})} /> 
        <label htmlFor="password"className="block text-black relative right-16 ">Contraseña</label>
        <input className="rounded-xl px-5" placeholder="Ingrese su contraseña" type="password" onChange={({target}) => setUsuario({...usuario, password:target.value})}/> 
        <Link><h4 className="text-[10px] flex justify-center relative left-12 mt-3 underline decoration-solid ">Olvidé mi contraseña</h4></Link>
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
        <button type="submit" className="flex bg-red-800 text-white px-4 py-2 rounded "  >Continuar</button>
        </div>
<span className="w-full h-[1px] bg-accent flex my-2"></span>
  <div className="flex justify-between h-20 grid grid-cols-2 gap-40 content-end ">
        <button type="submit" className="flex  text-black px-0 py-4 rounded-2xl border border-black text-[10px] justify-center"   > <i class="fa-brands fa-google text-red-800 mr-3 text-[15px]"></i>Continuar con Google</button>
        <button type="submit" className="flex text-black px-0 py-4 rounded-2xl border border-black text-[10px] justify-center "  > <i class="fa-brands fa-facebook-f text-red-800 mr-2 text-[15px] " ></i>Continuar con Facebook</button>
  </div>

        
    </form>
    {show && <p>exitoso</p> }
    {error && <p>Por favor verifique su información nuevamente</p>}
    </div>
   
  )
  
}

export default LoginForm