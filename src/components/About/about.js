//Library Imports
import React, { useState } from "react";

//Style Imports
// import "./styles/about.css";
import "./styles/about.css";

//Asset Imports
import PlaceHolderImg from "./styles/male-placeholder-image.jpeg";
//Image of Joey Viner
import Joey from "./styles/JoeyVinerHeadshot.png";
//Image of Catherine Viner
import Catherine from "./styles/CatherineVinerHeadshot.png";

export default function About() {
  return (
    <>
      <main>
        <section id="about">
          <div id="about-wrapper">
            <div id="about-head">
              <h1 id="about-title">About </h1>
              <p>
                All Things Rams grew our of three dreams. The first dream was to
                have a one-stop shop news source for up-to-date news on the LA
                Rams. Quite honestly, with a little work, we thought we could
                provide a service to all Rams fans: a place where they can
                easily access the latest news and the latest information related
                to their team.{" "}
              </p>
              <p>
                The second dream was to start a business venture. We have been
                friends for years and our friendship has grown over the years
                talking about football. This seemed liked the perfect start to a
                business and way to educate us on how businesses run and
                operate. We love talking sports. We have knowledge of news
                sources and social media, and we thought we could combine all of
                these into one collaboration on this project and the L.A. Rams.
              </p>
              <p>
                The third dream is to see how far this collaboration can take
                us. We are interested in news, marketing, business and the L.A.
                Rams. This project was a collaborative project aimed at giving
                us more experience. We decided that we could use our dreams to
                help you stay on top of the fun, challenging and thrilling news
                related to the L.A. Rams. We look for good new sources and
                filter them for you. We want you to have a place that “feels
                like coming home” or a place that just helps you relax after a
                long day or place – a website – that gets you excited in the
                morning with your morning bagel or coffee.
              </p>
              <p>
                We are always open to suggestions on how to make this website
                and your experience better. We link to news sources and social
                media that we think you would find useful, and we try to add
                content the can itself generate news. This is an honest endeavor
                and just a beginning. We will listen and do our best to keep
                following those three dreams: support L.A. Rams fans, create a
                good business and continue to gain valuable experience – keep
                our eyes open - about how to make our business better. Rams.
              </p>
            </div>

            {/* Steve Said there are 3-4 team members. Image and breif description of each seems appropriate */}
            <div id="team-wrapper">
              <h2>Our Team</h2>

              {/* ------------------- Joey -------------------  */}

              <div className="staff">
                <div className="staff-img">
                  <img
                    src={Joey}
                    alt="Photograph of Joey Viner"
                    id="joey"
                    className="about-photo"
                  />
                </div>
                <div className="staff-about">
                  <h3>Joey Viner</h3>
                  <p>
                    Joey Viner is our number one Rams fan! It’s true no one
                    yells, screams, stares intently or cheers louder for the
                    L.A. Rams than Joey. Through all the ups and down he is the
                    most passionate Rams fan. He is a football news guru. Ask
                    him anything regarding professional football. He’s ready
                    with answer.  He also claims to be the undisputed New
                    England Champion at Mario Kart (though Catherine disputes
                    this). Currently, a Sports Communication Major, Marist
                    College. NY.
                  </p>
                </div>
              </div>

              {/* ------------------- Catherine -------------------  */}

              <div className="staff">
                <div className="staff-img">
                  <img
                    src={Catherine}
                    alt="Photograph of Catherine"
                    id="catherine"
                    className="about-photo"
                  />
                </div>
                <div className="staff-about">
                  <h3>Catherine Viner</h3>
                  <p>
                    Catherine Viner is our chief organizer and taskmaster. She
                    keeps the ball rolling.  Never gives up and knows how to get
                    first downs. She is passionate about the NFL.  If you are
                    talking NFL, she wants “in.” Joey is forever jealous that
                    Catherine was born in St. Louis. It is, however, a little
                    suspicious that when the Rams play the Packers, it seems
                    like Catherine might actually cheer when AJ Dillon gets the
                    ball. Her cousins are die-hard Packer fans. Hmmm. We will
                    give her a break (for now).
                  </p>
                </div>
              </div>

              {/* ------------------- Pierson -------------------  */}

              <div className="staff">
                <div className="staff-img">
                  <img
                    src={PlaceHolderImg}
                    alt="Placeholder Image of Pierson"
                    id="pierson"
                    className="about-photo"
                  />
                </div>
                <div className="staff-about">
                  <h3>Pierson Beatty</h3>
                  <p>
                    Pierson Beatty currently a writing and rhetoric major at
                    Hobart &amp; William Smith Colleges. Also, a philosophy
                    minor. He is a thinker and a writer and cannot get enough
                    football news. Pierson and Joey have been friends – talking
                    football since the 3 rd grade (well, it was 4 th grade for
                    Pierson). If you ever wanted to find out the current moves
                    being made around the NFL, whether it is players, coaches or
                    staff, ask Pierson. It’s in his blood. Rumer has it that he
                    is next in line for Adam Schefter’s job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
