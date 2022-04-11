//Library Imports
import React, { useState, useEffect } from "react";

// Need to alter imports
//Embed Content Import
import { TwitterEmbed } from "react-social-media-embed";

import "./styles/twitter.css";

export default function Twitter() {
  const [twitterData, setTwitterData] = useState([]);

  async function getServerData() {
    let tweetsData = await fetch(`http://localhost:5000/get-latest-tweets`);
    tweetsData = await tweetsData.json();
    setTwitterData(tweetsData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  return (
    <>
      <div id="tweets-container">
        <div className="container-header">
          <h2>Twitter</h2>
        </div>
        <div className="container-content">
          <div id="tweets-wrapper">
            {twitterData.map((tweet) => {
              return (
                <div id="tweets-embed">
                  <TwitterEmbed
                    url={`https://twitter.com/PixelAndBracket/status/${tweet.tweetID}`}
                    width="100%"
                    linkText="Loading"
                    style={{
                      marginBottom: 10,
                    }}
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
