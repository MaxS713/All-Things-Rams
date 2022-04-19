//Library Imports
import React, { useState, useEffect } from "react";
import { TikTokEmbed } from 'react-social-media-embed';
import "./styles/tiktok.css";

export default function Tiktok() {
  const [tiktokData, setTiktokData] = useState([]);

  async function getServerData() {
    let tiktokPostsData = await fetch(
      `http://localhost:5000/get-tiktok-posts`
    );
    tiktokPostsData = await tiktokPostsData.json();
    settiktokData(tiktokPostsData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  return (
    <>
      <div id="tiktok-container">
        <div className="container-header">
          <h2>Tik-Tok</h2>
        </div>

        <div className="container-content">
          <div id="tiktok-wrapper">
            {tiktokData.map((tiktokPost) => {
              return (
                <div id="tiktok-embed">
                  <p className="source"><span>{tiktokPost.author}</span> posted {tiktokPost.time}</p>
                  <TikTokEmbed
                    url={`https://www.tiktok.com/@${tiktokPost.author}/video/${tiktokPost.linkID}`}
                    width="100%"
                    linkText="Loading"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
