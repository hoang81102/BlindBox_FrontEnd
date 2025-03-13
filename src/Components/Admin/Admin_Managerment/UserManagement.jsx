import { useState, useContext, useEffect } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { format } from "date-fns";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
  InputGroup,
} from "react-bootstrap";

const UserManagement = () => {
  // Trạng thái cho các modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Giả sử bạn có một mảng các tài khoản
  const accounts = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@example.com",
      phone: "0123456789",
      address: "Hà Nội",
      dateCreated: new Date(),
    },
    
  ];

  return (
    <Container
      fluid
      className="min-vh-100 pt-lg-5 px-5 "
      style={{ backgroundColor: "#FAFAFB" }}
    >
      <Row>
        <Container>
          <Row className="mb-4 align-items-center ">
            <Col>
              <h1
                style={{
                  background: "linear-gradient(to right, #ff8153, #ffa98f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "28px",
                  fontWeight: 600,
                }}
              >
                Account Management
              </h1>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                style={{ backgroundColor: "#FB6F92", borderColor: "#FFAFCC" }}
                onClick={() => setShowAddModal(true)}
              >
                <FiPlus className="me-2" /> Add Account
              </Button>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <InputGroup>
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Search accounts..." />
              </InputGroup>
            </Col>
          </Row>

          <Table responsive bordered hover className="shadow-sm text-center">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.phone}</td>
                  <td>{account.address}</td>
                  <td>{format(account.dateCreated, "MMM dd, yyyy")}</td>
                  <td>
                    <Button
                      variant="link"
                      className="p-0 me-2"
                      style={{ color: "#33FF00" }}
                      onClick={() => {
                        setSelectedAccount(account);
                        setShowEditModal(true);
                      }}
                    >
                      <FiEdit2 />
                    </Button>
                    <Button
                      variant="link"
                      className="p-0"
                      style={{ color: "#FF0000" }}
                      onClick={() => {
                        setSelectedAccount(account);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FiTrash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Row>

      {/* Add Account Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="tel" placeholder="Phone" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Address" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#FB6F92", borderColor: "#FFAFCC" }}
          >
            Add Account
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Account Modal */}
      <Modal
        show={showEditModal}
        onClick={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="tel" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "#33FF00", borderColor: "#33FF00" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onClick={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the account for{" "}
          {selectedAccount?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            style={{ backgroundColor: "#FF0000", borderColor: "#FF0000" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;
