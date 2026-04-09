import { useState } from "react";
import axios from "axios";
import "../styles/jobApply.scss";
import { useJobApply } from "../hooks/useJobApply";

const JobApply = () => {
  const [formData, setFormData] = useState({
    jobDescription: "",
    selfDescription: "",
    generateResume: false,
    resume: null,
  });
const [loading, setLoading] = useState(false);
  const {handleApplyJob} = useJobApply();
 

 const handleSubmit = async () => {
  if (!formData.jobDescription) {
    return alert("Job description is required");
  }

  if (!formData.resume && !formData.generateResume) {
    return alert("Upload resume or enable generate resume");
  }

  try {
    setLoading(true);

    const response = await handleApplyJob(formData);

    if (response.status === 200) {
      alert("Job submitted 🚀");
    } else {
      alert("Failed to submit job");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="job-email">
      <h1 className="job-email__title">Apply to Job</h1>

      <div className="job-email__card">
        {/* Job Description */}
        <label>Target Job Description *</label>
        <textarea
          placeholder="Paste job description..."
          value={formData.jobDescription}
          onChange={(e) =>
            setFormData({ ...formData, jobDescription: e.target.value })
          }
        />

        {/* Resume Upload */}
        <label>Upload Resume</label>
        {!formData.generateResume && (
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) =>
              setFormData({ ...formData, resume: e.target.files[0] })
            }
          />
        )}

        {/* Generate Resume Toggle */}
        <div className="job-email__checkbox">
          <input
            type="checkbox"
            checked={formData.generateResume}
            onChange={(e) =>
              setFormData({
                ...formData,
                generateResume: e.target.checked,
              })
            }
          />
          <span>Generate Resume using AI</span>
        </div>

        {/* Self Description */}
        <label>Quick Self Description</label>
        <textarea
          placeholder="Tell about yourself..."
          value={formData.selfDescription}
          onChange={(e) =>
            setFormData({ ...formData, selfDescription: e.target.value })
          }
        />

        {/* Submit Button */}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Apply Job"}
        </button>
      </div>
    </div>
  );
}

export default JobApply