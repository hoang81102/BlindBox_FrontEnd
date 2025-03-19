import {
  FaUser,
  FaBriefcase,
  FaSignOutAlt,
  FaChartBar,
  FaSwatchbook,
  FaArchive,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "././SidebarAdmin.scss";
const SidebarAdmin = () => {

  const menuItems = [
    {
      name: "Revenue Manager",
      icon: <FaChartBar />,
      path: "/admin/revenue",
    },
    {
      name: "User Manager",
      icon: <FaUser />,
      path: "/admin/user",
    },
    {
      name: "Category Manager",
      icon: <FaArchive />,
      path: "/admin/category",
    },
    {
      name: "Package Manager",
      icon: <FaBriefcase />,
      path: "/admin/package",
    },
    {
      name: "Voucher Manager",
      icon: <FaSwatchbook />,
      path: "/admin/voucher",
    },
  ];

  return (
    <div className="sidebar-user-profile bg-white shadow-sm rounded p-3">
      <div className="welcome">Welcome to, Admin</div>
      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li key={item.name} className="nav-item">
            {item.hasDropdown ? (
              <>
                {/* DROPDOWN */}
                <button
                  className="nav-link d-flex align-items-center btn btn-link"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  {item.icon}
                  <span className="ms-2">{item.name}</span>
                  <MdExpandMore />
                </button>
                <ul className="nav flex-column ms-3">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.name} className="nav-item">
                      <Link to={subItem.path} className="nav-link">
                        <span className="ms-2">{subItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                to={item.path}
                className="nav-link d-flex align-items-center"
              >
                {item.icon}
                <span className="ms-2">{item.name}</span>
              </Link>
            )}
          </li>
        ))}

        {/* Logout button */}
        <li className="nav-item">
          <button
            className="nav-link d-flex align-items-center btn btn-link"
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            <FaSignOutAlt />
            <span className="ms-2">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
