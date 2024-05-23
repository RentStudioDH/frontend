
import { useState } from "react"
 
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
    <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input type="email" name="email" id="email" role="email" onChange={({target}) => setUsuario({...usuario, email: target.value})} /> 
        <label htmlFor="password"className="block text-gray-700">Contraseña</label>
        <input type="password" onChange={({target}) => setUsuario({...usuario, password:target.value})}/> 
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
        <button type="submit" className="flex bg-red-800 text-white px-4 py-2 rounded "  >Enviar</button>
        </div>
        
    </form>
    {show && <p>exitoso</p> }
    {error && <p>Por favor verifique su información nuevamente</p>}
    </div>
   
  )
  
}

export default LoginForm