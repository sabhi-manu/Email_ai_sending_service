import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Protect = ({children}) => {
    const {loading,user} = useAuth()
    console.log(user)

    if(loading){
        return <h1>Loading....</h1>
    }
    if(!user){
     return <Navigate to={'/login'} />
    }
  return children
}

export default Protect