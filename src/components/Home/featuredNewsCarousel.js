import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "./styles/react-slick-carousel/slick.css";
import "./styles/react-slick-carousel/slick-theme.css";
import "./styles/featuredNewsCarousel.css";

import NextArrow from "./styles/react-slick-carousel/customNextArrow";
import PrevArrow from "./styles/react-slick-carousel/customPrevArrow";

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
      article.title = trimTitleLength(article.title);
    });
    setNewsArticleData(newsArticlesData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  function trimTitleLength(string) {
    let trimmedString = string.substr(0, 140);
    if (trimmedString !== string) {
      trimmedString = trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      ) + "\u2026";
    }
    return trimmedString;
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 6000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div id="featured-news-container">
        <div className="container-header">
          <h2>Featured News</h2>
        </div>

        <div className="container-content">
          <div id="carousel-wrapper">
            <div id="carousel">
              <Slider {...carouselSettings}>
                {newsArticleData.map((newsArticle) => {
                  return (
                    <div className="carousel-item">
                      <img
                        src={newsArticle.imgSrc}
                        className="carousel-img"
                        alt="news article main illustration"
                      />
                      <div className="carousel-article-title">
                        <div className="carousel-news-header">
                          <a
                            href={newsArticle.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="carousel-logo-and-title">
                              <div className="carousel-logo-container">
                                <img
                                  src={require(`../../images/news-logo/${newsArticle.sourceLogoRef}.png`)}
                                  alt={`${newsArticle.source}'s logo`}
                                  height="50"
                                  className="carousel-news-logo"
                                />
                              </div>
                              <div className="carousel-title-container">
                                <h3 className='featured-headline'>{newsArticle.title}</h3>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="carousel-source-date">
                          <p className="carousel-source">
                            Date: {newsArticle.time} &nbsp;|&nbsp; Source: {newsArticle.source}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
