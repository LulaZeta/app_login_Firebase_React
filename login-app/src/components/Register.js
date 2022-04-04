import { useState } from "react"
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from "./Alert";

export const Register = () => {
    const [user, setUser] = useState({
    email:'',
    password:'',
    });
    const {signup} = useAuth()
    const navigate = useNavigate()
const [error, setError] = useState()

    const handleChange = ({target: {name, value}}) => {
    //console.log(name, value);
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
       //console.log(user)
     try {
          await signup(user.email, user.password)
          navigate('/')
     } catch (error){
         if(error.code === "auth/internal-error")
         setError('Correo invalido');
         if(error.code === 'auth/weak-password')
         setError('password minimo 6 carateres')
         if(error.code === 'auth/email-already-in-use')
         setError('Correo existente')
     }
    }

  return (
    <div className= "w-full max-w-xs m-auto">

        {error && <Alert message={error}/> }

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-fold mb-2" >Email</label>
            <input type='email' name='email' placeholder="enter your email" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-fold mb-2" >Password</label>
            <input type='password' name='password' id= 'password'  placeholder="******" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline" />
        </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </form>

        <p className="my-4 text-sm flex justify-between px-3" >Already have an Account? <Link to='/login' className="text-blue-700 hover:text-blue-900" >Login</Link></p>
    </div>
  )
}