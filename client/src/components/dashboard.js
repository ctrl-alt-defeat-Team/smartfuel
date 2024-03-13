import React from "react";
import { useState } from "react";
import DashForm from "./dashForm";
import DashSubmissions from "./dashSubmissions";
import "../styles/Dashboard.css";

function Dashboard() {
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleClickSubmissions = () => {
    setShowSubmissions(true);
    setShowForm(false);
  };

  const handleClickForm = () => {
    setShowForm(true);
    setShowSubmissions(false);
  };

  return (
    <div className="main-dashboard">
      <div className="sidebar">
        <button className="btn-dash" onClick={handleClickSubmissions}>
          Submissions
        </button>
        <button className="btn-dash" onClick={handleClickForm}>
          Form
        </button>
        <a
          className="btn-dash"
          href="https://cloud.mongodb.com/v2/65d47affd1add44364b66247#/metrics/replicaSet/65d47bdf9478d412a7e4e4bd/explorer/test/users/find"
        >
          Database
        </a>
      </div>
      <div className="main-dash-content">
        <h1>Dashboard</h1>
        {showSubmissions && <DashSubmissions />}
        {showForm && <DashForm />}
      </div>
    </div>
  );
}

export default Dashboard;
