import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../config";
import { Link, useNavigate } from "react-router-dom";

function JobCard({ job, jobs, setJobs, setEditJob, API_URL }) {
  const { user } = useContext(AuthContext);
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  // 🔍 CHECK IF WORKER ALREADY APPLIED
  useEffect(() => {
    if (user?.role === "worker") {
      fetch(`${BASE_URL}/applications/my`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
        .then(apps => {
          if (Array.isArray(apps)) {
            const already = apps.find(
              a => a.job && a.job._id === job._id
            );
            if (already) setApplied(true);
          }
        })
        .catch(err => console.error("Apply check error:", err));
    }
  }, [job._id, user]);

  // 🟢 APPLY JOB (WITH PROFILE CHECK UX)
  function applyJob() {
    fetch(`${BASE_URL}/applications/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ jobId: job._id })
    })
      .then(res => res.json())
      .then(data => {
        // 🔥 STEP 6 — PROFILE NOT COMPLETE
        if (data.message === "Please complete your profile before applying") {
          alert("Please complete your profile first");
          navigate("/profile");
          return;
        }

        if (data.application) {
          setApplied(true);
          alert("Applied successfully");
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error(err));
  }

  // 🗑 DELETE JOB (ADMIN)
  function handleDelete() {
    fetch(`${API_URL}/${job._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(() => {
      setJobs(jobs.filter(j => j._id !== job._id));
    });
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="text-primary">{job.title}</h5>

          <p>
            {job.company} | {job.location}
            <br />
            ₹{job.salary}
          </p>

          {/* 🧠 REQUIRED SKILLS */}
          {job.requiredSkills?.length > 0 && (
            <p>
              <strong>Skills:</strong>{" "}
              {job.requiredSkills.join(", ")}
            </p>
          )}

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
                className="btn btn-info btn-sm"
              >
                View Applicants
              </Link>
            </>
          )}

          {/* 👷 WORKER APPLY BUTTON */}
          {user?.role === "worker" && job.status === "open" && (
            <button
              className="btn btn-success btn-sm mt-2"
              disabled={applied}
              onClick={applyJob}
            >
              {applied ? "Applied" : "Apply"}
            </button>
          )}

          {/* 🔴 CLOSED JOB */}
          {job.status === "closed" && (
            <span className="badge bg-danger mt-2">
              Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCard;