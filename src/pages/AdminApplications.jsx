import { useEffect, useState } from "react";
import BASE_URL from "../config";

function AdminApplications({ status, title }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard/applications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (status) {
          data = data.filter(a => a.status === status);
        }
        setApps(data);
      });
  }, [status]);

  function updateStatus(id, newStatus) {
    fetch(`${BASE_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => {
        // 🔥 REMOVE FROM CURRENT LIST
        setApps(prev => prev.filter(a => a._id !== id));
      });
  }

  return (
    <div className="container">
      <h4 className="mb-3">{title}</h4>

      {apps.length === 0 && <p>No applications found.</p>}

      {apps.map(app => (
        <div key={app._id} className="card p-3 mb-3 shadow-sm">
          <h6>
            {app.worker.name} ({app.worker.email})
          </h6>

          <p>
            <strong>Job:</strong> {app.job.title}<br />
            <strong>Skills:</strong> {app.worker.skills.join(", ")}<br />
            <strong>Experience:</strong> {app.worker.experience}
          </p>

          {!status && (
            <>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => updateStatus(app._id, "shortlisted")}
              >
                Shortlist
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => updateStatus(app._id, "rejected")}
              >
                Reject
              </button>
            </>
          )}

          {status && (
            <span className="badge bg-secondary">
              {app.status}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminApplications;
