import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/homePage.scss";
import {  useNavigate } from 'react-router';

const HomePage = () => {
 const navigate = useNavigate();
  return (
    <div className="home-page-wrapper">
      <Navbar />

      <div className="home-page">
        <div className="home-page__hero">
          <h1>🚀 Automate Your Job Applications</h1>
          <p>
            Generate AI resumes, send job emails, and track everything in one place.
          </p>

          <div className="home-page__hero-buttons">
            <button onClick={() => {navigate('/job-apply')}}>Start Applying</button>
            <button className="secondary" onClick={()=>{navigate('/ai-reports')}}>View Reports</button>
          </div>
        </div>

        <div className="home-page__features">
          <div className="feature-card">
            <h3>📄 AI Resume</h3>
            <p>Create tailored resumes instantly</p>
          </div>

          <div className="feature-card">
            <h3>📧 Auto Email</h3>
            <p>Send job applications automatically</p>
          </div>

          <div className="feature-card">
            <h3>📊 Smart Reports</h3>
            <p>Track your success rate</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;