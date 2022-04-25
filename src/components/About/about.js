//Style Imports
// import "./styles/about.css";
import "./styles/about.css";

//Asset Imports
//Image of Joey Viner
import Joey from "./styles/JoeyVinerHeadshot.png";
//Image of Catherine Viner
import Catherine from "./styles/CatherineVinerHeadshot.png";
//Image of Pierson Beatty
import Pierson from "./styles/PiersonBeattyHeadshot.png";

export default function About() {
  return (
    <>
      <main>
        <section id="about">
          <div id="about-wrapper">
            <div id="about-head">
              <h1 id="about-title">About </h1>
              <p>
                All Things Rams grew out of three dreams. The first dream is to
                have a one-stop shop news source for up-to-date news on the L.A.
                Rams. Quite honestly, with a little work, we thought we could
                provide a service to all Rams fans: a place where they can
                easily access the latest news and the latest information related
                to their team.
              </p>
              <p>
                The second dream is to start a business venture. We have been
                friends for years, and our friendship has grown over the years,
                mostly through talking about football. This seem liked the
                perfect business. We could fill a need, doing something we
                love.We love talking sports.
              </p>
              <p>
                The third dream is to see how far this collaboration can take
                us. We are deeply interested in news, marketing, business and
                the L.A. Rams. This project was a collaborative project aimed at
                giving us more experience with the goal of seeing how far we can
                go with it or what we could learn. We aim to provide you with
                fun, challenging and exciting news related to the L.A. Rams. We
                look for good news and media sources and filter them for you. We
                will invite your participation too. We want you to have a place
                that “feels like home” or a place that just helps you relax
                after a long day. Or, your first website that you visit with the
                morning Cheerios, bagel or coffee.
              </p>
              <p>
                We invite suggestions on how to make this website and your
                experience better. We will attempt to link to news sources and
                social media that we think you would find useful, fun and
                interesting. Also, we plan to add original content or ideas.
                This is an honest endeavor, and we hope it is just a beginning.
                We will listen and do our best to keep following those three
                dreams: (1) support L.A. Rams fans, (2) create a good business
                for all and (3) continue to gain valuable experience from you -
                keep our eyes open - about how to make our business and your
                experience just a little better.
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
                    alt="Portrait of Joey Viner"
                    id="joey"
                    className="about-photo"
                  />
                </div>
                <div className="staff-about">
                  <h3>Joey Viner</h3>
                  <p>
                    Joey Viner is our number one Rams fan! It's true no one
                    watches the game with more intensity or cheers louder for
                    the L.A. Rams than Joey. He became a Rams fan during his
                    formative years growing up in St. Louis. His passion for the
                    Rams has never waned when he moved to Vermont. He clearly is
                    our most passionate Rams fan. He is also a football news
                    guru, as well as general sports news enthusiast. Ask him
                    anything regarding professional football. He's ready with an
                    answer. He also claims to be the undisputed New England
                    Champion at Mario Kart (though Catherine disputes this).Joey
                    is currently a Sports Communication Major at Marist College,
                    Poughkeepsie, NY.
                  </p>
                </div>
              </div>

              {/* ------------------- Catherine -------------------  */}

              <div className="staff">
                <div className="staff-img">
                  <img
                    src={Catherine}
                    alt="Portrait of Catherine Viner"
                    id="catherine"
                    className="about-photo"
                  />
                </div>
                <div className="staff-about" id="catherine-about">
                  <h3>Catherine Viner</h3>
                  <p>
                    Catherine Viner is our chief organizer and taskmaster. She
                    keeps the ball rolling. Never gives up. Knows how to get
                    first downs. She is passionate about the NFL. If you are
                    talking about the NFL, she wants “in.” Joey is forever
                    jealous that Catherine was born in St. Louis. It is,
                    however, a little more than suspicious that when the Rams
                    play the Packers, Catherine might actually cheer when AJ
                    Dillon gets the ball. Hmmm. Her cousins are die-hard Packer
                    fans. Do you know any other kind of Packer fans? We will
                    give her a break (for now).
                  </p>
                </div>
              </div>

              {/* ------------------- Pierson -------------------  */}

              <div className="staff">
                <div className="staff-img">
                  <img
                    src={Pierson}
                    alt="Portrait of Pierson Beatty"
                    id="pierson"
                    className="about-photo"
                  />
                </div>
                <div className="staff-about">
                  <h3>Pierson Beatty</h3>
                  <p>
                    Pierson Beatty is passionate about the NFL. Sometimes he
                    claims that he's a journalism student. Other times he is
                    known as a writing and rhetoric major and soon to be
                    graduate of Hobart &amp; William Smith Colleges. Also, a
                    philosophy minor. He is a thinker and a writer, who cannot
                    get enough football news. Pierson and Joey have been friends
                    talking football since the third grade. Pierson thinks he is
                    a wizard when betting against the spread. If find out the
                    current, or potential, moves being made the NFL regarding
                    players, coaches or staff, ask Pierson. It's in his blood.
                    Rumer has it that he is next in line for Adam Schefter's
                    job.
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
