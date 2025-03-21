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
  getAllCategory,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../../../APIHandler/CategoryManagerAPIHandler";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "categoryName",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 7;

  const fetchCategories = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await getAllCategory(page, itemsPerPage);
      const categoryData = data.items || data || [];
      setCategories(categoryData);
      setTotalPages(
        data.totalPages || Math.ceil(data.totalCount / itemsPerPage) || 1
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handleSortButton = useCallback(() => {
    setSortConfig((prev) => {
      if (prev.key !== "categoryName") {
        return { key: "categoryName", direction: "ascending" };
      }
      return {
        key: "categoryName",
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
    setCurrentPage(1);
  }, []);

  const sortedCategories = useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig.key === "categoryName") {
      sortableCategories.sort((a, b) => {
        const nameA = a.categoryName.toLowerCase();
        const nameB = b.categoryName.toLowerCase();
        if (nameA < nameB) return sortConfig.direction === "ascending" ? -1 : 1;
        if (nameA > nameB) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableCategories;
  }, [categories, sortConfig]);

  const filteredCategories = useMemo(() => {
    return sortedCategories.filter((category) =>
      Object.values(category).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedCategories, searchTerm]);

  const currentItems = filteredCategories;

  const renderSortIcon = () =>
    sortConfig.key === "categoryName" ? (
      sortConfig.direction === "ascending" ? (
        <FiArrowUp style={{ marginLeft: "5px" }} />
      ) : (
        <FiArrowDown style={{ marginLeft: "5px" }} />
      )
    ) : null;

  const validateForm = (data) => {
    const errors = {};
    if (!data.categoryName || data.categoryName.trim() === "") {
      errors.categoryName = "Category name is required";
    }
    if (!data.categoryImage || data.categoryImage.trim() === "") {
      errors.categoryImage = "Image URL is required";
    }
    if (!data.typeSell || data.typeSell.trim() === "") {
      errors.typeSell = "Type Sell is required";
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleAddCategory = useCallback(async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    setActionLoading(true);
    try {
      const currentTime = new Date().toISOString();
      const updatedFormData = {
        ...formData,
        createdAt: currentTime,
      };
      const response = await createCategory(updatedFormData);
      const newCategory = response || {
        ...updatedFormData,
        categoryId: Date.now(),
      };
      setCategories((prev) => [newCategory, ...prev]);
      setShowAddModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.message || "Failed to create category",
      });
    } finally {
      setActionLoading(false);
    }
  }, [formData]);

  const handleEditCategory = async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    setActionLoading(true);
    try {
      const updatedFormData = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      setCategories((prev) =>
        prev.map((category) =>
          category.categoryId === selectedCategory.categoryId
            ? updatedFormData
            : category
        )
      );
      await updateCategoryById(selectedCategory.categoryId, updatedFormData);
      setShowEditModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.message || "Failed to update category",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    setActionLoading(true);
    try {
      await deleteCategoryById(selectedCategory.categoryId);
      setCategories((prev) =>
        prev.filter(
          (category) => category.categoryId !== selectedCategory.categoryId
        )
      );
      if (categories.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        setShowDeleteModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");
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
                Category Management
              </h1>
            </Col>
            <Col xs="auto">
              <Button
                style={{ background: "#4169e1", padding: "6px 12px" }}
                onClick={() => setShowAddModal(true)}
              >
                <FiPlus />
                Add Category
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
                  placeholder="Search categories..."
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
            <Alert variant="info">No categories found.</Alert>
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
                    <th>Type Sell</th>
                    <th>Create Date</th>
                    <th>Update Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((category) => (
                    <tr
                      key={category.categoryId}
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
                          src={category.categoryImage}
                          alt={category.categoryName}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{category.categoryName}</td>
                      <td>{category.typeSell}</td>
                      <td>
                        {category.createdAt
                          ? format(new Date(category.createdAt), "MM, dd, yyyy")
                          : "N/A"}
                      </td>
                      <td>
                        {category.updatedAt
                          ? format(new Date(category.updatedAt), "MM, dd, yyyy")
                          : "N/A"}
                      </td>
                      <td>
                        <Button
                          variant="link"
                          className="p-0 me-2"
                          style={{ color: "#5a9f68" }}
                          onClick={() => {
                            setSelectedCategory(category);
                            setFormData(category);
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
                            setSelectedCategory(category);
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

      {/* Add Category Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={{ background: "#4169e1" }}>
          <Modal.Title>Add New Category</Modal.Title>
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
            Add New Category
          </p>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Category Name"
                value={formData.categoryName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                isInvalid={!!formErrors.categoryName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.categoryName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={formData.categoryImage || ""}
                onChange={(e) =>
                  setFormData({ ...formData, categoryImage: e.target.value })
                }
                isInvalid={!!formErrors.categoryImage}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.categoryImage}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type Sell"
                value={formData.typeSell || ""}
                onChange={(e) =>
                  setFormData({ ...formData, typeSell: e.target.value })
                }
                isInvalid={!!formErrors.typeSell}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.typeSell}
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
            onClick={handleAddCategory}
            disabled={actionLoading}
          >
            {actionLoading ? <Spinner animation="border" size="sm" /> : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ background: "#5a9f68" }}>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <p
                style={{
                  background: "linear-gradient(to right, #ff8153, #ffa98f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "20px",
                }}
              >
                Change Category Name
              </p>
              <Form.Control
                type="text"
                placeholder="Category Name"
                value={formData.categoryName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                isInvalid={!!formErrors.categoryName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.categoryName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={formData.categoryImage || ""}
                onChange={(e) =>
                  setFormData({ ...formData, categoryImage: e.target.value })
                }
                isInvalid={!!formErrors.categoryImage}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.categoryImage}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type Sell"
                value={formData.typeSell || ""}
                onChange={(e) =>
                  setFormData({ ...formData, typeSell: e.target.value })
                }
                isInvalid={!!formErrors.typeSell}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.typeSell}
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
            onClick={handleEditCategory}
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
            Are you sure you want to delete "{selectedCategory?.categoryName}"?
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
            onClick={handleDeleteCategory}
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
export default CategoryManager;
