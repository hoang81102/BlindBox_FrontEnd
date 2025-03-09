import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import {
  MdEmail,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdDarkMode,
  MdLightMode,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import LabubuIcon from "../../Assets/Image/Labubu_icon(Register).png";
import logoImage from "../../Assets/Image/Labubu_Logo.jpg";
import registerVideo from "../../Assets/Video/LoginVideo.mp4";
import LogoSystem from "../../Assets/Image/LogoSystem.jpg";
import { registerUser } from "../../Services/AuthService";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateGender,
} from "../../Services/Validation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(
      validateEmail(value)
        ? ""
        : "Invalid email format (Email must be exmaple@gmail.com)"
    );
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setGender(value);
    setGenderError(validateGender(value) ? "" : "Please select a valid gender");
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(
      validatePassword(value) ? "" : "Password must be at least 6 characters"
    );
  };

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
    setFirstNameError(
      validateName(value) ? "" : "Name should not contain special characters"
    );
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
    setLastNameError(
      validateName(value) ? "" : "Name should not contain special characters"
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

  const isFormValid = () => {
    return (
      validateEmail(email) &&
      validatePassword(password) &&
      validateName(firstName) &&
      validateName(lastName) &&
      validateGender(gender) &&
      validatePhone(phoneNumber)
    );
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const result = await registerUser({
        firstName,
        lastName,
        email,
        password,
        gender,
        phoneNumber,
        address,
      });
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      setTimeout(
        () => navigate(`/verify?email=${encodeURIComponent(result.email)}`),
        1000
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`register-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </div>
      <div className="home-logo-wrapper" onClick={() => navigate("/")}>
        <div className="home-logo">
          <img src={LogoSystem}></img>
        </div>
        <span className="home-title">Mystic BlindBox</span>
      </div>
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
              {/* Email */}
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

              {/* First Name */}
              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <MdPerson className="register-toggle" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className={`register-input ${
                    firstNameError
                      ? "register-input-invalid"
                      : firstName
                      ? "register-input-valid"
                      : ""
                  }`}
                />
                {firstNameError && (
                  <p className="register-error-message">{firstNameError}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <MdPerson className="register-toggle" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className={`register-input ${
                    lastNameError
                      ? "register-input-invalid"
                      : lastName
                      ? "register-input-valid"
                      : ""
                  }`}
                />
                {lastNameError && (
                  <p className="register-error-message">{lastNameError}</p>
                )}
              </div>

              {/* Phone Number */}
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
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className={`register-input ${
                    phoneError
                      ? "register-input-invalid"
                      : phoneNumber
                      ? "register-input-valid"
                      : ""
                  }`}
                />
                {phoneError && (
                  <p className="register-error-message">{phoneError}</p>
                )}
              </div>

              {/* Gender */}
              <div className="register-input-box">
                <img
                  src={LabubuIcon}
                  alt="Labubu Icon"
                  className="register-input-icon"
                />
                <MdPerson className="register-toggle" />
                <select
                  value={gender}
                  onChange={handleGenderChange}
                  className={`register-input ${
                    gender ? "register-input-valid" : ""
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div className="register-input-box" id="register-locate">
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

              {/* Password */}
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

              {/* Confirm Password */}
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

              <div className="register-login-redirect">
                <p>
                  Already have an account?{" "}
                  <span
                    className="register-login-link"
                    onClick={() => navigate("/login")}
                  >
                    Login here
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

export default Register;
