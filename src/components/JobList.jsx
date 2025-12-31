import JobCard from "./JobCard";

function JobList({ jobs, setJobs, setEditJob, search, sort }) {
  let filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "latest") filtered.sort((a, b) => b.id - a.id);
  if (sort === "salaryHigh") filtered.sort((a, b) => b.salary - a.salary);
  if (sort === "salaryLow") filtered.sort((a, b) => a.salary - b.salary);

  return (
    <div className="row">
      {filtered.map(job => (
        <JobCard
          key={job._id}
          job={job}
          jobs={jobs}
          setJobs={setJobs}
          setEditJob={setEditJob}
        />
      ))}
    </div>
  );
}

export default JobList;
