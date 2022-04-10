import Navbar from "./nav";
import logoLink from "../images/placeholder-logo.jpg";

import "./styles/header.css";

export default function Header() {
    return (
        <>
            <div id="head-style">
                <div className="header">
                    <div className="headerImg">
                        <img src={logoLink} alt="all-things-rams logo" width="70vw" />
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
