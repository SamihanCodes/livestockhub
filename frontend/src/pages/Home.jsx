const Home = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: "center",color:"brown" }}>
        Welcome to LiveStockHub
      </h1>
      <p>
        LiveStockHub is a platform that connects livestock sellers and buyers.
        Sellers can list animals, and buyers can browse listings and express
        interest.
      </p>

      <div className="card">
        <h3>For Sellers</h3>
        <p>Create listings and view interested buyers.</p>
      </div>

      <div className="card">
        <h3>For Buyers</h3>
        <p>Browse listings and show interest in livestock.</p>
      </div>
    </div>
  );
};

export default Home;
