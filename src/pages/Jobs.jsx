import { useEffect, useContext, useState } from "react";
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

  // 🔥 FILTER + PAGINATION STATES
  const [locationFilter, setLocationFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔥 FETCH JOBS (with filters + pagination)
  useEffect(() => {
    let url = `${API_URL}?page=${page}`;

    if (locationFilter) {
      url += `&location=${locationFilter}`;
    }

    if (skillFilter) {
      url += `&skill=${skillFilter}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(err => console.error(err));
  }, [API_URL, page, locationFilter, skillFilter, setJobs]);

  // 🔁 RESET FILTERS
  function resetFilters() {
    setLocationFilter("");
    setSkillFilter("");
    setPage(1);
  }

  // 🔍 FRONTEND SEARCH (small dataset only)
  let filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase()) ||
    j.location?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔃 SORTING
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
      {/* 👑 ADMIN JOB FORM */}
      {user?.role === "admin" && (
        <JobForm
          jobs={jobs}
          setJobs={setJobs}
          editJob={editJob}
          setEditJob={setEditJob}
          API_URL={API_URL}
        />
      )}

      {/* 🔍 BACKEND FILTERS */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Filter by location"
            value={locationFilter}
            onChange={e => {
              setLocationFilter(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Filter by skill (React)"
            value={skillFilter}
            onChange={e => {
              setSkillFilter(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-secondary w-100"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* 🔎 SEARCH + SORT */}
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

      {/* 📄 JOB LIST */}
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

      {/* 📑 PAGINATION */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline-primary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Jobs;