import React from "react";

export function AdminDashboard() {
  return (
    <div className="page-shell dark-bg">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark admin">ADMIN</span>
          <span className="brand-text">Control Center</span>
        </div>
      </header>

      <main className="dashboard-container">
        <aside className="sidebar admin-sidebar">
          <span>Overview</span>
          <span>Users</span>
          <span>All Bots</span>
          <span>Queue</span>
          <span>Groups</span>
          <span>Plugins</span>
          <span>Resource Monitor</span>
          <span>Audit Logs</span>
        </aside>

        <section className="content-panel">
          <div className="stat-grid">
            <div className="stat-card"><label>Users</label><strong>Unknown</strong></div>
            <div className="stat-card"><label>Bots</label><strong>Unknown</strong></div>
            <div className="stat-card"><label>Queue</label><strong>Unknown</strong></div>
            <div className="stat-card"><label>Workers</label><strong>Not connected</strong></div>
          </div>

          <div className="panel-card">
            <h3>Admin overview</h3>
            <p>Connection health and live metrics will appear when Firebase and the runtime are configured and reachable.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
