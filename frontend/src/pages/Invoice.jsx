import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../api/invoice";

const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    getInvoice(id).then((res) => setInvoice(res.data));
  }, [id]);

  if (!invoice) {
    return <div className="container">Loading invoice...</div>;
  }

  return (
    <div className="container">
      <h2>Transaction Invoice</h2>

      <div className="card">
        <p><strong>Transaction ID:</strong> {invoice.id}</p>
        <p><strong>Amount:</strong> ₹{invoice.amount}</p>
        <p><strong>Status:</strong> {invoice.status}</p>
        <p><strong>Date:</strong> {new Date(invoice.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Invoice;
