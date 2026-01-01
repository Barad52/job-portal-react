import { useEffect, useState } from "react";
import BASE_URL from "../config";

function Profile() {
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setSkills(data.skills.join(", "));
        setExperience(data.experience);
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
        skills: skills.split(",").map(s => s.trim()),
        experience
      })
    })
      .then(res => res.json())
      .then(() => alert("Profile updated successfully"));
  }

  return (
    <div className="container">
      <h4 className="mb-3">My Profile</h4>

      <form onSubmit={handleSubmit} className="card p-3">
        <div className="mb-3">
          <label>Skills (comma separated)</label>
          <input
            className="form-control"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Experience</label>
          <textarea
            className="form-control"
            value={experience}
            onChange={e => setExperience(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
