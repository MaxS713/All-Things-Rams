import React, { useState, useEffect } from "react";
import "./styles/videos.css";

export default function LatestVideos() {
  const [videosData, setVideosData] = useState([]);

  async function getServerData() {
    let data = await fetch("http://localhost:5000/get-latest-videos");
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
                    key={index + 1}
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div key={index + 2}>
                      <img
                        key={index + 3}
                        src={video.imgSrc}
                        alt={"Highlight Video Thumbnail"}
                        height="200"
                        className="video-thumbnail"
                      />
                      <h3 key={index + 4}>{video.title}</h3>
                    </div>
                  </a>
                  <p key={index + 5} className="video-date">
                    {video.time}
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
