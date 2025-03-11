import { useState } from "react";
import {
  FiBarChart2,
  FiUsers,
  FiFolder,
  FiTag,
  FiBox,
  FiMessageSquare,
  FiLogOut,
} from "react-icons/fi";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Revenue Dashboard", path: "/admin/revenue", icon: FiBarChart2 },
    { name: "User Management", path: "/admin/users", icon: FiUsers },
    { name: "Category Management", path: "/admin/category", icon: FiFolder },
    { name: "Voucher Management", path: "/admin/voucher", icon: FiTag },
    { name: "Product Management", path: "/admin/product", icon: FiBox },
    {
      name: "Feedback Management",
      path: "/admin/feedback",
      icon: FiMessageSquare,
    },
  ];

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      {/* Sidebar cố định */}
      <Navbar
        bg="dark"
        variant="dark"
        className="d-flex flex-column vh-100 p-3"
        style={{ width: "250px", position: "fixed", left: 0, top: 0 }}
      >
        <Navbar.Brand className="mb-3 text-white fw-semibold">
          Admin Panel
        </Navbar.Brand>

        {/* Menu */}
        <Nav className="flex-column w-100">
          {menuItems.map((item) => (
            <Nav.Link
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`d-flex align-items-center p-2 rounded ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-white hover-bg-secondary"
              }`}
            >
              <item.icon className="me-2" />
              <span>{item.name}</span>
            </Nav.Link>
          ))}
        </Nav>

        {/* Logout */}
        <Button
          variant="danger"
          onClick={() => setShowLogoutModal(true)}
          className="mt-auto w-100 d-flex align-items-center justify-content-center"
        >
          <FiLogOut className="me-2" />
          Logout
        </Button>
      </Navbar>

      {/* Modal Logout */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminSidebar;
