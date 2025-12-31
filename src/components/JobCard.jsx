import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function JobCard({ job, jobs, setJobs, setEditJob, API_URL }) {
  const { user } = useContext(AuthContext);

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

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="text-primary">{job.title}</h5>
          <p>
            {job.company} | {job.location}<br />
            ₹{job.salary}
          </p>

          {user?.role === "admin" && (
            <>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setEditJob(job)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
