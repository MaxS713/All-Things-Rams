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
    });
    setNewsArticleData(newsArticlesData);
  }
  useEffect(() => {
    getServerData();
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 7000,
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
                        className='carousel-img'
                        alt="news article main illustration"
                      />
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

