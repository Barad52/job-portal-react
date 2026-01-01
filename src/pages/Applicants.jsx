import { useEffect, useState } from "react";
import BASE_URL from "../config";
import { useParams } from "react-router-dom";

function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/applications/job/${jobId}`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setApps(data));
  }, [jobId]);

  function updateStatus(appId, status) {
    fetch(`${BASE_URL}/applications/${appId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => {
        setApps(
          apps.map(a =>
            a._id === updated._id ? updated : a
          )
        );
      });
  }

  return (
    <div className="container">
      <h4 className="mb-3">Applicants</h4>

      {apps.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        <ul className="list-group">
          {apps.map(app => (
            <li key={app._id} className="list-group-item">
              <strong>{app.worker.name}</strong><br />
              <small>{app.worker.email}</small><br />

              <span className="badge bg-secondary me-2">
                {app.status}
              </span>

              <div className="mt-2">
                <button
                  className="btn btn-success btn-sm me-2"
                  disabled={app.status === "shortlisted"}
                  onClick={() =>
                    updateStatus(app._id, "shortlisted")
                  }
                >
                  Shortlist
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  disabled={app.status === "rejected"}
                  onClick={() =>
                    updateStatus(app._id, "rejected")
                  }
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Applicants;
