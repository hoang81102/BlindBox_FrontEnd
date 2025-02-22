import React, { useState } from "react";
import { FiHome, FiUsers, FiFileText, FiLogOut } from "react-icons/fi";
import { Button, Image, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import "animate.css"; // Import thư viện Animate.css

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: "revenue",
      label: "Revenue Dashboard",
      icon: FiFileText,
      path: "/admin/revenue",
    },
    {
      id: "users",
      label: "User Management",
      icon: FiUsers,
      path: "/admin/users",
    },
    {
      id: "category",
      label: "Category Management",
      icon: FiFileText,
      path: "/admin/category",
    },
    {
      id: "voucher",
      label: "Voucher Management",
      icon: FiFileText,
      path: "/admin/voucher",
    },
    {
      id: "product",
      label: "Product Management",
      icon: FiFileText,
      path: "/admin/product",
    },
    {
      id: "feedback",
      label: "Feedback Management",
      icon: FiFileText,
      path: "/admin/feedback",
    },
  ];

  const user = {
    name: "John Doe",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const handleNavigation = (path) => {
    setActiveSection(path);
    navigate(path);
  };

  const sidebarWidth = isExpanded ? "250px" : "80px";

  return (
    <>
      {/* AdminSidebar */}
      <aside
        className="bg-light shadow"
        style={{
          width: sidebarWidth,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          transition: "width 0.3s ease",
          overflow: "hidden",
          padding: "0",
          zIndex: 1000, // Thêm z-index để đảm bảo sidebar luôn nằm trên cùng
        }}
      >
        <div className="d-flex flex-column h-100">
          <div className="p-3 border-bottom d-flex align-items-center">
            <Image
              src={user.avatar}
              alt="User avatar"
              roundedCircle
              style={{ width: "40px", height: "40px" }}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1";
              }}
            />
            {isExpanded && (
              <div className="ms-3">
                <div className="fw-bold mb-0">{user.name}</div>
                <small className="text-muted">{user.role}</small>
              </div>
            )}
          </div>
          <div className="flex-grow-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="link"
                onClick={() => handleNavigation(item.path)}
                className={`d-flex align-items-center w-100 text-start px-3 py-2 border-0 ${
                  activeSection === item.path
                    ? "bg-primary text-white"
                    : "text-dark"
                }`}
                style={{ textDecoration: "none" }}
              >
                <item.icon size={20} />
                {isExpanded && <span className="ms-3">{item.label}</span>}
              </Button>
            ))}
          </div>
          <div className="p-3 border-top">
            <Button
              variant="link"
              className="d-flex align-items-center w-100 text-danger px-3 border-0"
              style={{ textDecoration: "none" }}
              onClick={() => handleNavigation("/")}
            >
              <FiLogOut size={20} />
              {isExpanded && <span className="ms-3">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
