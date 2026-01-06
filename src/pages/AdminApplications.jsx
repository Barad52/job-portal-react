import { useEffect, useState } from "react";
import BASE_URL from "../config";

function AdminApplications({ status, title }) {
  const [apps, setApps] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      `${BASE_URL}/dashboard/applications${status ? `?status=${status}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => setApps(data))
      .catch(err => console.error(err));
  }, [status, token]);

  function updateStatus(id, newStatus) {
    fetch(`${BASE_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => {
        setApps(prev => prev.filter(a => a._id !== id));
      });
  }

  return (
    <div className="container">
      <h4 className="mb-3">{title}</h4>

      {apps.length === 0 && (
        <p className="text-muted">No applications found.</p>
      )}

      {apps.map(app => (
        <div key={app._id} className="card p-3 mb-3 shadow-sm">
          <h6>
            {app.worker.name}{" "}
            <small className="text-muted">({app.worker.email})</small>
          </h6>

          <p className="mb-2">
            <strong>Company:</strong> {app.job.company}<br />
            <strong>Job:</strong> {app.job.title}
          </p>

          <p className="mb-2">
            <strong>Skills:</strong>{" "}
            {app.worker.skills.length
              ? app.worker.skills.join(", ")
              : "N/A"}
            <br />
            <strong>Experience:</strong>{" "}
            {app.worker.experience || "N/A"}
          </p>

          {app.status === "applied" && (
            <>
              <button
                className="btn btn-outline-success btn-sm me-2"
                onClick={() => updateStatus(app._id, "shortlisted")}
              >
                Shortlist
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => updateStatus(app._id, "rejected")}
              >
                Reject
              </button>
            </>
          )}

          {app.status === "shortlisted" && (
            <span className="badge bg-success">Shortlisted</span>
          )}

          {app.status === "rejected" && (
            <span className="badge bg-danger">Rejected</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminApplications;
