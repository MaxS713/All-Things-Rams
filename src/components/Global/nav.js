//Library Imports
import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";

//Component Imports
// import PopUp from "../Donation/donateModal"

export default function Navbar() {
  // const [popUp, setPopUp] = useState(false);
  return (
    <>
    {/* <div id="nav-style" class="full">
      <NavLink to="/news" className="navItem">
        News
      </NavLink>
      <NavLink to="/socials" className="navItem">
        Socials
      </NavLink>
      <div className="dropdown">
        <NavLink to="/" className="navItem" id="dropbtn">
          Team
        </NavLink>
        <div className="dropdown-content">
          <a
            href="https://www.therams.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rams
          </a>
          <a
            href="https://www.therams.com/schedule/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule
          </a>
          <a
            href="https://www.therams.com/team/players-roster/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Roster
          </a>
        </div>
      </div>
      <a
        className="navItem"
        id="injury-link"
        href="https://www.espn.com/nfl/team/injuries/_/name/lar/los-angeles-rams"
        target="_blank"
        rel="noopener noreferrer"
      >
        Injury Update
      </a>
      <NavLink to="/contact" className="navItem">
        Contact
      </NavLink>
      </div> */}

    {/* conditionally renders the hamburger menu if site is in mobile view */}
    <section class="top-nav">
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
      <div class='menu-button'></div>
      </label>
    <ul class="menu">
    <li><NavLink to="/news" className="navItem">
        News
      </NavLink>
      </li>
      <li><NavLink to="/socials" className="navItem">
        Socials
      </NavLink>
      </li>
      <li><div className="dropdown">
        <NavLink to="/" className="navItem" id="dropbtn">
          Team
        </NavLink>
        <div className="dropdown-content">
          <a
            href="https://www.therams.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rams
          </a>
          <a
            href="https://www.therams.com/schedule/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule
          </a>
          <a
            href="https://www.therams.com/team/players-roster/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Roster
          </a>
        </div>
      </div>
      </li>

      <li><a
        className="navItem"
        id="injury-link"
        href="https://www.espn.com/nfl/team/injuries/_/name/lar/los-angeles-rams"
        target="_blank"
        rel="noopener noreferrer"
      >
        Injury Update
      </a>
      </li>
      <li><NavLink to="/contact" className="navItem">
        Contact
      </NavLink>
      </li>
      </ul>
      </section>
      {/* DONATE BUTTON ----------------------------------------- */}
      {/* <div id="donate-button" className="navItem">
      <button onClick={()=>setPopUp(true)}>
        Donate
        </button>
      </div>
      {popUp && <PopUp setPopUp={setPopUp}/>} */}
      {/* DONATE BUTTON ----------------------------------------- */}
</>
  );
}
