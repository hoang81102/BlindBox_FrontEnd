import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.scss";
import helloVideo from "../../Assets/Video/Animation_Hello.webm";

const Welcome = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    const timer2 = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className={`welcome-page ${fadeOut ? "fade-out" : ""}`}>
      <video
        src={helloVideo}
        autoPlay
        muted
        loop
        className="welcome-video"
      ></video>
      <h1 className="typing-text">
        Welcome to Mystic BlindBox! We are happy to have you here!
      </h1>
    </div>
  );
};

export default Welcome;
