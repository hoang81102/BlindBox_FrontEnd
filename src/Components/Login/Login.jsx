import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { MdEmail } from "react-icons/md";
import {
  MdVisibility,
  MdVisibilityOff,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import LabubuIcon from "../../Assets/Image/Labubu_icon.png";
import logoImage from "../../Assets/Image/Labubu_Logo.jpg";
import loginVideo from "../../Assets/Video/LoginVideo.mp4";
import LogoSystem from "../../Assets/Image/LogoSystem.jpg";
import leftEye from "../../Assets/Image/Labubu_lefteye(nhắm).png";
import rightEye from "../../Assets/Image/Labubu_righteye(nhắm).png";
import { toast } from "react-toastify";
import { loginUser } from "../../Services/ApiController";
import ToastManager from "../../Services/ToastManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  }, []);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      ToastManager.showError("Email and Password are required!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      if (!response?.token) {
        ToastManager.showError("Invalid login response: Token not found");
        return;
      }
      const { token, user } = response;
      localStorage.setItem("username", user.name);
      localStorage.setItem("phoneNumber", user.phoneNumber);
      localStorage.setItem("email", user.email);

      const decodedToken = jwtDecode(token);
      const role = decodedToken?.Role;
      localStorage.setItem("role", role);
      ToastManager.showSuccess("Login successful");

      if (role === "user") {
        navigate("/");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      ToastManager.showError(
        error.response?.data?.message || "Wrong email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return validateEmail(email) && validatePassword(password);
  };

  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
      <div className="home-logo-wrapper" onClick={() => navigate("/")}>
        <div className="home-logo">
          <img src={LogoSystem}></img>
        </div>
        <span className="home-title">Mystic BlindBox</span>
      </div>
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-left-section">
            <video
              ref={videoRef}
              src={loginVideo}
              autoPlay
              muted
              loop
              className="login-background-video"
            ></video>
          </div>
          <div className="login-right-section">
            <div className="login-logo-wrapper">
              <div
                className={`labubu-wrapper ${
                  showPassword ? "show-password" : ""
                }`}
              >
                <img src={logoImage} alt="Labubu Logo" className="login-logo" />
                <img
                  src={leftEye}
                  alt="Left Eye"
                  className="labubu-eye left-eye"
                />
                <img
                  src={rightEye}
                  alt="Right Eye"
                  className="labubu-eye right-eye"
                />
              </div>
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
                  isFormValid() ? "login-active-button" : ""
                }`}
                onClick={handleLogin}
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <span className="login-spinner-container">
                    <i className="login-spinner"></i> Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              {/* Thanh chia */}
              <div className="login-divider">OR LOGIN WITH</div>

              {/* Đăng nhập bằng Google & Facebook */}
              <div className="login-social">
                <button className="login-social-button google">
                  <FaGoogle className="social-icon google" /> Google
                </button>
                <button className="login-social-button facebook">
                  <FaFacebook className="social-icon facebook" /> Facebook
                </button>
              </div>

              <div className="login-register-redirect">
                <p>
                  Don't have an account?{" "}
                  <span
                    className="login-register-link"
                    onClick={() => navigate("/register")}
                  >
                    Register here
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
