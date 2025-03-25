import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
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
import { format } from "date-fns";
import {
  getAllVouchers,
  createVoucher,
  updateVoucherById,
  deleteVoucherById,
} from "../../../APIHandler/VoucherAPIHandler";

const VoucherManager = () => {
  const [vouchers, setVouchers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "voucherName",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 7;

  const fetchVouchers = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await getAllVouchers(page, itemsPerPage);
      const voucherData = data.items || data || [];
      setVouchers(voucherData);
      setTotalPages(
        data.totalPages || Math.ceil(data.totalCount / itemsPerPage) || 1
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch vouchers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, [currentPage]);

  const handleSortButton = useCallback(() => {
    setSortConfig((prev) => {
      if (prev.key !== "voucherName") {
        return { key: "voucherName", direction: "ascending" };
      }
      return {
        key: "voucherName",
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
    setCurrentPage(1);
  }, []);

  const sortedVouchers = useMemo(() => {
    let sortableVouchers = [...vouchers];
    if (sortConfig.key === "voucherName") {
      sortableVouchers.sort((a, b) => {
        const nameA = a.voucherCode.toLowerCase();
        const nameB = b.voucherCode.toLowerCase();
        if (nameA < nameB) return sortConfig.direction === "ascending" ? -1 : 1;
        if (nameA > nameB) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableVouchers;
  }, [vouchers, sortConfig]);

  const filteredVouchers = useMemo(() => {
    return sortedVouchers.filter((voucher) =>
      Object.values(voucher).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedVouchers, searchTerm]);

  const currentItems = filteredVouchers;

  const renderSortIcon = () =>
    sortConfig.key === "voucherName" ? (
      sortConfig.direction === "ascending" ? (
        <FiArrowUp style={{ marginLeft: "5px" }} />
      ) : (
        <FiArrowDown style={{ marginLeft: "5px" }} />
      )
    ) : null;

  const validateForm = (data) => {
    const errors = {};
    if (!data.description || data.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (!data.discountMoney || data.discountMoney <= 0) {
      errors.discountMoney = "Discount must be greater than 0";
    }
    if (!data.quantity || data.quantity <= 0) {
      errors.quantity = "Quantity must be greater than 0";
    }
    if (!data.money || data.money <= 0) {
      errors.money = "Money must be greater than 0";
    }
    if (!data.startDate) {
      errors.startDate = "Start date is required";
    }
    if (!data.endDate) {
      errors.endDate = "End date is required";
    } else if (new Date(data.endDate) < new Date(data.startDate)) {
      errors.endDate = "End date must be after start date";
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleAddVoucher = useCallback(async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    setActionLoading(true);
    try {
      const updatedFormData = {
        ...formData,
      };
      const response = await createVoucher(updatedFormData);
      const newVoucher = response || {
        ...updatedFormData,
        voucherId: Date.now(),
      };
      setVouchers((prev) => [newVoucher, ...prev]);
      setShowAddModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.message || "Failed to create voucher",
      });
    } finally {
      setActionLoading(false);
    }
  }, [formData]);

  const handleEditVoucher = async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    setActionLoading(true);
    try {
      const updatedFormData = {
        ...formData,
      };
      console.log("Updated Form Data:", updatedFormData);
      const response = await updateVoucherById(
        selectedVoucher.voucherId,
        updatedFormData
      );
      const updatedVoucher = response || updatedFormData;
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.voucherId === selectedVoucher.voucherId
            ? updatedVoucher
            : voucher
        )
      );
      setShowEditModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      console.error("Error updating voucher:", err);
      setFormErrors({
        general: err.response?.data?.message || "Failed to update voucher",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteVoucher = async () => {
    setActionLoading(true);
    try {
      await deleteVoucherById(selectedVoucher.voucherId);
      setVouchers((prev) =>
        prev.filter(
          (voucher) => voucher.voucherId !== selectedVoucher.voucherId
        )
      );
      if (vouchers.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        setShowDeleteModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete voucher");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        paddingTop: "5rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        backgroundColor: "#FAFAFB",
      }}
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
                  padding: "5px",
                }}
              >
                Voucher Management
              </h1>
            </Col>
            <Col xs="auto">
              <Button
                style={{ background: "#4169e1", padding: "6px 12px" }}
                onClick={() => setShowAddModal(true)}
              >
                <FiPlus />
                Add Voucher
              </Button>
            </Col>
          </Row>

          <Row className="mb-4 align-items-center">
            <Col md={10}>
              <InputGroup>
                <InputGroup.Text
                  style={{
                    background: "linear-gradient(to right, #ff8153, #ffa98f)",
                  }}
                >
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search vouchers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button
                style={{
                  background: "linear-gradient(to right, #ff8153, #ffa98f)",
                  border: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "6px 12px",
                }}
                onClick={handleSortButton}
              >
                Sort by name{renderSortIcon()}
              </Button>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : currentItems.length === 0 ? (
            <Alert variant="info">No vouchers found.</Alert>
          ) : (
            <>
              <Table
                responsive
                bordered
                hover
                className="shadow-sm"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Discount</th>
                    <th>Quantity</th>
                    <th>Condition Money</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((voucher) => (
                    <tr
                      key={voucher.voucherId}
                      style={{ transition: "background-color 0.3s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff5f2")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
                    >
                      <td>{voucher.voucherCode}</td>
                      <td>{voucher.description}</td>
                      <td>{voucher.discountMoney}</td>
                      <td>{voucher.quantity}</td>
                      <td>{voucher.money}</td>
                      <td>
                        {voucher.startDate
                          ? format(new Date(voucher.startDate), "dd/MM/yyyy")
                          : "N/A"}
                      </td>
                      <td>
                        {voucher.endDate
                          ? format(new Date(voucher.endDate), "dd/MM/yyyy")
                          : "N/A"}
                      </td>
                      <td>
                        <Button
                          variant="link"
                          className="p-0 me-2"
                          style={{ color: "#5a9f68" }}
                          onClick={() => {
                            setSelectedVoucher(voucher);
                            setFormData(voucher);
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
                            setSelectedVoucher(voucher);
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
                  <Pagination style={{ display: "flex", alignItems: "center" }}>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      style={{
                        background:
                          "linear-gradient(to right, #ff8153, #ffa98f) !important",
                        border: "none !important",
                        color: "white !important",
                        opacity: currentPage === 1 ? 0.5 : 1,
                        transition: "opacity 0.3s",
                        padding: "5px 10px",
                        marginRight: "5px",
                        borderRadius: "8px !important",
                      }}
                    />
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <Pagination.Item
                          key={pageNum}
                          active={isActive}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            background: isActive
                              ? "linear-gradient(to right, #ff8153, #ffa98f) !important"
                              : "#fff !important",
                            color: isActive
                              ? "white !important"
                              : "#ff8153 !important",
                            border: isActive
                              ? "none !important"
                              : "1px solid #ff8153 !important",
                            transition: "all 0.3s",
                            margin: "0 2px",
                            padding: "5px 10px",
                            borderRadius: "8px !important",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.target.style.background =
                                "linear-gradient(to right, #ffa98f, #ff8153) !important";
                              e.target.style.color = "white !important";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.target.style.background = "#fff !important";
                              e.target.style.color = "#ff8153 !important";
                            }
                          }}
                        >
                          {pageNum}
                        </Pagination.Item>
                      );
                    })}
                    <Pagination.Next
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      style={{
                        background:
                          "linear-gradient(to right, #ff8153, #ffa98f) !important",
                        border: "none !important",
                        color: "white !important",
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        transition: "opacity 0.3s",
                        padding: "5px 10px",
                        marginLeft: "5px",
                        borderRadius: "8px !important",
                      }}
                    />
                  </Pagination>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Row>

      {/* Add Voucher Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={{ background: "#4169e1" }}>
          <Modal.Title>Add New Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            style={{
              background: "linear-gradient(to right, #ff8153, #ffa98f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "20px",
            }}
          >
            Add New Voucher
          </p>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Quantity"
                value={formData.quantity || ""}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                isInvalid={!!formErrors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Discount Money"
                value={formData.discountMoney || ""}
                onChange={(e) =>
                  setFormData({ ...formData, discountMoney: e.target.value })
                }
                isInvalid={!!formErrors.discountMoney}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.discountMoney}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Money"
                value={formData.money || ""}
                onChange={(e) =>
                  setFormData({ ...formData, money: e.target.value })
                }
                isInvalid={!!formErrors.money}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.money}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                placeholder="Start Date"
                value={formData.startDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                isInvalid={!!formErrors.startDate}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.startDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                placeholder="End Date"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                isInvalid={!!formErrors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.endDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddModal(false)}
            style={{ padding: "6px 12px" }}
          >
            Close
          </Button>
          <Button
            style={{ background: "#4169e1", padding: "6px 12px" }}
            onClick={handleAddVoucher}
            disabled={actionLoading}
          >
            {actionLoading ? <Spinner animation="border" size="sm" /> : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Voucher Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ background: "#5a9f68" }}>
          <Modal.Title>Edit Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={formData.quantity || ""}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                isInvalid={!!formErrors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                isInvalid={!!formErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Discount"
                value={formData.discountMoney || ""}
                onChange={(e) =>
                  setFormData({ ...formData, discountMoney: e.target.value })
                }
                isInvalid={!!formErrors.discountMoney}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.discountMoney}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Money"
                value={formData.money || ""}
                onChange={(e) =>
                  setFormData({ ...formData, money: e.target.value })
                }
                isInvalid={!!formErrors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.money}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                placeholder="Start Date"
                value={formData.startDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                isInvalid={!!formErrors.startDate}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.startDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                placeholder="End Date"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                isInvalid={!!formErrors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.endDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            style={{ padding: "6px 12px" }}
          >
            Cancel
          </Button>
          <Button
            style={{
              border: "#ffffff",
              background: "#5a9f68",
              padding: "6px 12px",
            }}
            onClick={handleEditVoucher}
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
          <p>
            Are you sure you want to delete "{selectedVoucher?.voucherName}"?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            style={{ padding: "6px 12px" }}
          >
            Cancel
          </Button>
          <Button
            style={{
              border: "#ffffff",
              background: "#dc143c",
              padding: "6px 12px",
            }}
            onClick={handleDeleteVoucher}
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

export default VoucherManager;
