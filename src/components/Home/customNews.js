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

  console.log(articleData);
  return (
    <>
      <div id="custom-news">
          <div className="container-header">
            <h2>Custom Article</h2>
          </div>
          <div className="container-content">
          <div id="custom-news-content">
            <div className="title-container">
              <h3 className="article-title">{articleData.title}</h3>
            </div>

            <div className="source-date">
              <p className="source">
                Written-by: {articleData.author} on {articleData.date}
              </p>
            </div>
            <div className="custom-article-content">{articleData.content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
