import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";
import {
  getRevenueByDay,
  getRevenueByMonth,
  getRevenueByYear,
} from "../../../APIHandler/RevenueAPIHandler";
import * as XLSX from "xlsx";

const RevenueManagement = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDailyRevenue = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await getRevenueByDay({
        startDate: startDate,
        endDate: endDate,
      });
      setRevenueData(data);
      setError(null);
    } catch (err) {
      setError("Unable to load daily revenue data");
    } finally {
      setLoading(false);
    }
  };

  const handleMonthlyRevenue = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await getRevenueByMonth({
        year: selectedYear,
      });
      setRevenueData(data);
      setError(null);
    } catch (err) {
      setError("Unable to load monthly revenue data");
    } finally {
      setLoading(false);
    }
  };

  const handleYearRevenue = async () => {
    try {
      setLoading(true);
      const data = await getRevenueByYear();
      setRevenueData(data);
      setError(null);
    } catch (err) {
      setError("Unable to load yearly revenue data");
    } finally {
      setLoading(false);
    }
  };

  // Thêm hàm xuất Excel
  const exportToExcel = () => {
    try {
      // Kiểm tra nếu không có dữ liệu
      if (!revenueData || revenueData.length === 0) {
        setError("No data to export");
        return;
      }

      // Định dạng lại dữ liệu cho Excel
      const excelData = revenueData.map((item) => ({
        Date: item.date,
        "Total Revenue": `$${item.totalRevenue}`,
        "Total Orders": item.totalOrders,
      }));

      // Tạo workbook mới
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Revenue Data");

      // Tạo tên file với timestamp
      const fileName = `revenue_report_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      // Xuất file
      XLSX.writeFile(workbook, fileName);
    } catch (err) {
      setError("Failed to export Excel file");
      console.error("Export error:", err);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Revenue Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Row className="g-4">
        {/* Daily Revenue */}
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-calendar-date me-2"></i>Daily Revenue
              </Card.Title>
              <Form className="mt-4" onSubmit={handleDailyRevenue}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 btn-primary"
                  disabled={loading}
                >
                  <i className="bi bi-search me-2"></i>
                  {loading ? "Loading..." : "Search"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Monthly Revenue */}
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-calendar-month me-2"></i>Monthly Revenue
              </Card.Title>
              <Form className="mt-4" onSubmit={handleMonthlyRevenue}>
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    min="1900"
                    max="2100"
                    placeholder="Example: 2024"
                    required
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 btn-primary"
                  disabled={loading}
                >
                  <i className="bi bi-search me-2"></i>
                  {loading ? "Loading..." : "View Revenue"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Annual Revenue */}
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <Card.Title>
                <i className="bi bi-calendar-year me-2"></i>Annual Revenue
              </Card.Title>
              <p className="text-muted mt-4">
                View complete year revenue report
              </p>
              <Button
                className="w-100 btn-primary"
                onClick={handleYearRevenue}
                disabled={loading}
              >
                <i className="bi bi-graph-up me-2"></i>
                {loading ? "Loading..." : "Get Annual Revenue"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Revenue Table */}
      <Card className="mt-5 border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Card.Title>Revenue Data</Card.Title>
            <Button
              variant="outline-primary"
              onClick={exportToExcel}
              disabled={loading || !revenueData || revenueData.length === 0}
            >
              <i className="bi bi-file-earmark-excel me-2"></i>
              {loading ? "Loading..." : "Export to Excel"}
            </Button>
          </div>
          <div className="table-responsive">
            <Table hover className="text-center">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Revenue</th>
                  <th>Total Orders</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      Loading data...
                    </td>
                  </tr>
                ) : revenueData.length > 0 ? (
                  revenueData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.totalRevenue} VND</td>
                      <td>{item.totalOrders}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RevenueManagement;
