import { useEffect, useState } from "react";

function JobForm({ jobs, setJobs, editJob, setEditJob, API_URL }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    requiredSkills: ""   // 👈 STRING for input
  });

  useEffect(() => {
    if (editJob) {
      setForm({
        title: editJob.title,
        company: editJob.company,
        location: editJob.location,
        salary: editJob.salary,
        requiredSkills: editJob.requiredSkills?.join(", ") || ""
      });
    }
  }, [editJob]);

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 🔥 CONVERT STRING → ARRAY
    const payload = {
      title: form.title,
      company: form.company,
      location: form.location,
      salary: form.salary,
      requiredSkills: form.requiredSkills
        .split(",")
        .map(s => s.trim().toLowerCase())
        .filter(Boolean)
    };

    if (editJob) {
      fetch(`${API_URL}/${editJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(payload)
      }).then(() => {
        setJobs(
          jobs.map(j =>
            j._id === editJob._id ? { ...payload, _id: j._id } : j
          )
        );
        setEditJob(null);
        setForm({
          title: "",
          company: "",
          location: "",
          salary: "",
          requiredSkills: ""
        });
      });
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(data => {
          setJobs([...jobs, data]);
          setForm({
            title: "",
            company: "",
            location: "",
            salary: "",
            requiredSkills: ""
          });
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
              onChange={e =>
                setForm({ ...form, [field]: e.target.value })
              }
            />
          </div>
        ))}

        {/* 🔥 REQUIRED SKILLS INPUT */}
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Required Skills (React, Node)"
            value={form.requiredSkills}
            onChange={e =>
              setForm({ ...form, requiredSkills: e.target.value })
            }
          />
        </div>
      </div>

      <button className="btn btn-primary mt-3">
        {editJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
}

export default JobForm;
