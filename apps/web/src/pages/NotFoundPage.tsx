import React from "react";

export function NotFoundPage() {
  return (
    <div className="page-shell dark-bg">
      <div className="notice-box compact">
        <h1>Page not found</h1>
        <p>The requested route does not exist or you do not have access.</p>
      </div>
    </div>
  );
}
