import React, { useState, useEffect } from "react";

import "./styles/videos.css";

export default function LatestVideos() {

  function relativeTime(vidTime) {
    let diff = Date.now() - vidTime;
    if (!diff) return;
    if (diff < 0) {
      return "From the future!";
    }
    const datetimeUnits = [
      "year",
      "month",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond",
    ];
    let datetimeParts = new Date(diff)
      .toISOString()
      .split(/\D/)
      .map((x) => parseInt(x));
    datetimeParts[0] -= 1970;
    datetimeParts[1] -= 1;
    datetimeParts[2] -= 1;
    let primaryUnit, secondaryUnit, primaryQuotient, secondaryQuotient;
    for (let i = 0; i < datetimeUnits.length - 1; i++) {
      if (datetimeParts[i] === 0) {
        continue;
      }
      [primaryUnit, secondaryUnit] = datetimeUnits.slice(i, i + 2);
      [primaryQuotient, secondaryQuotient] = datetimeParts.slice(i, i + 2);
      break;
    }
    let diffStr = `${primaryQuotient} ${primaryUnit}${
      primaryQuotient !== 1 ? "s" : ""
    }`;
    if (secondaryQuotient > 0) {
      diffStr += ` and ${secondaryQuotient} ${secondaryUnit}${
        secondaryQuotient !== 1 ? "s" : ""
      }`;
    }
    return `${diffStr} ago`;
  }

  const [videosData, setVideosData] = useState([]);

  async function getServerData() {
    let data = await fetch("api/get-latest-videos");
    data = await data.json();
    setVideosData(data);
  }
  useEffect(() => {
    getServerData();
  }, []);

  return (
    <>
      <div id="videos-container">
        <div className="container-header">
          <h2>Latest Videos</h2>
        </div>
        <div className="container-content">
          <div id="latest-videos">
            {videosData.map((video, index) => {
              return (
                <div key={index} className="video-item">
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <img
                        src={video.imgSrc}
                        alt={"Highlight Video Thumbnail"}
                        className="video-thumbnail"
                      />
                      <h3>{video.title}</h3>
                    </div>
                  </a>
                  <p className="video-date">
                    {relativeTime(video.time)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
