import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import {InstagramEmbed, TwitterEmbed} from "react-social-media-embed";

import "../App.css";
import "./styles/bulletin.css";
import "./styles/slick.css";
import "./styles/slick-theme.css";

export default function Bulletin() {
  // var sliderSettings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  const [tweeterData, setTweeterData] = useState([]);
  const [instagramData, setInstagramData] = useState([]);
  // const [newsArticleData, setNewsArticleData] = useState([]);

  async function getServerData() {
    let tweetsData = await fetch(`http://localhost:5000/get-latest-tweets`);
    tweetsData = await tweetsData.json();
    setTweeterData(tweetsData);
    let instagramPostsData = await fetch(
      `http://localhost:5000/get-instagram-posts`
    );
    instagramPostsData = await instagramPostsData.json();
    setInstagramData(instagramPostsData);
    // let newsArticlesData = await fetch(`http://localhost:5000/get-news-articles`);
    // newsArticlesData = await newsArticlesData.json();
    // setNewsArticleData(newsArticlesData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  return (
    <>
      <div id="grid">
        {/* <div id="mainArticle"> */}
        <div id="main-container">
          <div className="container-header">
            <h2>Main</h2>
          </div>
          <div className="container-content"></div>
        </div>

        <div id="aside-container">
          <div className="container-header">
            <h2>Something Else</h2>
          </div>
          <div className="container-content"></div>
        </div>

        {/* <div id="socials"> */}
        <div id="tweets-container">
          <div className="container-header">
            <h2>Twitter</h2>
          </div>
          <div className="container-content">
            <div id="tweets">
              <div id="tweets-embed">
                {tweeterData.map((tweet) => {
                  return (
                    <TwitterEmbed
                      url={`https://twitter.com/PixelAndBracket/status/${tweet.tweetID}`}
                      width="100%"
                      linkText="Loading"
                      style={{
                        marginBottom: 10
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div id="instagram-container">
          <div className="container-header">
            <h2>Instagram</h2>
          </div>

          <div className="container-content">
            <div id="instagram-posts">
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
        {/* </div> */}
      </div>
    </>
  );
}
