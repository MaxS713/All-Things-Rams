import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./styles/featuredNewsCarousel.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function FeaturedNewsCarousel() {
  const [newsArticleData, setNewsArticleData] = useState([]);
  async function getServerData() {
    let newsArticlesData = await fetch(
      `http://localhost:5000/get-featured-news`
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div id="featured-news-container">
        <div className="container-header">
          <h2>Featured News</h2>
        </div>

        <div className="container-content">
          <div id="carousel-wrapper">
            <div>
            <Carousel showThumbs={false} showStatus={false} autoPlay={true}>
              {newsArticleData.map((newsArticle) => {
                return (
                  <div className="carousel-item">
                    <img
                      src={newsArticle.imgSrc}
                      className='carousel-img'
                      height="200"
                      width="300"
                      alt="news article main illustration"
                    />
                  </div>
                );
              })}
            </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* 
<div className="news-header">
                    <div className="logo-container">
                      <a
                        href={newsArticle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={require(`../../images/news-logo/${newsArticle.sourceLogoRef}.png`)}
                          alt={`${newsArticle.source}'s logo`}
                          height="40"
                          className="news-logo"
                        />
                      </a>
                    </div>
                    <div className="news-title">
                      <a
                        href={newsArticle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3>{newsArticle.title}</h3>
                      </a>
                    </div>
                  </div>

                  <p className="source">
                    Date: {newsArticle.time}
                    <br></br>
                    Source: {newsArticle.source}
                  </p> */
}
