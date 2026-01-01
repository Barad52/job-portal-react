import { useEffect, useState } from "react";
import BASE_URL from "../config";

function AppliedJobs() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/applications/my`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setApps(data));
  }, []);

  return (
    <div className="container">
      <h4 className="mb-3">My Applied Jobs</h4>

      {apps.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        <div className="row">
          {apps.map(app => (
            <div key={app._id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>{app.job.title}</h5>
                  <p>
                    {app.job.company} | {app.job.location}  
                    <br />
                    ₹{app.job.salary}
                  </p>
                  <span className="badge bg-primary">
                    {app.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppliedJobs;
