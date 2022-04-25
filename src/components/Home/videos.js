import React, { useState, useEffect } from "react";
import "./styles/videos.css";

export default function LatestVideos() {
  const [videosData, setVideosData] = useState([]);

  async function getServerData() {
    let data = await fetch("https://all-thing-rams-server.herokuapp.com/api/get-latest-videos");
    data = await data.json();
    setVideosData(data);
  }
  useEffect(() => {
    getServerData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
