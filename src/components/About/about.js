//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/about.css";

//Asset Imports
import PlaceHolderImg from "./styles/male-placeholder-image.jpeg";

export default function About() {
  return (
    <>
      <main>
        <section id="about">
          <div id="about-wrapper">
            <div id="about-head">
              <h1 id="about-title">About All Things Rams</h1>
              <p>
                Think of us as a small newspaper dedicated to giving people easy
                access to all relevant and updated news pertaining to the L.A.
                Rams.
              </p>
              <h2>Our Team</h2>
            </div>

            {/* Steve Said there are 3-4 team members. Image and breif description of each seems appropriate */}

            {/* ------------------- STEVE -------------------  */}

            <div className="staff">
              <div className="staff-img">
                <img
                  src={PlaceHolderImg}
                  height="250"
                  alt="Placeholder Image of Steve Viner"
                  id="steve"
                />
              </div>
              {/* name */}
              <div className="staff-about">
                <h3>Steven Viner</h3>
                {/* title */}
                <h4>Title</h4>
                {/* about */}
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit.
                </p>
              </div>
            </div>

            {/* ------------------- Joey -------------------  */}

            <div className="staff">
              <div className="staff-img">
                <img
                  src={PlaceHolderImg}
                  height="250"
                  alt="Placeholder Image of Joey"
                  id="joey"
                />
              </div>
              {/* name */}
              <div className="staff-about">
                <h3>Joey</h3>
                {/* title */}
                <h4>Title</h4>
                {/* about */}
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit.
                </p>
              </div>
            </div>

            {/* ------------------- Pierson -------------------  */}

            <div className="staff">
              <div className="staff-img">
                <img
                  src={PlaceHolderImg}
                  height="250"
                  alt="Placeholder Image of Pierson"
                  id="pierson"
                />
              </div>
              {/* name */}
              <div className="staff-about">
                <h3>Pierson</h3>
                {/* title */}
                <h4>Title</h4>
                {/* about */}
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
