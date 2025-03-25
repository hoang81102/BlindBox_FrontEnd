import "../HeaderAdmin/HeaderAdmin.scss";
import "animate.css";


function HeaderAdmin() {
//   const { avatar, firstName, lastName, phone } = useAuth();

  return (
    <div className="admin-banner">
      <div className="admin-info">
        {/* <img src={avatar} alt="admin" className="admin-avatar" /> */}
        <div className="admin-details">
          <p className="admin-hotline">
            {/* <span className="phone">Hotline: {phone}</span> */}
          </p>
        </div>
      </div>
      <div className="course-info">
        <p className="course-title animate__heartBeat animate__animated">
          WellCome
        </p>
        <h1 className="course-heading">
          Powering Productivity, One Task at a Time!
        </h1>
      </div>
    </div>
  );
}

export default HeaderAdmin;
