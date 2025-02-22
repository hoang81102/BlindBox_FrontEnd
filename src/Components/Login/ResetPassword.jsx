import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.scss";
import {
  MdDarkMode,
  MdLightMode,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import LogoSystem from "../../Assets/Image/LogoSystem.jpg";
import loginVideo from "../../Assets/Video/LoginVideo.mp4";
import LabubuIcon from "../../Assets/Image/Labubu_icon.png";
import logoImage from "../../Assets/Image/Labubu_Logo.jpg";
import ToastManager from "../../Services/ToastManager";
import { resetPassword } from "../../Controller/ApiController";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setNewPassword(value);
    setPasswordError(
      validatePassword(value)
        ? ""
        : "Password must be at least 6 characters long"
    );
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(
      value === newPassword ? "" : "Passwords do not match"
    );
  };

  const handleResetPassword = async () => {
    if (!validatePassword(newPassword)) {
      ToastManager.showError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      ToastManager.showError("Passwords do not match");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");
    if (!token) {
      ToastManager.showError("Invalid or missing reset token");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ email, token, newPassword });
      ToastManager.showSuccess("Password reset successfully");
      navigate("/login");
    } catch (error) {
      ToastManager.showError(error.message || "Error resetting password");
    }
    setIsLoading(false);
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
            <h1 className="login-title">RESET PASSWORD</h1>
            <div className="login-form-wrapper">
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
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className={
                    passwordError
                      ? "login-input-invalid"
                      : newPassword
                      ? "login-input-valid"
                      : ""
                  }
                />
                {passwordError && (
                  <p className="login-error-message">{passwordError}</p>
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
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={
                    confirmPasswordError
                      ? "login-input-invalid"
                      : confirmPassword
                      ? "login-input-valid"
                      : ""
                  }
                />
                {confirmPasswordError && (
                  <p className="login-error-message">{confirmPasswordError}</p>
                )}
              </div>
              <button
                type="submit"
                className={`login-submit-button ${
                  validatePassword(newPassword) &&
                  newPassword === confirmPassword
                    ? "login-active-button"
                    : ""
                }`}
                onClick={handleResetPassword}
                disabled={
                  !validatePassword(newPassword) ||
                  newPassword !== confirmPassword ||
                  isLoading
                }
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
