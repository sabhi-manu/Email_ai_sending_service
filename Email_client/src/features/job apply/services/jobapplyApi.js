

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

 const api = axios.create({
    baseURL : API_URL,
    withCredentials: true
 })

export const applyToJob = async (formData) => {
   return await api.post("/job/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });   
}

