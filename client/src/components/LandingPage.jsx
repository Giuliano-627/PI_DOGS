import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Super landing LandingPage</h1>
      <Link to="/home">
        <button>Ir a home</button>
      </Link>
    </div>
  );
}
