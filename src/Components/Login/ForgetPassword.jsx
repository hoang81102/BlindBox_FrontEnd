import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { MdEmail, MdDarkMode, MdLightMode, MdArrowBack } from "react-icons/md";
import LogoSystem from "../../Assets/Image/LogoSystem.jpg";
import loginVideo from "../../Assets/Video/LoginVideo.mp4";
import logoImage from "../../Assets/Image/Labubu_Logo.jpg";
import LabubuIcon from "../../Assets/Image/Labubu_icon.png";
import ToastManager from "../../Services/ToastManager";
import { forgotPassword } from "../../Services/AuthService";
import { validateEmail } from "../../Services/Validation";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? "" : "Invalid email format");
  };

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      ToastManager.showError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      ToastManager.showSuccess("Reset link sent to your email");
      setTimeout(() => {
        navigate("/verify?email=" + encodeURIComponent(email));
      });
    } catch (error) {
      ToastManager.showError(error.message || "Error sending reset link");
    }
    setIsLoading(false);
  };

  const isFormValid = () => {
    return validateEmail(email);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
      <div className="home-logo-wrapper">
        <div className="home-logo" onClick={() => navigate("/")}>
          <img src={LogoSystem} alt="Logo System" />
        </div>
        <span className="home-title">Mystic BlindBox</span>
      </div>
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
            <h1 className="login-title">FORGOT PASSWORD</h1>
            <div className="login-form-wrapper">
              <div
                className={`login-input-box ${emailError ? "with-error" : ""}`}
              >
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`login-input ${
                    emailError ? "login-input-invalid" : ""
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

              <button
                type="submit"
                className={`login-submit-button ${
                  isFormValid() ? "login-active-button" : ""
                }`}
                onClick={handleResetPassword}
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="login-register-redirect">
                <p>
                  Remeber ?{" "}
                  <span
                    className="login-register-link"
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
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

export default ForgetPassword;
