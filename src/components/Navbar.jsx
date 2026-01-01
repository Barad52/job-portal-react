import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Job Portal
        </Link>

        <div className="collapse navbar-collapse show">
          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user?.role === "worker" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-applications">
                    My Applications
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    My Profile
                  </Link>
                </li>
              </>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/employer-dashboard">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* RIGHT MENU */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3">
                  Hello, {user.name}
                </span>

                <Link
                  className="btn btn-outline-light btn-sm me-2"
                  to="/jobs"
                >
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
      </div>
    </nav>
  );
}

export default Navbar;
