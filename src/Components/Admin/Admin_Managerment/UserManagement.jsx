import { useState, useEffect, useMemo, useCallback } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiArrowUp,
  FiArrowDown,
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
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
import UserService from "../../../Services/UserService";

const UserManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const userService = new UserService(
    setAccounts,
    setTotalPages,
    setLoading,
    setError,
    setActionLoading
  );

  useEffect(() => {
    userService.fetchAccounts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const filteredAccounts = useMemo(
    () => userService.filterAccounts(accounts, searchTerm),
    [accounts, searchTerm]
  );

  const handleSortButton = useCallback(() => {
    setSortConfig((prev) => {
      if (prev.key !== "createdAt") {
        return { key: "createdAt", direction: "descending" };
      }
      return {
        key: "createdAt",
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
    setCurrentPage(1);
  }, []);

  const sortedAccounts = useMemo(() => {
    return userService.sortAccounts(filteredAccounts, sortConfig.direction);
  }, [filteredAccounts, sortConfig]);

  const gradientStyle = {
    background: "linear-gradient(to right, #ff8153, #ffa98f)",
    border: "none",
    color: "white",
  };


  const handleEditAccount = useCallback(async () => {
    const { isValid, errors } = userService.validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;
    await userService.handleEditAccount(
      selectedAccount,
      formData,
      currentPage,
      itemsPerPage,
      setShowEditModal,
      setFormData
    );
    setFormErrors({});
  }, [formData, selectedAccount, currentPage, itemsPerPage, userService]);

  const renderPaginationItems = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    return [...Array(endPage - startPage + 1)].map((_, idx) => {
      const pageNum = startPage + idx;
      const isActive = pageNum === currentPage;
      return (
        <Pagination.Item
          key={pageNum}
          active={isActive}
          onClick={() => setCurrentPage(pageNum)}
          style={{
            margin: "0 2px",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          {pageNum}
        </Pagination.Item>
      );
    });
  };

  return (
    <Container
      fluid
      className="min-vh-100 pt-lg-5 px-5"
      style={{ backgroundColor: "#FAFAFB" }}
    >
      <Row>
        <Container>
          <Row className="mb-4 align-items-center">
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
          </Row>

          <Row className="mb-4 align-items-center">
            <Col md={10}>
              <InputGroup>
                <InputGroup.Text style={gradientStyle}>
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button
                style={gradientStyle}
                onClick={handleSortButton}
                className="w-100"
              >
                Sort by Date{" "}
                {sortConfig.direction === "descending" ? (
                  <FiArrowUp />
                ) : (
                  <FiArrowDown />
                )}
              </Button>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : sortedAccounts.length === 0 ? (
            <Alert variant="info">No accounts found.</Alert>
          ) : (
            <>
              <Table
                responsive
                bordered
                hover
                className="shadow-sm text-center"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Created</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAccounts.map((account) => (
                    <tr key={account.id}>
                      <td>{account.fullName}</td>
                      <td>{account.email}</td>
                      <td>{account.phoneNumber}</td>
                      <td>{account.address}</td>
                      <td>
                        {account.createAt
                          ? format(new Date(account.createAt), "MMM dd, yyyy")
                          : "N/A"}
                      </td>
                      <td>{account.role}</td>
                      <td>
                        <Button
                          variant="link"
                          className="p-0 me-2"
                          style={{ color: "#5a9f68" }}
                          onClick={() => {
                            setSelectedAccount(account);
                            setFormData(account);
                            setShowEditModal(true);
                          }}
                        >
                          <FiEdit2 />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0"
                          style={{ color: "#dc143c" }}
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
              <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                      }}
                    />
                    {renderPaginationItems()}
                    <Pagination.Next
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      style={{
                        padding: "5px 10px",
                        marginLeft: "5px",
                      }}
                    />
                  </Pagination>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Row>

      {/* Edit Account Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton style={gradientStyle}>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={formData.fullName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                isInvalid={!!formErrors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                placeholder="Phone"
                value={formData.phoneNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                isInvalid={!!formErrors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                value={formData.address || ""}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                isInvalid={!!formErrors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control.Feedback type="invalid">
                {formErrors.role}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#5a9f68" }}
            onClick={handleEditAccount}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ background: "#dc143c" }}>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ background: "#dc143c" }}
            
            disabled={actionLoading}
          >
            {actionLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;
