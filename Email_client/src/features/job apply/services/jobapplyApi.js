

import axios from "axios";

 const api = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials: true
 })

export const applyToJob = async (formData) => {
   return await api.post("/job/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });   
}

