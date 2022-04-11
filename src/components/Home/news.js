import React, { useState, useEffect } from "react";
import "./styles/news.css"


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
                  <img src={newsArticle.imgSrc} width="200" />
                  <a href={newsArticle.link}>
                    <h3>{newsArticle.title}</h3>
                  </a>
                  <p>Date: {newsArticle.time}</p>
                  <p>Source: {newsArticle.source}</p>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
