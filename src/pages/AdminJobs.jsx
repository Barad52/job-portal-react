import { useEffect, useState } from "react";
import BASE_URL from "../config";

function AdminJobs({ filter }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/jobs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        let list = data.jobs || data;
        if (filter) list = list.filter(j => j.status === filter);
        setJobs(list);
      });
  }, [filter]);

  function toggleStatus(job) {
    fetch(`${BASE_URL}/jobs/${job._id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        status: job.status === "open" ? "closed" : "open"
      })
    })
      .then(res => res.json())
      .then(updated =>
        setJobs(jobs.map(j => j._id === updated._id ? updated : j))
      );
  }

  return (
    <div className="container">
      <h4 className="mb-3">Jobs</h4>

      <div className="row">
        {jobs.map(job => (
          <div key={job._id} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm">
              <h5>{job.title}</h5>
              <p>{job.company} | {job.location}</p>
              <span className={`badge ${job.status === "open" ? "bg-success" : "bg-danger"}`}>
                {job.status}
              </span>
              <button
                className="btn btn-sm btn-outline-primary mt-2"
                onClick={() => toggleStatus(job)}
              >
                {job.status === "open" ? "Close Job" : "Reopen Job"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminJobs;
