import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from "../config";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful. Please login.");
      navigate("/login");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: "420px" }}>
        <h4 className="text-center mb-3">Register</h4>

        {error && (
          <div className="alert alert-danger py-1">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-2"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
