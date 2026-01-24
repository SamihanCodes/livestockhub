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
      <h2>My Transactions</h2>

      {transactions.length === 0 && <p>No transactions found</p>}

      {transactions.map((t) => (
        <div key={t.id} className="card">
          <p><strong>Amount:</strong> ₹{t.amount}</p>
          <p>
            <strong>Status:</strong>{" "}
            {t.status === "paid" ? (
              <span style={{ color: "#22C55E" }}>Paid</span>
            ) : (
              <span style={{ color: "#EF4444" }}>Pending</span>
            )}
          </p>

          {/* Buyer actions */}
          {user?.id === t.buyer_id && t.status === "pending" && (
            <button onClick={() => handlePay(t.id)}>
              Pay Now
            </button>
          )}

          {t.status === "paid" && (
            <Link
              to={`/invoice/${t.id}`}
              style={{
                display: "inline-block",
                marginTop: "8px",
                color: "#1B9AAA",
                fontWeight: "500",
              }}
            >
              View Invoice
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTransactions;
