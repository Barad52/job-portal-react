import { useEffect, useState } from "react";

function JobForm({ jobs, setJobs, editJob, setEditJob, API_URL }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: ""
  });

  useEffect(() => {
    if (editJob) setForm(editJob);
  }, [editJob]);

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (editJob) {
      fetch(`${API_URL}/${editJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(form)
      }).then(() => {
        setJobs(jobs.map(j => j._id === editJob._id ? { ...form, _id: j._id } : j));
        setEditJob(null);
        setForm({ title: "", company: "", location: "", salary: "" });
      });
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(data => {
          setJobs([...jobs, data]);
          setForm({ title: "", company: "", location: "", salary: "" });
        });
    }
  }

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit}>
      <div className="row g-2">
        {["title", "company", "location", "salary"].map(field => (
          <div className="col-md-3" key={field}>
            <input
              className="form-control"
              placeholder={field}
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-3">
        {editJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}

export default JobForm;
