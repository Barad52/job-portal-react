import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          Job Portal
        </Link>

        {/* Left Side */}
        {user?.role === "worker" && (
          <Link className="nav-link" to="/my-applications">
            My Applications
          </Link>
        )}

        {/* Profile Link */}
        {user?.role === "worker" && (
          <Link className="nav-link" to="/profile">
            My Profile
          </Link>
        )}

        {/* Employer Dashboard Link */}
        {user?.role === "admin" && (
          <Link className="nav-link" to="/employer-dashboard">
            Dashboard
          </Link>
        )}

        {/* Right Side */}
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="text-white me-3">
                Hello, {user.name}
              </span>

              <Link className="btn btn-outline-light btn-sm me-2" to="/jobs">
                Jobs
              </Link>

              <button
                className="btn btn-light btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn-outline-light btn-sm me-2"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-light btn-sm"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;