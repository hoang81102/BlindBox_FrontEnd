import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { MdEmail, MdPerson, MdPhone, MdLocationOn } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import LabubuIcon from "../../Assets/Image/Labubu_icon(Register).png";
import logoImage from "../../Assets/Image/Labubu_Logo.jpg";
import registerVideo from "../../Assets/Video/Labubu_video.mp4";
import { registerUser } from "../../Services/ApiController";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateFullName = (fullName) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(fullName);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
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

  const isFormValid = () => {
    return (
      validateEmail(email) &&
      validatePassword(password) &&
      validateFullName(fullName) &&
      validatePhone(phone)
    );
  };

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullName(value);
    setNameError(
      validateFullName(value)
        ? ""
        : "Name should not contain special characters"
    );
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
    setPhoneError(validatePhone(value) ? "" : "Phone number must be 10 digits");
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    setAddressError(value ? "" : "Address is required");
  };

  const handleRegister = async () => {
    setIsLoading(true);

    if (!email || !password || !confirmPassword || !fullName || !phone) {
      setIsLoading(false);
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(email, password, fullName, phone);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <div className="register-container">
          <div className="register-left-section">
            <video
              src={registerVideo}
              autoPlay
              muted
              loop
              className="register-background-video"
            ></video>
          </div>
          <div className="register-right-section">
            <div className="register-logo-wrapper">
              <img
                src={logoImage}
                alt="Labubu Logo"
                className="register-logo"
              />
            </div>
            <h1 className="register-title">REGISTER</h1>
            <div className="register-form-wrapper">
              <div
                className={`register-input-box ${
                  emailError ? "with-error" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`register-input ${
                    emailError
                      ? "register-input-invalid"
                      : email
                      ? "register-input-valid"
                      : ""
                  }`}
                />
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <MdEmail className="register-toggle" />
                {emailError && (
                  <p className="register-error-message">{emailError}</p>
                )}
              </div>

              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <MdPerson className="register-toggle" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={handleFullNameChange}
                  className={`register-input ${
                    nameError
                      ? "register-input-invalid"
                      : fullName
                      ? "register-input-valid"
                      : ""
                  }`}
                />
                {nameError && (
                  <p className="register-error-message">{nameError}</p>
                )}
              </div>

              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <MdPhone className="register-toggle" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`register-input ${
                    phoneError
                      ? "register-input-invalid"
                      : phone
                      ? "register-input-valid"
                      : ""
                  }`}
                />
                {phoneError && (
                  <p className="register-error-message">{phoneError}</p>
                )}
              </div>

              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon2"
                />
                <MdLocationOn className="register-locate-toggle" />
                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={handleAddressChange}
                  className={`register-input ${
                    addressError
                      ? "register-input-invalid"
                      : address
                      ? "register-input-valid"
                      : ""
                  }`}
                />
                {addressError && (
                  <p className="register-error-message">{addressError}</p>
                )}
              </div>

              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <i
                  className="register-toggle"
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
                      ? "register-input-invalid"
                      : password
                      ? "register-input-valid"
                      : ""
                  }
                />
                {passwordError && (
                  <p className="register-error-message">{passwordError}</p>
                )}
              </div>
              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <i
                  className="register-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(
                      e.target.value === password
                        ? ""
                        : "Passwords do not match"
                    );
                  }}
                  className={
                    confirmPasswordError
                      ? "register-input-invalid"
                      : confirmPassword
                      ? "register-input-valid"
                      : ""
                  }
                />
                {confirmPasswordError && (
                  <p className="register-error-message">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <div className="register-actions">
                <label className="register-remember-me">
                  <input type="checkbox" /> Remember me
                </label>
              </div>
              <button
                type="submit"
                className={`register-submit-button ${
                  isFormValid() ? "register-active-button" : ""
                }`}
                onClick={handleRegister}
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <span className="register-spinner-container">
                    <i className="register-spinner"></i> Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
