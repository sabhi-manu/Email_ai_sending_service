import { applyToJob } from "../services/jobapplyApi";


export const useJobApply =  () => {


    const handleApplyJob = async (formData) => {

        const data = new FormData();
        data.append("jobDescription", formData.jobDescription);
        data.append("selfDescription", formData.selfDescription);
        data.append("generateResume", formData.generateResume);


        if (formData.resume) {
            data.append("resume", formData.resume);
        }


        let response = await applyToJob(data);

        return response;
    }

    return {
        handleApplyJob
    }
}