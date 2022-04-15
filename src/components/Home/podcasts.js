import React, { useState, useEffect } from "react";
import "./styles/podcasts.css";

export default function LatestPodcasts() {
  const [podcastData, setPodcastData] = useState([]);

  async function getServerData() {
    let podcastData = await fetch(`http://localhost:5000/get-latest-podcasts`);
    podcastData = await podcastData.json();
    podcastData.forEach((podcast) => {
      podcast.title = trimTitleLength(podcast.title);
    });
    setPodcastData(podcastData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  function trimTitleLength(string) {
    let trimmedString = string.substr(0, 100);
    if (trimmedString !== string) {
      trimmedString =
        trimmedString.substr(
          0,
          Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
        ) + "\u2026";
    }
    return trimmedString;
  }

  return (
    <>
      <div id="podcast-container">
        <div className="container-header">
          <h2>Latest Rams Podcasts</h2>
        </div>
        <div className="container-content">
          <div id="latest-podcast">
            {podcastData.map((podcast) => {
              return (
                <>
                  <div className="podcast-header">
                    <a
                      href={podcast.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="podcast-logo-container">
                        <img
                          src={require(`../../images/podcast-logo/${podcast.sourceLogoRef}.png`)}
                          alt={`${podcast.author}'s logo`}
                          height="50"
                          className="podcast-logo"
                        />
                      </div>
                      <div className="podcast-title-container">
                        <h3 className="podcast-title">{podcast.title}</h3>
                      </div>
                    </a>
                  </div>

                  <div className="source-date">
                    <p className="source">Date: {podcast.timeString}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
