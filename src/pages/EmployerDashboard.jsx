import { useEffect, useState } from "react";
import BASE_URL from "../config";

function EmployerDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard/stats`, {
      headers: {
        Authorization: localStorage.getItem("token")
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
        <StatCard title="Total Jobs" value={stats.totalJobs} />
        <StatCard title="Open Jobs" value={stats.openJobs} />
        <StatCard title="Closed Jobs" value={stats.closedJobs} />
        <StatCard title="Applications" value={stats.totalApplications} />
        <StatCard title="Shortlisted" value={stats.shortlisted} />
        <StatCard title="Rejected" value={stats.rejected} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card text-center shadow-sm">
        <div className="card-body">
          <h6 className="text-muted">{title}</h6>
          <h2 className="fw-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;