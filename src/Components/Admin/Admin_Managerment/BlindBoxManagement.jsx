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
  getAllBlindBox,
  createBlindBox,
  updateBlindBoxbyId,
  deleteBlindBoxbyId,
} from "../../../APIHandler/BlindBoxAPIHandler";
import { getAllPackage } from "../../../APIHandler/PackageManagementAPIHanlder";
import {
  getAllBlindBoxImages,
  createBlindBoxImage,
  updateBlindBoxImage,
} from "../../../APIHandler/BlindBoxImageAPIHandler";

const BlindBoxManager = () => {
  const [blindBoxes, setBlindBoxes] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "blindBoxName",
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlindBox, setSelectedBlindBox] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [blindBoxImagesList, setBlindBoxImagesList] = useState({});

  const fetchBlindBoxes = async (page = currentPage) => {
    setLoading(true);
    try {
      const data = await getAllBlindBox(page, itemsPerPage);
      const blindBoxData = data.items || data || [];
      setBlindBoxes(blindBoxData);
      setTotalPages(
        data.totalPages || Math.ceil(data.totalCount / itemsPerPage) || 1
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blind boxes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlindBoxes();
  }, [currentPage]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackage();
        setPackages(data || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
    fetchPackages();
  }, []);

  const fetchBlindBoxImages = async (blindBoxId) => {
    try {
      const images = await getAllBlindBoxImages(blindBoxId);
      setBlindBoxImagesList((prev) => ({
        ...prev,
        [blindBoxId]: images,
      }));
    } catch (error) {
      console.error("Error fetching blind box images:", error);
    }
  };

  useEffect(() => {
    if (blindBoxes.length > 0) {
      blindBoxes.forEach((box) => {
        fetchBlindBoxImages(box.blindBoxId);
      });
    }
  }, [blindBoxes]);

  const handleSortButton = useCallback(() => {
    setSortConfig((prev) => {
      if (prev.key !== "blindBoxName") {
        return { key: "blindBoxName", direction: "ascending" };
      }
      return {
        key: "blindBoxName",
        direction: prev.direction === "ascending" ? "descending" : "ascending",
      };
    });
    setCurrentPage(1);
  }, []);

  const sortedBlindBoxes = useMemo(() => {
    let sortableBlindBoxes = [...blindBoxes];
    if (sortConfig.key === "blindBoxName") {
      sortableBlindBoxes.sort((a, b) => {
        const nameA = a.blindBoxName.toLowerCase();
        const nameB = b.blindBoxName.toLowerCase();
        if (sortConfig.direction === "ascending") {
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        }
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      });
    }
    return sortableBlindBoxes;
  }, [blindBoxes, sortConfig]);

  const filteredBlindBoxes = useMemo(() => {
    return sortedBlindBoxes.filter((box) =>
      Object.values(box).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedBlindBoxes, searchTerm]);

  const currentItems = filteredBlindBoxes;

  const renderSortIcon = () =>
    sortConfig.key === "blindBoxName" ? (
      sortConfig.direction === "ascending" ? (
        <FiArrowUp style={{ marginLeft: "5px" }} />
      ) : (
        <FiArrowDown style={{ marginLeft: "5px" }} />
      )
    ) : null;

  const validateForm = (data) => {
    const errors = {};
    if (!data.blindBoxName || data.blindBoxName.trim() === "") {
      errors.blindBoxName = "Blind box name is required";
    }
    // Add more validation as needed
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleAddBlindBox = useCallback(async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    if (!selectedPackage) {
      setFormErrors((prev) => ({
        ...prev,
        package: "Package is required",
      }));
      return;
    }

    setActionLoading(true);
    try {
      const updatedFormData = {
        ...formData,
        packageId: selectedPackage,
        blindBoxImages: formData.blindBoxImages,
        typeSell: formData.typeSell,
        size: formData.size,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        blindBoxStatus: formData.blindBoxStatus,
      };
      console.log("Sending data:", updatedFormData);
      await createBlindBox(updatedFormData);
      await fetchBlindBoxes(currentPage);
      setShowAddModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.message || "Failed to create blind box",
      });
    } finally {
      setActionLoading(false);
    }
  }, [formData, currentPage, selectedPackage]);

  const handleEditBlindBox = async () => {
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (!isValid) return;

    setActionLoading(true);
    try {
      await updateBlindBoxbyId(selectedBlindBox.blindBoxId, formData);
      await fetchBlindBoxes(currentPage);
      setShowEditModal(false);
      setFormData({});
      setFormErrors({});
    } catch (err) {
      setFormErrors({
        general: err.response?.data?.message || "Failed to update blind box",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBlindBox = async () => {
    setActionLoading(true);
    try {
      await deleteBlindBoxbyId(selectedBlindBox.blindBoxId);
      const newBlindBoxes = blindBoxes.filter(
        (box) => box.blindBoxId !== selectedBlindBox.blindBoxId
      );
      if (newBlindBoxes.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchBlindBoxes(currentPage);
        setShowDeleteModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete blind box");
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
                Blind Box Management
              </h1>
            </Col>
            <Col xs="auto">
              <Button
                style={{ background: "#4169e1", padding: "6px 12px" }}
                onClick={() => setShowAddModal(true)}
              >
                <FiPlus /> Add Blind Box
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
                  placeholder="Search blind boxes..."
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
            <Alert variant="info">No blind boxes found.</Alert>
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
                    <th>Package</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "#fff", color: "#333" }}>
                  {currentItems.map((box) => (
                    <tr
                      key={box.blindBoxId}
                      style={{ transition: "background-color 0.3s" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff5f2")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
                    >
                      <td>
                        {blindBoxImagesList[box.blindBoxId] &&
                        blindBoxImagesList[box.blindBoxId].length > 0 ? (
                          <img
                            src={blindBoxImagesList[box.blindBoxId][0].imageUrl}
                            alt={`${box.blindBoxName} - 1`}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <img
                            src={box.blindBoxImages}
                            alt={box.blindBoxName}
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </td>
                      <td>{box.blindBoxName}</td>
                      <td>
                        {
                          packages.find(
                            (pkg) => pkg.packageId === box.packageId
                          )?.packageName
                        }
                      </td>
                      <td>{box.typeSell}</td>
                      <td>{box.size}</td>
                      <td>{box.description}</td>
                      <td>{box.price}</td>
                      <td>{box.stock}</td>
                      <td>{box.blindBoxStatus}</td>
                      <td>
                        <Button
                          variant="link"
                          className="p-0 me-2"
                          style={{ color: "#5a9f68" }}
                          onClick={() => {
                            setSelectedBlindBox(box);
                            setFormData(box);
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
                            setSelectedBlindBox(box);
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
                    />
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <Pagination.Item
                          key={pageNum}
                          active={isActive}
                          onClick={() => setCurrentPage(pageNum)}
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
                    />
                  </Pagination>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Row>

      {/* Add Blind Box Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={{ background: "#4169e1" }}>
          <Modal.Title>Add New Blind Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Package</Form.Label>
              <Form.Control
                as="select"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                isInvalid={!!formErrors.package}
              >
                <option value="">Select a package</option>
                {packages
                  .filter((pkg) => pkg.typeSell === "BlindBox")
                  .map((pkg) => (
                    <option key={pkg.packageId} value={pkg.packageId}>
                      {pkg.packageName}
                    </option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.package}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Blind Box Name"
                value={formData.blindBoxName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, blindBoxName: e.target.value })
                }
                isInvalid={!!formErrors.blindBoxName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.blindBoxName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={formData.blindBoxImages || ""}
                onChange={(e) =>
                  setFormData({ ...formData, blindBoxImages: e.target.value })
                }
                isInvalid={!!formErrors.blindBoxImages}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.blindBoxImages}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                placeholder="Type"
                value={formData.typeSell || ""}
                onChange={(e) =>
                  setFormData({ ...formData, typeSell: e.target.value })
                }
                isInvalid={!!formErrors.typeSell}
              >
                <option value="">Select Type</option>
                <option value="BlindBox">BlindBox</option>
                <option value="LuckyWheel">LuckyWheel</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.typeSell}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                value={formData.size || ""}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                isInvalid={!!formErrors.size}
              >
                <option value="">Select Size</option>
                <option value="Medium">Medium</option>
                <option value="Small">Small</option>
                <option value="Large">Large</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.size}
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
                type="text"
                placeholder="Price"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                isInvalid={!!formErrors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
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
                as="select"
                value={formData.blindBoxStatus || ""}
                onChange={(e) =>
                  setFormData({ ...formData, blindBoxStatus: e.target.value })
                }
                isInvalid={!!formErrors.blindBoxStatus}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.blindBoxStatus}
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
            onClick={handleAddBlindBox}
            disabled={actionLoading}
          >
            {actionLoading ? <Spinner animation="border" size="sm" /> : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Blind Box Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ background: "#5a9f68" }}>
          <Modal.Title>Edit Blind Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <Alert variant="danger">{formErrors.general}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Package</Form.Label>
              <Form.Control
                as="select"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                isInvalid={!!formErrors.package}
              >
                <option value="">Select a package</option>
                {packages
                  .filter((pkg) => pkg.typeSell === "BlindBox")
                  .map((pkg) => (
                    <option key={pkg.packageId} value={pkg.packageId}>
                      {pkg.packageName}
                    </option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.package}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Blind Box Name"
                value={formData.blindBoxName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, blindBoxName: e.target.value })
                }
                isInvalid={!!formErrors.blindBoxName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.blindBoxName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={formData.blindBoxImages || ""}
                onChange={(e) =>
                  setFormData({ ...formData, blindBoxImages: e.target.value })
                }
                isInvalid={!!formErrors.blindBoxImages}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.blindBoxImages}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                placeholder="Type"
                value={formData.typeSell || ""}
                onChange={(e) =>
                  setFormData({ ...formData, typeSell: e.target.value })
                }
                isInvalid={!!formErrors.typeSell}
              >
                <option value="">Select Type</option>
                <option value="BlindBox">BlindBox</option>
                <option value="LuckyWheel">LuckyWheel</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.typeSell}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                placeholder="Size"
                value={formData.size || ""}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                isInvalid={!!formErrors.size}
              >
                <option value="">Select Size</option>
                <option value="Medium">Medium</option>
                <option value="Small">Small</option>
                <option value="Large">Large</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.size}
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
                type="text"
                placeholder="Price"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                isInvalid={!!formErrors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
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
                as="select"
                placeholder="Status"
                value={formData.blindBoxStatus || ""}
                onChange={(e) =>
                  setFormData({ ...formData, blindBoxStatus: e.target.value })
                }
                isInvalid={!!formErrors.blindBoxStatus}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.blindBoxStatus}
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
            onClick={handleEditBlindBox}
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
            Are you sure you want to delete "{selectedBlindBox?.blindBoxName}"?
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
            onClick={handleDeleteBlindBox}
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

export default BlindBoxManager;
