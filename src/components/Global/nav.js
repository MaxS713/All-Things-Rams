//Library Imports
import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";

//Component Imports
// import PopUp from "../Donation/donateModal"

export default function Navbar() {
  // const [popUp, setPopUp] = useState(false);
  return (
    <div id="nav-style">
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
      <NavLink to="/contact" className="navItem">
        Contact
      </NavLink>
      <a
        className="navItem"
        id="injury-link"
        href="https://www.espn.com/nfl/team/injuries/_/name/lar/los-angeles-rams"
        target="_blank"
        rel="noopener noreferrer"
      >
        Injury Update
      </a>

      {/* DONATE BUTTON ----------------------------------------- */}
      {/* <div id="donate-button" className="navItem">
      <button onClick={()=>setPopUp(true)}>
        Donate
        </button>
      </div>
      {popUp && <PopUp setPopUp={setPopUp}/>} */}
      {/* DONATE BUTTON ----------------------------------------- */}
    </div>
  );
}
