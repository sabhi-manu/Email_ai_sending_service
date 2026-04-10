import React, { useState } from 'react'
import {Link, useNavigate} from "react-router"
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'


const Login = () => {
    const navigate = useNavigate()
    const {loading ,handleLogin } = useAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const submitHandler =(e)=>{
        e.preventDefault()
        handleLogin({email,password})
        console.log("login successfully...")
        navigate("/")
    }


    const guestLogin = async () => {
    await handleLogin({
        email: "sabhimanu707@gmail.com",
        password: "1234"
    })

    navigate("/")
}


    if(loading){
        <p>Loading...</p>
    }
  return (
   <main>
    <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={submitHandler} >
            <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} value={email} required />
            </div>
            <div className='input-group'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter Your Password...' onChange={(e)=>setPassword(e.target.value)} value={password} required />
            </div>
            <button className='button primary-button'>Submit</button>
             <button
        type="button"
        className='button secondary-button'
        onClick={guestLogin}
    >
        Login as Guest
    </button>
        </form>

         <p> 
          Already don't have an account ? <Link to="/register"> Register</Link>
        </p>
    </div>
   </main>
  )
}

export default Login