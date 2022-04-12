import React, { useState, useEffect } from "react";
import "./styles/news.css";

export default function LatestNews() {
  const [newsArticleData, setNewsArticleData] = useState([]);

  async function getServerData() {
    let newsArticlesData = await fetch(
      `http://localhost:5000/get-news-article`
    );
    newsArticlesData = await newsArticlesData.json();
    newsArticlesData.forEach((article) => {
      article.time = Date.parse(article.time);
      let date = new Date(article.time);
      article.time = date.toLocaleString();
    });
    setNewsArticleData(newsArticlesData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  return (
    <>
      <div id="featured-news-container">
        <div className="container-header">
          <h2>Latest Rams News</h2>
        </div>
        <div className="container-content">
          <div id="latest-news">
            {newsArticleData.map((newsArticle) => {
              return (
                <>
                  <a
                    href={newsArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{newsArticle.title}</h3>
                  </a>
                  <img src={newsArticle.imgSrc} alt="news article main illustration" width="300" />

                  <p>
                    Date: {newsArticle.time} 
                    <br></br>
                    Source: {newsArticle.source}
                  </p>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

/*
//REACT SLICK documentation for faded carousel

import React, { Component } from "react";
import Slider from "react-slick";
import { baseUrl } from "./config";

export default class Fade extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>Fade</h2>
        <Slider {...settings}>
          <div>
            <img src={baseUrl + "/abstract01.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract02.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract03.jpg"} />
          </div>
          <div>
            <img src={baseUrl + "/abstract04.jpg"} />
          </div>
        </Slider>
      </div>
    );
  }
}

 */