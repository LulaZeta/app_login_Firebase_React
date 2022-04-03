import { useState } from "react"
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom';

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
    <div>

        {error && <p>{error}</p> }

        <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email</label>
            <input type='email' name='email' placeholder="enter your email" onChange={handleChange}/>

            <label htmlFor="password">Password</label>
            <input type='password' name='password' id= 'password'  placeholder="******" onChange={handleChange} />

            <button>Register</button>
        </form>
    </div>
  )
}