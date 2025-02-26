import React, { useState, useEffect } from "react";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import "chart.js/auto";
import "./Wallet.scss";
import { FaWallet } from "react-icons/fa";
import { getWallet } from "../../../Controller/ApiController";

const Wallet = () => {
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Deposit",
      amount: 200,
      date: "2025-02-10",
      time: "14:30",
      description: "Deposit into wallet",
    },
    {
      id: 2,
      type: "Purchase",
      amount: -150,
      date: "2025-02-11",
      time: "16:00",
      description: "Purchased Blind Box",
    },
  ]);
  const [filterType, setFilterType] = useState("All");
  const [depositAmount, setDepositAmount] = useState("");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleDeposit = () => {
    const amount = parseInt(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      const newTransaction = {
        id: transactions.length + 1,
        type: "Deposit",
        amount: amount,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString(),
        description: "Deposit into wallet",
      };
      setTransactions([...transactions, newTransaction]);
      setBalance(balance + amount);
      setDepositAmount("");
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === "All") return true;
    if (filterType === "Deposit") return tx.amount > 0;
    if (filterType === "Purchase") return tx.amount < 0;
    return true;
  });

  const chartData = {
    labels: ["Deposit", "Purchase"],
    datasets: [
      {
        data: [
          transactions
            .filter((tx) => tx.amount > 0)
            .reduce((sum, tx) => sum + tx.amount, 0),
          transactions
            .filter((tx) => tx.amount < 0)
            .reduce((sum, tx) => sum - tx.amount, 0),
        ],
        backgroundColor: ["#28a745", "#dc3545"],
      },
    ],
  };

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
        if (userId) {
          const walletData = await getWallet(userId);
          setWallet(walletData);
        } else {
          console.error("No userId found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  if (loading) return <p>Loading wallet...</p>;
  if (!wallet) return <p>Wallet not found.</p>;
  return (
    <Container className="wallet-container">
      <Row className="mb-4">
        <Col className="text-center">
          <h2>
            Your Wallet <FaWallet />
          </h2>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="wallet-balance"
          >
            {wallet.balance} $
          </motion.span>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Transactions</option>
            <option value="Deposit">Deposits</option>
            <option value="Purchase">Purchases</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} className="deposit-section">
          <Form.Control
            type="number"
            placeholder="Enter amount to deposit"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <Button onClick={handleDeposit} className="deposit-button">
            Deposit
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Table striped bordered hover className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.time}</td>
                  <td>{tx.description}</td>
                  <td
                    className={tx.amount > 0 ? "text-success" : "text-danger"}
                  >
                    {tx.amount.toLocaleString()} $
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={6} className="chart-container">
          <div className="small-chart">
            <Pie data={chartData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Wallet;
