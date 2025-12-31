import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import BASE_URL from "./config";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const API_URL = `${BASE_URL}/jobs`;

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs
                  jobs={jobs}
                  setJobs={setJobs}
                  editJob={editJob}
                  setEditJob={setEditJob}
                  search={search}
                  setSearch={setSearch}
                  sort={sort}
                  setSort={setSort}
                  API_URL={API_URL}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
