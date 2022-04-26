//Library Imports
import React, { useState, useEffect } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import "./styles/instagram.css";

export default function Instagram(props) {

  function relativeTime(instaTime) {
    let diff = Date.now() - instaTime;
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
  
  const [instagramData, setInstagramData] = useState([]);

  async function getServerData() {
    let instagramPostsData
    if (props.location === "socials") {
      instagramPostsData = await fetch("http://localhost:5000/api/get-more-instagram-posts");
    } else {
      instagramPostsData = await fetch("http://localhost:5000/api/get-instagram-posts");
    }
    instagramPostsData = await instagramPostsData.json();
    setInstagramData(instagramPostsData);
  }
  useEffect(() => {
    getServerData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div id="instagram-container">
        <div className="container-header">
          <h2>Instagram</h2>
        </div>

        <div className="container-content">
          <div id="instagram-wrapper">
            {instagramData.map((instagramPost, index) => {
              return (
                <div key={index} id="instagram-embed">
                  <p key={index+1} className="source"><span>{instagramPost.author}</span> posted {relativeTime(instagramPost.time)}</p>
                  <InstagramEmbed
                    url={`https://www.instagram.com${instagramPost.path}`}
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
