import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="Menu">
      <div className="container">
        <h3 className="logo">Card Game</h3>
        <Link to="/game" className="button">
          Play
        </Link>
      </div>
    </div>
  );
}

export default Menu;
