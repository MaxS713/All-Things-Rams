//Library Imports
import React, { useState, useEffect } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import "./styles/instagram.css"

export default function Instagram() {
  const [instagramData, setInstagramData] = useState([]);

  async function getServerData() {
    let instagramPostsData = await fetch(
      `http://localhost:5000/get-instagram-posts`
    );
    instagramPostsData = await instagramPostsData.json();
    setInstagramData(instagramPostsData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  return (
    <>
      <div id="instagram-container">
        <div className="container-header">
          <h2>Instagram</h2>
        </div>

        <div className="container-content">
          <div id="instagram-wrapper">
            <div id="instagram-embed">
              {instagramData.map((instagramPost) => {
                return (
                  <InstagramEmbed
                    url={`https://www.instagram.com${instagramPost.path}`}
                    width="100%"
                    linkText="Loading"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
