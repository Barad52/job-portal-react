import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../config";

function EmployerDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="container">
      <h4 className="mb-4">Employer Dashboard</h4>

      <div className="row">
        <DashCard title="Total Jobs" value={stats.totalJobs} link="/dashboard/jobs" />
        <DashCard title="Open Jobs" value={stats.openJobs} link="/dashboard/open-jobs" />
        <DashCard title="Closed Jobs" value={stats.closedJobs} link="/dashboard/closed-jobs" />
        <DashCard title="Applications" value={stats.totalApplications} link="/dashboard/applications" />
        <DashCard title="Shortlisted" value={stats.shortlisted} link="/dashboard/shortlisted" />
        <DashCard title="Rejected" value={stats.rejected} link="/dashboard/rejected" />
      </div>
    </div>
  );
}

function DashCard({ title, value, link }) {
  return (
    <div className="col-md-4 mb-3">
      <Link to={link} style={{ textDecoration: "none" }}>
        <div className="card text-center shadow-sm h-100">
          <div className="card-body">
            <h6 className="text-muted">{title}</h6>
            <h2 className="fw-bold">{value}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EmployerDashboard;