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
import {
  getAllPackages,
  createPackage,
  updatePackageById,
  deletePackageById,
} from "../../../APIHandler/PackageManagementAPIHanlder";
import { getAllCategories } from "../../../APIHandler/CategoryManagerAPIHandler";
const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "packageName",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchPackages = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await getAllPackages(page, itemsPerPage);
      const packageData = data.items || data || [];
      console.log("Fetched packages:", packageData);
      setPackages(packageData);
      setTotalPages(
        data.totalPages || Math.ceil(data.totalCount / itemsPerPage) || 1
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch packages");
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data || []);
        console.log("Fetched categories:", data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSortButton = useCallback(() => {
    setSortConfig((prev) => {
      if (prev.key !== "packageName") {
        return { key: "packageName", direction: "ascending" };
      }
      return {
        key: "packageName",
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
    setCurrentPage(1);
  }, []);

  const sortedPackages = useMemo(() => {
    let sortablePackages = [...packages];
    if (sortConfig.key === "packageName") {
      sortablePackages.sort((a, b) => {
        const nameA = a.packageName.toLowerCase();
        const nameB = b.packageName.toLowerCase();
        if (sortConfig.direction === "ascending") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        }
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      });
    }
    return sortablePackages;
  }, [packages, sortConfig]);

  const filteredPackages = useMemo(() => {
    return sortedPackages.filter((pkg) =>
      Object.values(pkg).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedPackages, searchTerm]);

  const currentItems = filteredPackages;

  const renderSortIcon = () =>
    sortConfig.key === "packageName" ? (
      sortConfig.direction === "ascending" ? (
        <FiArrowUp style={{ marginLeft: "5px" }} />
      ) : (
        <FiArrowDown style={{ marginLeft: "5px" }} />
      )
    ) : null;

  const validateForm = (data) => {
    const errors = {};
    if (!data.packageName || data.packageName.trim() === "") {
      errors.packageName = "Package name is required";
    }
    if (
      !data.packagePrice ||
      isNaN(data.packagePrice) ||
      data.packagePrice < 0
    ) {
      errors.packagePrice = "Valid non-negative package price is required";
    }
    if (!data.description || data.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (!data.stock || isNaN(data.stock) || data.stock < 0) {
      errors.stock = "Valid non-negative stock is required";
    }
    if (!data.amount || isNaN(data.amount) || data.amount < 0) {
      errors.amount = "Valid non-negative amount is required";
    }
    if (!data.packageStatus || data.packageStatus.trim() === "") {
      errors.packageStatus = "Package status is required";
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleAddPackage = useCallback(async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    if (!selectedCategory) {
      setFormErrors((prev) => ({
        ...prev,
        category: "Category is required",
      }));
      return;
    }

    setActionLoading(true);
    try {
      const updatedFormData = {
        ...formData,
        categoryId: selectedCategory,
        categoryImage: categories.find(
          (category) => category.categoryId === selectedCategory
        ).categoryImage,
        packagePrice: Number(formData.packagePrice),
        stock: Number(formData.stock),
        amount: Number(formData.amount),
        createdAt: new Date().toISOString(),
      };
      await createPackage(updatedFormData);
      await fetchPackages(currentPage);
      setShowAddModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.message || "Failed to create package",
      });
    } finally {
      setActionLoading(false);
    }
  }, [formData, currentPage, selectedCategory]);

  const handleEditPackage = async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    setActionLoading(true);
    try {
      const updatedFormData = {
        ...formData,
        packagePrice: Number(formData.packagePrice),
        stock: Number(formData.stock),
        amount: Number(formData.amount),
        updatedAt: new Date().toISOString(),
      };
      await updatePackageById(selectedPackage.packageId, updatedFormData);
      await fetchPackages(currentPage);
      setShowEditModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.message || "Failed to update package",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePackage = async () => {
    setActionLoading(true);
    try {
      await deletePackageById(selectedPackage.packageId);
      const newPackages = packages.filter(
        (pkg) => pkg.packageId !== selectedPackage.packageId
      );
      if (newPackages.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchPackages(currentPage);
        setShowDeleteModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete package");
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
                Package Management
              </h1>
            </Col>
            <Col xs="auto">
              <Button
                style={{ background: "#4169e1", padding: "6px 12px" }}
                onClick={() => setShowAddModal(true)}
              >
                <FiPlus /> Add Package
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
                  placeholder="Search packages..."
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
                Sort by name {renderSortIcon()}
              </Button>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : currentItems.length === 0 ? (
            <Alert variant="info">No packages found.</Alert>
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
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "#fff", color: "#333" }}>
                  {currentItems.map((pkg) => {
                    const category = categories.find(
                      (cat) => cat.categoryId === pkg.categoryId
                    );
                    return (
                      <tr
                        key={pkg.packageId}
                        style={{ transition: "background-color 0.3s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#fff5f2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#fff")
                        }
                      >
                        <td>
                          <img
                            src={category?.categoryImage}
                            alt={category?.categoryName}
                            style={{ width: "100px", height: "auto" }}
                          />
                        </td>
                        <td>{pkg.packageName}</td>
                        <td>{category?.categoryName}</td>
                        <td>{pkg.packagePrice}</td>
                        <td>{pkg.description}</td>
                        <td>{pkg.stock}</td>
                        <td>{pkg.amount}</td>
                        <td>{pkg.packageStatus}</td>
                        <td>
                          <Button
                            variant="link"
                            className="p-0 me-2"
                            style={{ color: "#5a9f68" }}
                            onClick={() => {
                              setSelectedPackage(pkg);
                              setFormData(pkg);
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
                              setSelectedPackage(pkg);
                              setShowDeleteModal(true);
                            }}
                          >
                            <FiTrash2 />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
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

      {/* Add Package Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={{ background: "#4169e1" }}>
          <Modal.Title>Add New Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                isInvalid={!!formErrors.category}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Package Name"
                value={formData.packageName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, packageName: e.target.value })
                }
                isInvalid={!!formErrors.packageName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.packageName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Package Price"
                value={formData.packagePrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    packagePrice: e.target.value,
                  })
                }
                isInvalid={!!formErrors.packagePrice}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.packagePrice}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
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
                placeholder="Stock"
                value={formData.stock || ""}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                isInvalid={!!formErrors.stock}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.stock}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Amount"
                value={formData.amount || ""}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                isInvalid={!!formErrors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.amount}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Package Status"
                value={formData.packageStatus || ""}
                onChange={(e) =>
                  setFormData({ ...formData, packageStatus: e.target.value })
                }
                isInvalid={!!formErrors.packageStatus}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.packageStatus}
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
            onClick={handleAddPackage}
            disabled={actionLoading}
          >
            {actionLoading ? <Spinner animation="border" size="sm" /> : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Package Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ background: "#5a9f68" }}>
          <Modal.Title>Edit Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Package Name"
                value={formData.packageName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, packageName: e.target.value })
                }
                isInvalid={!!formErrors.packageName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.packageName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Package Price"
                value={formData.packagePrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    packagePrice: e.target.value,
                  })
                }
                isInvalid={!!formErrors.packagePrice}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.packagePrice}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
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
                placeholder="Stock"
                value={formData.stock || ""}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                isInvalid={!!formErrors.stock}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.stock}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Amount"
                value={formData.amount || ""}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                isInvalid={!!formErrors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.amount}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Package Status"
                value={formData.packageStatus || ""}
                onChange={(e) =>
                  setFormData({ ...formData, packageStatus: e.target.value })
                }
                isInvalid={!!formErrors.packageStatus}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.packageStatus}
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
            onClick={handleEditPackage}
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
            Are you sure you want to delete "{selectedPackage?.packageName}"?
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
            onClick={handleDeletePackage}
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

export default PackageManager;
