import React, { useState, useEffect } from "react";
import "./styles/custom-news.css";

export default function CustomNews() {
  const [articleData, setArticleData] = useState([]);

  async function getServerData() {
    let data = await fetch("http://localhost:5000/get-custom-article");
    data = await data.json();
    setArticleData(data);
  }
  useEffect(() => {
    getServerData();
  }, []);
  return (
    <>
      <div id="custom-news">
        <div id="original-header" className="container-header">
          <h2>Original Article</h2>
          <a id="review-button" href="/submit">
            Submit an article for publication
          </a>
        </div>
        <div className="container-content">
          <div id="custom-news-content">
            <div className="title-container">
              <h3 id="original-title" className="article-title">{articleData.title}</h3>
            </div>

            <div className="source-date">
              <p id="article-source" className="source">
                Written-by: {articleData.author} on {articleData.date}
              </p>
            </div>
            <div className="custom-article-content">
              <p>{articleData.paragraph1}</p>
              <p>{articleData.paragraph2}</p>
              <p>{articleData.paragraph3}</p>
              <p>{articleData.paragraph4}</p>
              <p>{articleData.paragraph5}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
