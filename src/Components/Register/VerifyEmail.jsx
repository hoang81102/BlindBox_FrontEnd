import { useLocation, useNavigate } from "react-router-dom";
import "./Register.scss"; // Tận dụng SCSS từ Register
import logoImage from "../../Assets/Image/Labubu_Logo.jpg";
import registerVideo from "../../Assets/Video/LoginVideo.mp4";
import animationLoading from "../../Assets/Video/Animation_Loading.webm";
import "bootstrap/dist/css/bootstrap.min.css";
const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

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
            <h1 className="register-title">EMAIL VERIFICATION</h1>
            <div className="register-form-wrapper">
              <div className="register-message">
                <p>
                  Please check your email to verify your account.
                  <br />
                  <strong>Email: {email || "Your email:"}</strong>
                </p>
                <video src={animationLoading} autoPlay muted loop></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
