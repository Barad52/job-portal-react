import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../config";
import { Link } from "react-router-dom";

function JobCard({ job, jobs, setJobs, setEditJob, API_URL }) {
  const { user } = useContext(AuthContext);

  // 🗑 DELETE JOB (ADMIN)
  function handleDelete() {
    fetch(`${API_URL}/${job._id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(() => {
      setJobs(jobs.filter(j => j._id !== job._id));
    });
  }

  // 🟢 APPLY JOB (WORKER)
  function applyJob() {
    fetch(`${BASE_URL}/applications/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ jobId: job._id })
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  }

  // 🔄 TOGGLE JOB STATUS (ADMIN)
  function toggleStatus() {
    fetch(`${API_URL}/${job._id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        status: job.status === "open" ? "closed" : "open"
      })
    })
      .then(res => res.json())
      .then(updatedJob => {
        setJobs(
          jobs.map(j =>
            j._id === updatedJob._id ? updatedJob : j
          )
        );
      });
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="text-primary">{job.title}</h5>
          <p>
            {job.company} | {job.location}<br />
            ₹{job.salary}
          </p>

          {/* 👑 ADMIN CONTROLS */}
          {user?.role === "admin" && (
            <>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setEditJob(job)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm me-2"
                onClick={handleDelete}
              >
                Delete
              </button>

              <Link
                to={`/applicants/${job._id}`}
                className="btn btn-info btn-sm me-2"
              >
                View Applicants
              </Link>

              {/* 🟢🔴 OPEN / CLOSE BUTTON */}
              <button
                className={`btn btn-sm ${job.status === "open" ? "btn-secondary" : "btn-success"
                  }`}
                onClick={toggleStatus}
              >
                {job.status === "open" ? "Close Job" : "Reopen Job"}
              </button>
            </>
          )}


          {/* 👷 WORKER APPLY BUTTON */}
          {user?.role === "worker" && (
            <button
              className="btn btn-success btn-sm"
              onClick={applyJob}
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
