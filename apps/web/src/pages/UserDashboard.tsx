import React from "react";

export function UserDashboard() {
  return (
    <div className="page-shell dark-bg">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">USER</span>
          <span className="brand-text">Dashboard</span>
        </div>
      </header>

      <main className="dashboard-container">
        <aside className="sidebar">
          <span>Overview</span>
          <span>My Bots</span>
          <span>Profiles</span>
          <span>Inventory</span>
          <span>Players</span>
          <span>Console</span>
          <span>Plugins</span>
          <span>Settings</span>
        </aside>

        <section className="content-panel">
          <div className="stat-grid">
            <div className="stat-card"><label>Active bots</label><strong>0 / 3</strong></div>
            <div className="stat-card"><label>Workers</label><strong>Not connected</strong></div>
            <div className="stat-card"><label>Storage</label><strong>0 MB</strong></div>
          </div>

          <div className="panel-card">
            <h3>My bots</h3>
            <p>No active bot profiles yet. Create a profile to begin hosting.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
