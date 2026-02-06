import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ NEW
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (!res.data.user || !res.data.token) {
        throw new Error("Invalid login response");
      }

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      // ✅ SHOW BACKEND MESSAGE IF AVAILABLE
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password");
      }

      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        className="container"
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login to LiveStockHub
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#475569",
            marginBottom: "20px",
          }}
        >
          Access your dashboard and manage your activity
        </p>

        {/* ✅ ERROR MESSAGE */}
        {error && (
          <p
            style={{
              color: "#EF4444",
              background: "#FEE2E2",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ width: "100%", marginTop: "10px" }}>
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "14px",
          }}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#1B9AAA" }}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
