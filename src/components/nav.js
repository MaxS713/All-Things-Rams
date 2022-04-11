import { Routes, Route, NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <div id="nav-style">
      <NavLink to="/news" className="navItem">
        News
      </NavLink>
      <NavLink to="/socials" className="navItem">
        Socials
      </NavLink>
      <NavLink to="/team" className="navItem">
        Team
      </NavLink>
      <NavLink to="/donate" id="donate-button" className="navItem">
        Donate
      </NavLink>
    </div>
  );
}
