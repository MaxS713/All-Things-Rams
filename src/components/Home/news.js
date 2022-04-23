import React, {useState, useEffect} from "react";
import "./styles/news.css";

export default function LatestNews(props) {
  const [newsArticleData, setNewsArticleData] = useState([]);

  async function getServerData() {
    let newsArticlesData;
    if (props.location === "news") {
      newsArticlesData = await fetch("api/get-more-news-article");
    } else {
      newsArticlesData = await fetch("api/get-news-article");
    }
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
  });

  function trimTitleLength(string) {
    let trimmedString = string.substr(0, 140);
    if (trimmedString !== string) {
      trimmedString =
        trimmedString.substr(
          0,
          Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
        ) + "\u2026";
    }
    return trimmedString;
  }

  return (
    <>
      <div id="news-container">
        <div className="container-header">
          <h2>Latest Rams News</h2>
        </div>
        <div className="container-content">
          <div id="latest-news">
            {newsArticleData.map((newsArticle, index) => {
              return (
                <div key={index}>
                  <div key={index + 1} className="news-header">
                    <a
                      key={index + 2}
                      href={newsArticle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div key={index + 3} className="logo-container">
                        <img
                          key={index + 4}
                          src={require(`../../images/news-logo/${newsArticle.sourceLogoRef}.png`)}
                          alt={`${newsArticle.source}'s logo`}
                          height="50"
                          className="news-logo"
                        />
                      </div>
                      <div key={index + 5} className="title-container">
                        <h3 key={index + 6} className="article-title">
                          {newsArticle.title}
                        </h3>
                      </div>
                    </a>
                  </div>

                  <div key={index + 7} className="source-date">
                    <p key={index + 8} className="source">
                      Date: {newsArticle.time} &nbsp;|&nbsp; Source:
                      {newsArticle.source}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
