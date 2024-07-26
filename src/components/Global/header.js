//Library Imports
import { Link } from "react-router-dom";
import { useState } from "react";
//Component Imports
import Navbar from "./nav";

//Assets Import
// 4-21-22 MOST RECENT LOGO PLACEHOLDER
// import logoLink from "../../images/placeholder-logo.jpg";
// import logoLink from "https://javelin.neocities.org/EXT/ALL_THINGS_RAMS/ATR.jpg";
// import Logo from "./logo.js"
import logo1 from "./styles/ATR1.png";
import logo2 from "./styles/ATR2.png";
import steve from "./styles/football_steve.gif"

//Style Imports
import "./styles/header.css";

export default function Header() {
  const [logoSrc, setLogoSrc] = useState(logo2);
  return (
    <>
      <div id="head-style">
        <div className="header">
          <div className="headerImg">
            <div
              onClick={() => {
                if (logoSrc === logo2) {
                  setLogoSrc(logo1);
                } else if (logoSrc === logo1) {
                  setLogoSrc(steve);
                } else {
                  setLogoSrc(logo2);
                }
              }}
            >
              <img
                src={logoSrc}
                alt="all-things-rams-logo"
                className="atr-logo"
              />
            </div>
          </div>
          <Link to="/">
            <div className="title-and-disclaimer">
              <h1>ALL THINGS RAMS</h1>
              <p id="disclaimer">
                AllThingsRams.com is not affiliated with the L.A. Rams or the
                National Football League
              </p>
            </div>
          </Link>
        </div>
        <Navbar />
      </div>
    </>
  );
}
