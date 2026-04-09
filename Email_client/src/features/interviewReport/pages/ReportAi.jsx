import { useRef, useState } from "react";
import "../style/home.scss";
import useinterviewHooks from "../hooks/useinterviewHooks";
import { useNavigate } from "react-router";
import ReportCards from "../components/ReportCards";

const Home = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeRef = useRef();

  const { generateReport, loading, reports } = useinterviewHooks();

  const generateReportHandler = async () => {
    try {
      let resumeFile = resumeRef.current.files[0];
      let data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      console.log(data);
      navigate(`/interview/${data._id}`);
    } catch (error) {
      console.log("error occur while create Report : ", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="home">
      {/* Header */}
      <header className="home__header">
        <h1 className="home__title">
          Create Your Custom{" "}
          <span className="home__highlight">Interview Plan</span>
        </h1>
        <p className="home__subtitle">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* Main Content */}
      <div className="home__card">
        {/* Left Panel */}
        <div className="home__panel home__panel--left">
          <div className="panel__header">
            <h2 className="panel__title">Target Job Description</h2>
            <span className="panel__required">Required</span>
          </div>

          <textarea
            className="home__textarea home__textarea--job"
            placeholder="Paste the job description here. Example:We are looking for a Software Engineer with experience in React, Node.js, and AWS..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={5000}
          />

          <div className="home__char-count">
            {jobDescription.length}/5000 Characters
          </div>
        </div>

        {/* Right Panel */}
        <div className="home__panel home__panel--right">
          <div className="panel__header">
            <h2 className="panel__title">Your Profile</h2>
          </div>

          {/* Upload Section */}
          <div className="upload">
            <label className="upload__label">
              Upload Resume <small>(Best Results)</small>
            </label>

            <label htmlFor="resume" className="upload__box">
              <p className="upload__text">Click to upload or drag and drop</p>
              <p className="upload__subtext">PDF or Docx (Max 5MB)</p>

              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.doc,.docx"
                hidden
                ref={resumeRef}
              />
            </label>
          </div>

          {/* OR Divider */}
          {/* <div className="home__divider">or</div> */}

          {/* Self Description */}
          <div className="home__self">
            <label htmlFor="self-description" className="home__label">
              Quick Self-Description
            </label>

            <textarea
              id="self-description"
              className="home__textarea home__textarea--self"
              placeholder="Tell us about your experience, skills, and what makes you a great fit for this role..."
              onChange={(e) => setSelfDescription(e.target.value)}
              value={selfDescription}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="home__footer">
        <p className="home__footer-text">
          AI-Powered Strategy Generator • Approx 30 seconds
        </p>
        <button className="home__btn" onClick={generateReportHandler}>
          Generate Interview Plan
        </button>
      </div>

      {/* report cards  */}

      <div className="reports">
        <section className="reports__section">
          <h2 className="reports__title">Recent Interview Plans</h2>

          <ul className="reports__list">
            {reports.map((report) => (
              <ReportCards report={report} key={report._id} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
