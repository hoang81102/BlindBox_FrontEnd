import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { MdEmail } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import LabubuIcon from "../../Assets/Image/Labubu_icon.png";
import logoImage from "../../Assets/Image/Labubu_Logo.jpg";
import loginVideo from "../../Assets/Video/LabubuVideo.mp4";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid email format");
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(
      validatePassword(value) ? "" : "Password must be at least 6 characters"
    );
  };

  const handleRegisterRedirect = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  const handleForgotPasswordRedirect = () => {
    navigate("/forgot-password");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setIsLoading(false);
      toast.error("Email/Password is required!");
      return;
    }

    const fakeResponse = { status: "ok", data: "fakeToken" };
    if (fakeResponse && fakeResponse.data && fakeResponse.status === "ok") {
      toast.success("Login successful");
      navigate("/dashboard");
    } else {
      toast.error("Wrong email or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-left-section">
            <video
              src={loginVideo}
              autoPlay
              muted
              loop
              className="login-background-video"
            ></video>
          </div>
          <div className="login-right-section">
            <div className="login-logo-wrapper">
              <img src={logoImage} alt="Labubu Logo" className="login-logo" />
            </div>
            <h1 className="login-title">WELCOME BACK</h1>
            <div className="login-form-wrapper">
              <div
                className={`login-input-box ${emailError ? "with-error" : ""}`}
              >
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`login-input ${
                    emailError
                      ? "login-input-invalid"
                      : email
                      ? "login-input-valid"
                      : ""
                  }`}
                />
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="login-input-icon"
                />

                <MdEmail className="login-login-toggle" />
                {emailError && (
                  <p className="login-error-message">{emailError}</p>
                )}
              </div>

              <div className="login-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="login-input-icon"
                />
                <i
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={
                    passwordError
                      ? "login-input-invalid"
                      : password
                      ? "login-input-valid"
                      : ""
                  }
                />
                {passwordError && (
                  <p className="login-error-message">{passwordError}</p>
                )}
              </div>
              <div className="login-actions">
                <label className="login-remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <p
                  className="login-forgot-password-link"
                  onClick={handleForgotPasswordRedirect}
                >
                  Forgot password?
                </p>
              </div>
              <button
                type="submit"
                className={`login-submit-button ${
                  email && password ? "login-active-button" : ""
                }`}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="login-spinner-container">
                    <i className="login-spinner"></i> Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;