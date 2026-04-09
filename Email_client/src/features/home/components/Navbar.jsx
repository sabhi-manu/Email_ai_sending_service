
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const {handleLogout} = useAuth()

  const logoutHandler = () => {
    handleLogout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo" onClick={() => navigate("/")}>
        ⚡ JobAI
      </div>

      {/* Links */}
      <div className="navbar__links">
        <button onClick={() => navigate("/job-apply")}>Apply Job</button>
        <button onClick={() => navigate("/ai-reports")}>Report</button>
      </div>

      {/* Logout */}
      <div className="navbar__actions">
        <button className="logout" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;