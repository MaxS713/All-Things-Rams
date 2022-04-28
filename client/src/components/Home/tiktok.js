//Library Imports
import React, { useState, useEffect } from "react";
import { TikTokEmbed } from 'react-social-media-embed';
import "./styles/tiktok.css";

export default function Tiktok(props) {

  function relativeTime(tiktokTime) {
    let diff = Date.now() - tiktokTime;
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

  const [tiktokData, setTiktokData] = useState([]);

  async function getServerData() {
    let tiktokPostsData;
    if (props.location === "socials") {
      tiktokPostsData = await fetch("http://localhost:5000/api/get-more-tiktok-posts");
    } else {
      tiktokPostsData = await fetch("http://localhost:5000/api/get-tiktok-posts");
    }
    tiktokPostsData = await tiktokPostsData.json();
    setTiktokData(tiktokPostsData);
  }
  useEffect(() => {
    getServerData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div id="tiktok-container">
        <div className="container-header">
          <h2>Tik-Tok</h2>
        </div>

        <div className="container-content">
          <div id="tiktok-wrapper">
            {tiktokData.map((tiktokPost, index) => {
              return (
                <div key={index} id="tiktok-embed">
                  <p key={index+1} className="source"><span key={index+2}>{tiktokPost.author}</span> posted {relativeTime(tiktokPost.time)}</p>
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
