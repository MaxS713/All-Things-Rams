//Library Imports
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

//Component Imports
import PopUp from "../Donation/donateModal"

export default function Navbar() {
  const [popUp, setPopUp] = useState(false)
  return (
    <div id="nav-style">
      <NavLink to="/news" className="navItem">
        News
      </NavLink>
      <NavLink to="/socials" className="navItem">
        Socials
      </NavLink>
      <div class="dropdown">
      <NavLink to="/" className="navItem" id='dropbtn'>
        Team
      </NavLink>
      <div class="dropdown-content">
        <a href='https://www.therams.com/' target="_blank" rel="noopener noreferrer">Rams</a>
        <a href='https://www.therams.com/schedule/' target="_blank" rel="noopener noreferrer">Schedule</a>
        <a href='https://www.therams.com/team/players-roster/' target="_blank" rel="noopener noreferrer">Roster</a>
        <a href='https://www.espn.com/nfl/injuries' target="_blank" rel="noopener noreferrer">Injury Update</a>
      </div>
      </div>
      <NavLink to="/contact" className="navItem">
        Contact
      </NavLink>
      <div id="donate-button" className="navItem">
      <button onClick={()=>setPopUp(true)}>
        Donate
        </button>
      </div>
      {popUp && <PopUp setPopUp={setPopUp}/>}
    </div>
  );
}
