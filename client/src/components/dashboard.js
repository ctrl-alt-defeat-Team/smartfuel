import React from "react";
import { useState } from "react";
import DashForm from "./dashForm";
import DashSubmissions from "./dashSubmissions";
import DashApproved from "./dashApproved";
import "../styles/Dashboard.css";

function Dashboard({ isAdmin }) {
  const [showSubmissions, setShowSubmissions] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showApproved, setShowApproved] = useState(false);

  const handleClickSubmissions = () => {
    setShowSubmissions(true);
    setShowForm(false);
    setShowApproved(false);
  };

  const handleClickForm = () => {
    setShowForm(true);
    setShowSubmissions(false);
    setShowApproved(false);
  };

  const handleClickApproved = () => {
    setShowApproved(true);
    setShowForm(false);
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
        <button className="btn-dash" onClick={handleClickApproved}>
          Approved
        </button>
        <a
          className="btn-dash"
          target="__blank"
          href="https://cloud.mongodb.com/v2/65d47affd1add44364b66247#/metrics/replicaSet/65d47bdf9478d412a7e4e4bd/explorer/test/users/find"
        >
          Database
        </a>
      </div>
      <div className="main-dash-content">
        <h1>Dashboard</h1>
        {showSubmissions && <DashSubmissions />}
        {showForm && (
          <DashForm
            onClickSubmissions={handleClickSubmissions}
            isAdmin={isAdmin}
          />
        )}
        {showApproved && <DashApproved showApproved={showApproved} />}
      </div>
    </div>
  );
}

export default Dashboard;
