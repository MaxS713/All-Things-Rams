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
      <NavLink to="/team" className="navItem">
        Team
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
