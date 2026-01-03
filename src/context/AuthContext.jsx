import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 NEW

  // 🔁 Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("worker");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // 🔥 IMPORTANT
  }, []);

  function login(userData, token) {
    localStorage.setItem("token", token);
    localStorage.setItem("worker", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("worker");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
