import { useEffect, useContext } from "react";
import JobForm from "../components/JobForm";
import JobCard from "../components/JobCard";
import { AuthContext } from "../context/AuthContext";

function Jobs({
  jobs = [],
  setJobs,
  editJob,
  setEditJob,
  search = "",
  setSearch,
  sort = "",
  setSort,
  API_URL
}) {
  const { user } = useContext(AuthContext);

  // 🔥 FETCH JOBS (PUBLIC)
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  let filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase()) ||
    j.location?.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "latest") {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  if (sort === "salaryHigh") {
    filtered.sort((a, b) => b.salary - a.salary);
  }
  if (sort === "salaryLow") {
    filtered.sort((a, b) => a.salary - b.salary);
  }

  return (
    <>
      {/* 🔒 ADMIN ONLY FORM */}
      {user?.role === "admin" && (
        <JobForm
          jobs={jobs}
          setJobs={setJobs}
          editJob={editJob}
          setEditJob={setEditJob}
          API_URL={API_URL}
        />
      )}

      {/* Search + Sort */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="latest">Latest</option>
            <option value="salaryHigh">Salary High → Low</option>
            <option value="salaryLow">Salary Low → High</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="row">
        {filtered.length === 0 ? (
          <p className="text-center text-muted">No jobs found</p>
        ) : (
          filtered.map(job => (
            <JobCard
              key={job._id}
              job={job}
              jobs={jobs}
              setJobs={setJobs}
              setEditJob={setEditJob}
              API_URL={API_URL}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Jobs;
