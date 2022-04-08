import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { InstagramEmbed } from "react-social-media-embed";
import { List } from "react-content-loader";

import "../App.css";
import "./styles/bulletin.css"
import "./styles/slick.css";
import "./styles/slick-theme.css";

export default function Bulletin() {
  var sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [latestTweets, setLatestTweets] = useState([]);

  async function getLatestRamsTweetIDs() {
    let tweetsIDs = await fetch(`http://localhost:5000/get-latest-tweets`);
    tweetsIDs = await tweetsIDs.json();
    setLatestTweets(tweetsIDs);
  }
  useEffect(() => {
    getLatestRamsTweetIDs();
  }, []);

  const [instagramAccounts, setInstagramAccounts] = useState([]);

  async function getInstagramAccounts() {
    let instagramData = await fetch(`http://localhost:5000/get-insta-accounts`);
    instagramData = await instagramData.json();
    setInstagramAccounts(instagramData);
  }
  useEffect(() => {
    getInstagramAccounts();
  }, []);

  return (
    <>
      <div id="grid">
      {/* <div id="mainArticle"> */}
        <div className="containerMain">
          <div className="containerHead">
            <h2>Main Article</h2>
          </div>
          <div className="containerContent"></div>
        </div>

        <div className="containerMore">
          <div className="containerHead">
            <h2>More Stories</h2>
          </div>
          <div className="containerContent"></div>
        </div>
        {/* </div> */}

        {/* <div id="socials"> */}
        <div className="containerTweets">
          <div className="containerHead">
            <h2>Tweets</h2>
          </div>
          <div className="containerContent">
            <div id="tweetContainer">
              <div id="tweets">
                {latestTweets.map((tweetID) => {
                  return (
                    <TwitterTweetEmbed
                      onLoad={function noRefCheck() {}}
                      placeholder={<List />}
                      tweetId={tweetID}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="containerInsta">
          <div className="containerHead">
            <h2>Posts</h2>
          </div>

          <div className="containerContent">
            <div id="insta-slider">
              <Slider {...sliderSettings}>
                {instagramAccounts.map((instagramAccount) => {
                  return (
                    <InstagramEmbed
                      url={`https://www.instagram.com/${instagramAccount.username}`}
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
        {/* </div> */}

      </div>
    </>
  );
}
