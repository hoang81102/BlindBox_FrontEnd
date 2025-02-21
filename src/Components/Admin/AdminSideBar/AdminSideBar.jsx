import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiPieChart,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { Button, Image } from "react-bootstrap";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  // Các mục navigation của sidebar
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "users", label: "User Management", icon: FiUsers },
    { id: "content", label: "Category Management", icon: FiFileText },
   
  ];

  const user = {
    name: "John Doe",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
  };

  // Tính toán chiều rộng sidebar dựa theo trạng thái mở/thu gọn
  const sidebarWidth = isExpanded ? "250px" : "80px";

  // Nội dung của sidebar với các chỉnh sửa căn lề
  const sidebarContent = (
    <div className="d-flex flex-column h-100">
      {/* Header: Avatar và thông tin người dùng */}
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

      {/* Navigation */}
      <div className="flex-grow-1">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant="link"
            onClick={() => handleNavigation(item.id)}
            className={`d-flex align-items-center w-100 text-start px-3 py-2 border-0 ${
              activeSection === item.id ? "bg-primary text-white" : "text-dark"
            }`}
            style={{ textDecoration: "none" }}
          >
            <item.icon size={20} />
            {isExpanded && <span className="ms-3">{item.label}</span>}
          </Button>
        ))}
      </div>

      {/* Footer: Nút Logout */}
      <div className="p-3 border-top">
        <Button
          variant="link"
          className="d-flex align-items-center w-100 text-danger px-3 border-0"
          style={{ textDecoration: "none" }}
        >
          <FiLogOut size={20} />
          {isExpanded && <span className="ms-3">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
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
      }}
    >
      {sidebarContent}
      <Button
        onClick={toggleSidebar}
        variant="light"
        className="position-absolute"
        style={{
          bottom: "20px",
          right: isExpanded ? "10px" : "-5px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
        aria-label="Toggle sidebar"
      >
        {isExpanded ? (
          <FiChevronLeft size={18} />
        ) : (
          <FiChevronRight size={18} />
        )}
      </Button>
    </aside>
  );
};

export default AdminSidebar;
