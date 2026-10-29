import React from "react";

export function LandingPage() {
  const [email, setEmail] = React.useState("demo@example.com");
  const [password, setPassword] = React.useState("demo-password");
  const { signIn, signUp } = useAuth();

  return (
    <div className="page-shell gradient-bg">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">MC</span>
          <span className="brand-text">Minecraft Bot Hosting</span>
        </div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#limits">Limits</a>
          <button
            className="primary-button small"
            onClick={() => signIn(email, password)}
          >
            Login
          </button>
        </nav>
      </header>

      <main className="hero layout-grid">
        <section className="hero-copy">
          <div className="eyebrow">Java Edition • Secure • Free Hosting</div>
          <h1>Run bot fleets with a real control plane and honest limits.</h1>
          <p>
            Manage bot profiles, real-time status, plugins, task automation, and admin
            controls from a professional cross-device dashboard.
          </p>

          <div className="card-grid">
            <div className="mini-card cyan">
              <strong>3</strong>
              <span>Max active bots per normal user</span>
            </div>
            <div className="mini-card green">
              <strong>Realtime</strong>
              <span>Socket status and live telemetry</span>
            </div>
            <div className="mini-card purple">
              <strong>Admin</strong>
              <span>Verified backend role only</span>
            </div>
          </div>

          <div className="auth-form">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <div className="inline-buttons">
              <button className="primary-button" onClick={() => signIn(email, password)}>Sign in</button>
              <button className="secondary-button" onClick={() => signUp(email, password)}>Create account</button>
            </div>
          </div>
        </section>

        <aside className="feature-panel">
          <h2>Platform highlights</h2>
          <ul>
            <li>Firebase auth, Firestore, and Storage setup</li>
            <li>Real backend bot request validation</li>
            <li>Plugin registry with safe manifests</li>
            <li>Admin route protection and audit trail</li>
            <li>Free-tier capacity and uptime honesty</li>
            <li>Local development readiness, not fake bot traffic</li>
          </ul>
        </aside>
      </main>

      <section id="features" className="section-block">
        <h2>Included product areas</h2>
        <div className="feature-grid">
          <div className="feature-card">User dashboard</div>
          <div className="feature-card">Admin dashboard</div>
          <div className="feature-card">Bot profiles</div>
          <div className="feature-card">Inventory state</div>
          <div className="feature-card">Console and logs</div>
          <div className="feature-card">Plugins and presets</div>
          <div className="feature-card">Resource monitor</div>
          <div className="feature-card">Setup wizard</div>
        </div>
      </section>

      <section id="limits" className="section-block shallow">
        <h2>Free hosting honesty</h2>
        <p>
          Free hosting has resource, CPU, RAM, process, and uptime limits. This platform
          is designed to support future VPS migration and will never promise guaranteed
          24/7 uptime on a free tier.
        </p>
      </section>
    </div>
  );
}

function useAuth() {
  return {
    signIn: async () => undefined,
    signUp: async () => undefined
  };
}
