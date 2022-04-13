import React, { useState, useEffect } from "react";
import VideoModal from "./videoModal.js"
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

  const [showModal, setShowModal] = useState(false);
  const [urlIndex, setUrlIndex] = useState();

  function handleVideoModal() {
    if (showModal === true) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }

  return (
    <>
      <div id="videos-container">
        <div className="container-header">
          <h2>Latest Videos</h2>
        </div>
        <div className="container-content">
          <div id="latest-videos">
            {videosData.map((video, index) => {
              console.log(video);
              return (
                <>
                  {/* <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  > */}
                    <div className="videos-header" onClick={() => {setUrlIndex(index); handleVideoModal()}}>
                      <img
                        src={video.imgSrc}
                        alt={"Highlight Video Thumbnail"}
                        height="200"
                        className="video-thumbnail"
                      />
                      <h3>{video.title}</h3>
                    </div>
                  {/* </a> */}
                  <div className="video-date">
                    {video.time}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <VideoModal src={""} modalState={showModal} handleVideoModal={handleVideoModal}/>
    </>
  );
}
