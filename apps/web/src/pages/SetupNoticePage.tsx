import React from "react";

export function SetupNoticePage() {
  return (
    <div className="page-shell notice-shell">
      <div className="notice-box">
        <h1>Admin setup required</h1>
        <p>
          The account matches the owner email, but the trusted backend admin role has not yet been assigned.
        </p>
        <ol>
          <li>Verify the email in Firebase Authentication.</li>
          <li>Run the secure server-side bootstrap command.</li>
          <li>Sign out and back in to refresh the token.</li>
        </ol>
      </div>
    </div>
  );
}
