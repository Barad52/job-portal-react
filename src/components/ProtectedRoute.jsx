import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // 🔄 Wait until auth loads
  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
