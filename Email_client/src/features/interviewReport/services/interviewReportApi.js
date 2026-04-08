import axios from "axios"


 const api = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials: true
 })

 export async function generateInterviewReport({jobDescription, selfDescription, resumeFile}){
    try {
        const formData = new FormData()
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription) 
        formData.append("resume", resumeFile)

        const response = await api.post("/ai/interview", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }   
        })

        return response.data
    } catch (error) {
        console.error("Error generating report:", error);
        throw error;
    }
 }

 export async function getInterviewReportById(reportId){
    try {
        const response = await api.get(`/ai/interview/report/${reportId}`)
        return response.data
    }catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }

}

export async function getAllInterviewReports(){
    try {
        const response = await api.get("/ai/interview/reports")
        console.log('all interview reports ==>',response)
        return response.data
    }catch (error) {
        console.error("Error fetching reports:", error);
        throw error;
    }       
}