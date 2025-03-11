import { useState, useCallback, useMemo } from "react";
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
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      dateCreated: new Date("2024-01-15"),
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Town, State 67890",
      dateCreated: new Date("2024-01-10"),
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "dateCreated",
    direction: "desc",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const sortedAccounts = useMemo(() => {
    const sorted = [...accounts];
    sorted.sort((a, b) => {
      if (sortConfig.key === "dateCreated") {
        return sortConfig.direction === "asc"
          ? a.dateCreated - b.dateCreated
          : b.dateCreated - a.dateCreated;
      }
      return sortConfig.direction === "asc"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });
    return sorted;
  }, [accounts, sortConfig]);

  const filteredAccounts = useMemo(() => {
    return sortedAccounts.filter((account) =>
      Object.values(account).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedAccounts, searchTerm]);

  const handleAddAccount = () => {
    setAccounts([
      ...accounts,
      {
        ...newAccount,
        id: accounts.length + 1,
        dateCreated: new Date(),
        status: "active",
      },
    ]);
    setShowAddModal(false);
    setNewAccount({ name: "", email: "", phone: "", address: "" });
  };

  const handleEditAccount = () => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === selectedAccount.id ? selectedAccount : acc
      )
    );
    setShowEditModal(false);
    setSelectedAccount(null);
  };

  const handleDeleteAccount = () => {
    setAccounts(accounts.filter((acc) => acc.id !== selectedAccount.id));
    setShowDeleteModal(false);
    setSelectedAccount(null);
  };

  const SortButton = ({ column }) => {
    const isActive = sortConfig.key === column;
    return (
      <Button
        variant="link"
        onClick={() => handleSort(column)}
        className="p-0 ms-2"
      >
        {isActive ? (
          sortConfig.direction === "asc" ? (
            <FiChevronUp size={16} />
          ) : (
            <FiChevronDown size={16} />
          )
        ) : (
          <>
            <FiChevronUp size={12} className="d-block" />
            <FiChevronDown size={12} className="d-block mt-n2" />
          </>
        )}
      </Button>
    );
  };

  return (
    <Container
      fluid
      className="py-4 min-vh-100 pt-lg-5"
      style={{ backgroundColor: "#FAFAFB" }}
    >
      <Row>
        <Col md={2}></Col>
        <Col md={10}>
          <Container>
            <Row className="mb-4 align-items-center pt-lg4">
              <Col>
                <h1
                  style={{
                    color: "#1B263B",
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
                  onClick={() => setShowAddModal(true)}
                  style={{ backgroundColor: "#FFAFCC", borderColor: "#FFAFCC" }}
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
                  <Form.Control
                    type="text"
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>

            <Table responsive bordered hover className="shadow-sm">
              <thead className="bg-light">
                <tr>
                  <th>
                    Name <SortButton column="name" />
                  </th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>
                    Created <SortButton column="dateCreated" />
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>{account.phone}</td>
                    <td>{account.address}</td>
                    <td>{format(account.dateCreated, "MMM dd, yyyy")}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedAccount(account);
                          setShowEditModal(true);
                        }}
                        className="p-0 me-2"
                        style={{ color: "#FFAFCC" }}
                      >
                        <FiEdit2 />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedAccount(account);
                          setShowDeleteModal(true);
                        }}
                        className="p-0"
                        style={{ color: "#FF4C4C" }}
                      >
                        <FiTrash2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>

      {/* Add Account Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={newAccount.email}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                placeholder="Phone"
                value={newAccount.phone}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                value={newAccount.address}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, address: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddAccount}
            style={{ backgroundColor: "#FFAFCC", borderColor: "#FFAFCC" }}
          >
            Add Account
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Account Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={selectedAccount?.name}
                onChange={(e) =>
                  setSelectedAccount({
                    ...selectedAccount,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                value={selectedAccount?.email}
                onChange={(e) =>
                  setSelectedAccount({
                    ...selectedAccount,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                value={selectedAccount?.phone}
                onChange={(e) =>
                  setSelectedAccount({
                    ...selectedAccount,
                    phone: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={selectedAccount?.address}
                onChange={(e) =>
                  setSelectedAccount({
                    ...selectedAccount,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleEditAccount}
            style={{ backgroundColor: "#FFAFCC", borderColor: "#FFAFCC" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
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
            onClick={handleDeleteAccount}
            style={{ backgroundColor: "#FF4C4C", borderColor: "#FF4C4C" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;
