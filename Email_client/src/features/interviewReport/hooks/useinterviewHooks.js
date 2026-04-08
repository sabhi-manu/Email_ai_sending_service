import { useContext, useEffect } from "react"
import { InterviewContext } from "../InterviewContext"
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports } from "../services/interviewReportApi"
import { useParams } from "react-router"





const useinterviewHooks = () => {
    const {InterviewId} = useParams()
    const { loading, setLoading, report, setReport, reports, setReports }  = useContext(InterviewContext)


    const generateReport = async ({jobDescription, selfDescription, resumeFile})=>{
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})

            setReport(response.interviewReport)
    
        } catch (error) {
            console.error("Error generating report:", error);
            throw error;
        }
        finally {
            setLoading(false)
        }

        return response.interviewReport
    }

    const getReportId = async (reportId)=>{
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(reportId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log("Error get interview by id:",error)
            throw error;
        }finally{
            setLoading(false)
        }

        return response.interviewReport
    }


    const getallReports = async ()=>{
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReport)
        } catch (error) {
            console.log("Error fetching interview reports:",error)
            throw error;
        }finally{
            setLoading(false)
        }

        return response.interviewReport
    }

      useEffect(()=>{
        getallReports()
    },[])

    useEffect(()=>{
        if(InterviewId){
            getReportId(InterviewId)
        }
    },[InterviewId])

  

  return {loading,report,reports, generateReport,getReportId,getallReports}
}

export default useinterviewHooks