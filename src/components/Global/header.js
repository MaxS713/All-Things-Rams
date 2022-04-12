//Library Imports
import { Link } from "react-router-dom";

//Component Imports
import Navbar from "./nav";

//Assets Import
import logoLink from "../../images/placeholder-logo.jpg";
// import logoLink from "https://javelin.neocities.org/EXT/ALL_THINGS_RAMS/ATR.jpg";

//Style Imports
import "./styles/header.css";

export default function Header() {
  return (
    <>
      <div id="head-style">
        <div className="header">
          <div className="headerImg">
            <Link to="/">
              <img src={logoLink} alt="all-things-rams logo" width="70vw" />
            </Link>
          </div>
          <div className="title-and-disclaimer">
            <h1>ALL THINGS RAMS</h1>
            <p id="disclaimer">
              AllThingsRams.com is not affiliated with the L.A. Rams or the
              National Football League
            </p>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
}
