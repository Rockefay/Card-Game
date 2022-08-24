import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <div className="timer">00:00:00</div>
      <div className="logo">Card Game</div>
      <div className="restart" onClick={() => window.location.reload()}>
        Restart
      </div>
      <Link to="/" className="home">
        Home
      </Link>
    </div>
  );
}

export default NavBar;
