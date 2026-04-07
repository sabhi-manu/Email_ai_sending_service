import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister, handleVerifyOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyUi, setverifyUi] = useState(false);
  const [otp, setOtp] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!verifyUi) {
      await handleRegister({ email, userName, password });
      setverifyUi(true);
    } else {
      await handleVerifyOtp({ email, otp });
      console.log("register successfully...");
      navigate("/");
    }
  };
 

  if (loading) {
  return <p>Loading...</p>;
}

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email.."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter Your User Name..."
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
           
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password..."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
           
            />
          </div>
          {verifyUi && (
            <div className="input-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="password"
                name="otp"
                id="otp"
                placeholder="Enter Your OTP..."
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>
          )}

          <button className="button primary-button">
            {verifyUi ? "Verify OTP" : "Register"}
          </button>
        </form>

        <p>
          Already have an account ? <Link to="/login"> Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
