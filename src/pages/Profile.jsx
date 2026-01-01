import { useEffect, useState } from "react";
import BASE_URL from "../config";

function Profile() {
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.skills?.length > 0 || data.experience) {
          setIsCompleted(true);
        }

        setSkills(data.skills?.join(", ") || "");
        setExperience(data.experience || "");
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${BASE_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
        experience
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Profile updated successfully");
        setIsCompleted(true);
      });
  }

  return (
    <div className="container">
      <h4 className="mb-3">My Profile</h4>

      {!isCompleted && (
        <div className="alert alert-warning">
          Please complete your profile to apply for jobs.
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-3">
        <div className="mb-3">
          <label>Skills (comma separated)</label>
          <input
            className="form-control"
            value={skills}
            onChange={e => setSkills(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Experience</label>
          <textarea
            className="form-control"
            value={experience}
            onChange={e => setExperience(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">
          {isCompleted ? "Update Profile" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
