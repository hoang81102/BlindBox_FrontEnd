import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import SidebarAdmin from "../Components/Admin/SidebarAdmin/SidebarAdmin";

const AdminSidebarLayout = () => {
  return (
    <>
      <div>
        <Container
          className=""
          style={{
            marginTop: "10rem",
            marginBottom: "5rem",
            maxWidth: "1440px",
          }}
        >
          <Row
            className="g-0"
            style={{
              border: "1px solid #e7e7e7",
              background: "#f9f9f9",
              borderRadius: "15px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Col md={3}>
              <SidebarAdmin />
            </Col>
            <Col md={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminSidebarLayout;
