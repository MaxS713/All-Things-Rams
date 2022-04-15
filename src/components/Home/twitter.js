//Library Imports
import React, { useState, useEffect } from "react";

// Need to alter imports
//Embed Content Import
import { TwitterEmbed } from "react-social-media-embed";

import "./styles/twitter.css";

export default function Twitter() {

  function relativeTime(tweetTime) {
    let diff = Date.now() - tweetTime;
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
                  <p className="source"><span>{tweet.author}</span> tweeted {relativeTime(tweet.time)}</p>
                  <TwitterEmbed
                    url={`https://twitter.com/PixelAndBracket/status/${tweet.ID}`}
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