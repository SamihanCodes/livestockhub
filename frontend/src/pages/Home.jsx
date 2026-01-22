const Home = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
          Welcome to LiveStockHub
        </h1>

        <p style={{ maxWidth: "650px", margin: "0 auto", color: "#475569" }}>
          LiveStockHub is a digital marketplace designed to simplify and secure
          livestock trading. The platform ensures transparency, role-based access,
          and reliable transaction workflows for buyers and sellers.
        </p>
      </div>

      {/* Feature Highlights */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div className="card">
          <h3>Secure Authentication</h3>
          <p>
            Role-based access control ensures that buyers, sellers, and admins
            can only access features relevant to them.
          </p>
        </div>

        <div className="card">
          <h3>Transparent Listings</h3>
          <p>
            Sellers can create detailed livestock listings including animal type,
            pricing, and descriptions, ensuring clarity for buyers.
          </p>
        </div>

        <div className="card">
          <h3>Bidding & Interest System</h3>
          <p>
            Buyers can place bids or express interest, while sellers can review
            and accept offers in a controlled environment.
          </p>
        </div>

        <div className="card">
          <h3>Secure Transactions</h3>
          <p>
            Once a bid is accepted, transactions are tracked securely with
            simulated payment handling and digital records.
          </p>
        </div>
      </div>

      {/* Role Explanation */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        <div className="card">
          <h3>For Sellers</h3>
          <p>
            Sellers can list livestock, monitor buyer interest, manage bids,
            accept offers, and track completed transactions from a single
            dashboard.
          </p>
        </div>

        <div className="card">
          <h3>For Buyers</h3>
          <p>
            Buyers can explore available livestock, place competitive bids,
            receive notifications, and complete purchases securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
