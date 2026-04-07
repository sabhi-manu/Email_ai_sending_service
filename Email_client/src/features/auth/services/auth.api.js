import axios from "axios"

export const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

export async function register({userName,email,password}) {
   try {
    const response  = await api.post("/auth/register", {userName,email,password}) 
    return response.data
   } catch (error) {
    console.log("Error in Register user :" , error)
    throw error
   } 
}

export async function login({email,password}) {
    console.log("checking input data login handler ==>",email,password)
    try {
        const response = await api.post("/auth/login",{email,password})
        console.log(response)
        return response.data
    } catch (error) {
        console.log("Error in login user :", error)
        throw error
    }
    
}

export async function logout() {
    try {
        await api.post("/auth/logout")
    } catch (error) {
        console.log("Error in logout user :", error)
        throw error
    }
}

export async function verifyOtp({email,otp}) {
    try {
        const response = await api.post("/auth/verify-otp",{email,otp})
        return response.data
    } catch (error) {
        console.log("Error in verify otp :", error)
        throw error
    }
    
}


export async function getMe () {
    try {
        const response = await api.get("/auth/me")
        return response.data
    } catch (error) {
        console.log("Error in get me  :", error)
        throw error
    }
    
}