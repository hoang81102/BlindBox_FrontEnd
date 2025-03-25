import { useState } from "react";
import {
  FaTruck,
  FaUser,
  FaBriefcase,
  FaSignOutAlt,
  FaChartBar,
  FaSwatchbook,
  FaArchive,
  FaListUl,
  FaCheckCircle,
} from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";
import "././SidebarAdmin.scss";

const SidebarAdmin = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const menuItems = [
    {
      name: "Revenue Manager",
      icon: <FaChartBar />,
      path: "/admin/revenue",
    },
    {
      name: "Order Manager",
      icon: <FaArchive />,
      path: "/admin/order",
      hasDropdown: true,
      subItems: [
        {
          name: "Order List",
          path: "/admin/order/order-list",
          icon: <FaListUl size={14} />,
        },
        {
          name: "Order Confirm",
          path: "/admin/order/order-confirm",
          icon: <FaArchive size={14} />,
        },
        {
          name: "Order Delivered",
          path: "/admin/order/order-delivered",
          icon: <FaTruck size={14} />,
        },
        {
          name: "Order Completed",
          path: "/admin/order/order-completed",
          icon: <FaCheckCircle size={14} />,
        },
      ],
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
      name: "BlindBox Manager",
      icon: <FaBriefcase />,
      path: "/admin/BlindBox",
    },
    {
      name: "Voucher Manager",
      icon: <FaSwatchbook />,
      path: "/admin/voucher",
    },
  ];

  
  const selectedStyle = {
    backgroundColor: "#cfe2ff",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  };

  return (
    <div className="sidebar-user-profile bg-white shadow-sm rounded p-3">
      <div className="welcome">Welcome to, Admin</div>
      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li key={item.name} className="nav-item">
            {item.hasDropdown ? (
              <>
                <button
                  className={`nav-link d-flex align-items-center btn btn-link text-dark`}
                  onClick={() => {
                    toggleDropdown(item.name);
                    setSelectedItem(item.name);
                  }}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    ...(selectedItem === item.name ? selectedStyle : {}),
                  }}
                >
                  {item.icon}
                  <span className="ms-2">{item.name}</span>
                  <MdExpandMore
                    style={{
                      transform:
                        openDropdown === item.name
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </button>
                {openDropdown === item.name && (
                  <ul className="nav flex-column ms-3">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name} className="nav-item">
                        <Link
                          to={subItem.path}
                          className={`nav-link d-flex align-items-center text-dark`}
                          onClick={() => setSelectedItem(subItem.name)}
                          style={
                            selectedItem === subItem.name ? selectedStyle : {}
                          }
                        >
                          {subItem.icon}
                          <span className="ms-2">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center text-dark`}
                onClick={() => setSelectedItem(item.name)}
                style={selectedItem === item.name ? selectedStyle : {}}
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
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className={`nav-link d-flex align-items-center btn btn-link text-dark`}
            style={{
              textDecoration: "none",
              width: "100%",
              ...(selectedItem === "logout" ? selectedStyle : {}),
            }}
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
