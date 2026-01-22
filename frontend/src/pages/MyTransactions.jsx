import { useEffect, useState } from "react";
import { getMyTransactions, payTransaction } from "../api/transactions";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getMyTransactions().then((res) => setTransactions(res.data));
  }, []);

  const handlePay = async (id) => {
    try {
      await payTransaction(id);
      alert("Payment successful (simulated)");
      window.location.reload();
    } catch {
      alert("Payment failed");
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>
        My Transactions
      </h2>

      <p style={{ color: "#475569", marginBottom: "20px" }}>
        Track your payments and view invoices for completed transactions.
      </p>

      {transactions.length === 0 && (
        <p style={{ color: "#64748b" }}>
          No transactions found.
        </p>
      )}

      {transactions.map((t) => (
        <div className="card" key={t.id}>
          <p>
            <strong>Amount:</strong>{" "}
            <span style={{ color: "#142C52" }}>
              ₹{t.amount}
            </span>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {t.status === "pending" ? (
              <span style={{ color: "#F59E0B" }}>Pending</span>
            ) : (
              <span style={{ color: "#22C55E" }}>Paid</span>
            )}
          </p>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to={`/invoice/${t.id}`}
              style={{
                color: "#1B9AAA",
                fontWeight: "500",
              }}
            >
              View Invoice
            </Link>

            {t.status === "pending" && user?.id === t.buyer_id && (
              <button onClick={() => handlePay(t.id)}>
                Pay Now
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTransactions;
