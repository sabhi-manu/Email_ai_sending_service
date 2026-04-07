import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { getMe, login, logout, register, verifyOtp } from "../services/auth.api"


export const useAuth = ()=>{
    const {user,setUser,loading,setLoading} = useContext(AuthContext)

    const handleRegister = async ({email,userName,password})=>{
        setLoading(true)
        try {
            const data = await register({email,userName,password})
            if(data?.user) setUser(data.user)
            return data
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async ({email,password})=>{
        setLoading(true)
        try {
            const data = await login({email,password})
            if(data?.user) setUser(data.user)
            return data
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async ({email,otp})=>{
        console.log("handle verify otp running....",email,otp)
        setLoading(true)
        try {
            const data = await verifyOtp({email,otp})
            console.log("data from verify otp handler ==>",data)
            if(data?.user) setUser(data.user)
            return data
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async ()=>{
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            return data
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleCurrentUser = async ()=>{
        setLoading(true)
        try {
            const data = await getMe()
            if(data?.user) setUser(data.user)
            return data
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

     useEffect(()=>{
        const getAndSetUser = async ()=>{
           try {
             const data = await getMe()
             console.log('use effect data : =>',data)
             setUser(data?.user)
           } catch (error) {
            console.log('error in ge me use effect :=>',error)
           }finally{

               setLoading(false)
           }
        }
        getAndSetUser()
    },[])


    return {user,loading,handleRegister,handleLogin,handleLogout,handleVerifyOtp,handleCurrentUser}
}