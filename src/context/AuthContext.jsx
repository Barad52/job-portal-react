import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore worker on refresh
  useEffect(() => {
    const storedWorker = localStorage.getItem("worker");
    if (storedWorker) {
      setUser(JSON.parse(storedWorker));
    }
    setLoading(false);
  }, []);

  function login(workerData, token) {
    localStorage.setItem("token", token);
    localStorage.setItem("worker", JSON.stringify(workerData));
    setUser(workerData);
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