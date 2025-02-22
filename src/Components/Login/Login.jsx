import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { MdEmail } from "react-icons/md";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
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
import { loginUser } from "../../Controller/ApiController";
import { googleLogin } from "../../Controller/ApiController";
import ToastManager from "../../Services/ToastManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { CartService } from "../../Services/CartService";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { loadCart } = useContext(CartService);
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

  const saveUserAndRole = (user, token) => {
    if (!user || !token) return;

    const userInfo = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      phoneNumber: user.phoneNumber,
      email: user.email,
      gender: user.gender,
      address: user.address,
    };

    Object.entries(userInfo).forEach(([key, value]) =>
      localStorage.setItem(key, value)
    );

    const decodedToken = jwtDecode(token);
    const roleKey = Object.keys(decodedToken).find((key) =>
      key.includes("role")
    );
    const role = roleKey ? decodedToken[roleKey] : "Guest";
    localStorage.setItem("role", role);

    return role;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return ToastManager.showError("Email and Password are required!");
    }
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      if (!response?.accessToken) {
        return ToastManager.showError(
          "Invalid login response: Token not found"
        );
      }
      const role = saveUserAndRole(response, response.accessToken);
      const roleRedirects = {
        admin: "/admin",
        User: "/",
      };

      const redirectPath = localStorage.getItem("redirectPath");
      navigate(redirectPath || roleRedirects[role] || "/404");

      if (redirectPath) {
        localStorage.removeItem("redirectPath");
      }

      //Gọi cart
      const userId = localStorage.getItem("userId");
      loadCart(userId);

      ToastManager.showSuccess("Login successful");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      ToastManager.showError(
        error.response?.data?.message || "Wrong email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const data = await googleLogin(response.credential);
      if (data?.id) {
        ToastManager.showSuccess("Google Login successful!");

        const role = saveUserAndRole(data, data.accessToken);

        const roleRedirects = {
          admin: "/admin",
          User: "/",
        };

        const redirectPath = localStorage.getItem("redirectPath");
        navigate(redirectPath || roleRedirects[role] || "/404");

        if (redirectPath) {
          localStorage.removeItem("redirectPath");
        }
        //Gọi cart
        const userId = localStorage.getItem("userId");
        loadCart(userId);
        ToastManager.showSuccess("Login successful");
      } else {
        ToastManager.showError("Google Login failed!");
      }
    } catch (err) {
      console.error(err);
      ToastManager.showError("Google Login error!");
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    ToastManager.showError("Google Login Failed!");
    navigate("/404");
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
              type="video/mp4"
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
              <div className="login-divider">OR LOGIN WITH</div>
              <div className="login-social">
                <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                    text="signin_with"
                  />
                </GoogleOAuthProvider>
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
