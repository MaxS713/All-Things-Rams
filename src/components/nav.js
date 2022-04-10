import { Routes, Route, NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <div id="nav-style">
      {/* Suggest making home link through the site title. Then we can lose the Home Link */}
      {/* Also curious as  to why these are all buttons? */}
      <button>
        <NavLink to="/" className="navItem">
          Home
        </NavLink>
      </button>
      <button>
        <NavLink to="/" className="navItem">
          News
        </NavLink>
      </button>
      <button>
        <NavLink to="/" className="navItem">
          Socials
        </NavLink>
      </button>
      <button>
        <NavLink to="/" className="navItem">
          Team
        </NavLink>
      </button>
      <button>
        <NavLink to="/" className="navItem">
          Donate
        </NavLink>
      </button>
    </div>
  );
}
