import { useEffect, useState } from "react";
import BASE_URL from "../config";

function AdminApplications({ status }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard/applications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (status) data = data.filter(a => a.status === status);
        setApps(data);
      });
  }, [status]);

  function updateStatus(id, status) {
    fetch(`${BASE_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated =>
        setApps(apps.map(a => a._id === updated._id ? updated : a))
      );
  }

  return (
    <div className="container">
      <h4 className="mb-3">Applications</h4>

      {apps.map(app => (
        <div key={app._id} className="card p-3 mb-3 shadow-sm">
          <h6>{app.worker.name} ({app.worker.email})</h6>
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

          <span className="badge bg-secondary ms-2">{app.status}</span>
        </div>
      ))}
    </div>
  );
}

export default AdminApplications;
