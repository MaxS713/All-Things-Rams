const {NewsArticle, LastAPICallTime} = require("../models.js");
const puppeteer = require("puppeteer");

//------------------ News Data -----------------//
module.exports = async function getLatestNewsData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let newsArticleArray = [];
  let lastNewsCall = await LastAPICallTime.findOne({API: "news"});

  //https://ramblinfan.com
  await page.goto("https://ramblinfan.com/", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let ramblinLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".article-meta .title a");
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (ramblinLinks) {
    for (let link of ramblinLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "domcontentloaded", timeout: 0});
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".article-header h1");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector("time");
          if (time) {
            time = time.getAttribute("datetime");
          } else {
            return;
          }
          let imageLink = document.querySelector('[property="og:image"]');
          if (imageLink) {
            imageLink = imageLink.getAttribute("content");
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "Ramblin Fan",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://theramswire.usatoday.com
  await page.goto("https://theramswire.usatoday.com", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let ramsWireLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll("header .bundle .post .post__title");
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (ramsWireLinks) {
    for (let link of ramsWireLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "networkidle2", timeout: 0});
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".entry__title__wrapper h1");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector('[itemprop="datePublished"]');
          if (time) {
            time = time.getAttribute("content");
          } else {
            return;
          }
          let imageLink = document.querySelector(".article__thumbnail img");
          if (imageLink) {
            imageLink = imageLink.src;
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "Ramswire - USA Today",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://www.turfshowtimes.com
  await page.goto("https://www.turfshowtimes.com", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let turfLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll('[data-analytics-link="article"]');
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (turfLinks) {
    for (let link of turfLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "domcontentloaded", timeout: 0});
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".c-page-title");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector('[data-ui="timestamp"]');
          if (time) {
            time = time.getAttribute("datetime");
          } else {
            return;
          }
          let imageLink = document.querySelector(".c-picture img");
          if (imageLink) {
            imageLink = imageLink.src;
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "Turf Show Times",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://www.downtownrams.com
  await page.goto("https://www.downtownrams.com/single-post/category/rams/", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let downtownRamsLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".list-post .entry-title a");
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (downtownRamsLinks) {
    for (let link of downtownRamsLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "domcontentloaded", timeout: 0});
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".post-title");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector(".entry-date");
          if (time) {
            time = time.getAttribute("datetime");
          } else {
            return;
          }
          let imageLink = document.querySelector(".post-image a");
          if (imageLink) {
            imageLink = imageLink.href;
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "Downtown Rams",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://profootballtalk.nbcsports.com/
  await page.goto(
    "https://profootballtalk.nbcsports.com/category/teams/nfc/los-angeles-rams/",
    {waitUntil: "domcontentloaded", timeout: 0}
  );
  let proFootballTalkLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".entry-header .entry-title a");
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (proFootballTalkLinks) {
    for (let link of proFootballTalkLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "domcontentloaded", timeout: 0});
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".entry-title");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector(".entry-date");
          if (time) {
            time = time.innerText;
          } else {
            return;
          }
          let imageLink = document.querySelector(".entry-content img");
          if (imageLink) {
            imageLink = imageLink.src;
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "NBC Sports",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //http://ramstalk.net/
  await page.goto("http://ramstalk.net/tag/rams/", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let ramsTalkLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(
      "#archive-list-wrap .infinite-post a"
    );
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (ramsTalkLinks) {
    for (let link of ramsTalkLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "networkidle2", timeout: 0});
        let newsData = await page.evaluate(() => {
          let findPodcast = document.querySelector("#content-main iframe");
          if (findPodcast !== null) {
            return;
          }
          let title = document.querySelector(".post-title");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector(".post-date time");
          time = time.getAttribute("datetime");
          let imageLink = document.querySelector("#post-feat-img img");
          if (imageLink) {
            imageLink = imageLink.src;
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "Rams Talk",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://fansided.com/
  await page.goto("https://fansided.com/nfl/teams/los-angeles-rams/", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let fanSidedLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".title a");
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((link) => {
      articleLinksList.push(link.href);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (fanSidedLinks) {
    for (let link of fanSidedLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "domcontentloaded", timeout: 0});
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".article-header h1");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector(".byline time");
          time = time.getAttribute("datetime");
          let imageLink = document.querySelector('head [property="og:image"]');
          if (imageLink) {
            imageLink = imageLink.getAttribute("content");
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "Fansided",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://www.espn.com/
  await page.goto("https://www.espn.com/nfl/team/_/name/lar/los-angeles-rams", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  let espnLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".contentItem__content--standard");
    if (!posts) {
      return;
    }
    let postsImages = document.querySelectorAll(
      ".contentItem__content--standard .media-wrapper img"
    );
    let imgLinks = [];
    postsImages.forEach((imageLink) => {
      imgLinks.push(imageLink.src);
    });
    let articleLinksList = [];
    posts.forEach((link, index) => {
      let postURL = link.href;
      articleLinksList.push({postURL: postURL, imageLink: imgLinks[index]});
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (espnLinks) {
    for (let link of espnLinks) {
      if (link.postURL) {
        console.log(`Fetching data from ${link.postURL}...`);
        await page.goto(link.postURL, {
          waitUntil: "domcontentloaded",
          timeout: 0,
        });
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".article-header h1");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector(".article-meta .timestamp");
          time = time.getAttribute("data-date");
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            newsSource: "ESPN",
          };
        });
        newsData = {...newsData, imageLink: link.imageLink};
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://www.latimes.com/
  await page.goto("https://www.latimes.com/sports/rams", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let laTimesLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".promo-title .link");
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((link) => {
      articleLinksList.push(link.href);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (laTimesLinks) {
    for (let link of laTimesLinks) {
      if (link) {
        console.log(`Fetching data from ${link}...`);
        await page.goto(link, {waitUntil: "domcontentloaded", timeout: 0});
        let newsData = await page.evaluate(() => {
          let title = document.querySelector(".headline");
          if (title) {
            title = title.innerText;
          } else {
            return;
          }
          let time = document.querySelector(".byline time");
          time = time.getAttribute("datetime");
          let imageLink = document.querySelector(".image");
          if (imageLink) {
            imageLink = imageLink.src;
          } else {
            return;
          }
          return {
            title: title,
            articleLink: window.location.href,
            time: time,
            imageLink: imageLink,
            newsSource: "LA Times",
          };
        });
        if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
          newsArticleArray.push(newsData);
        }
      }
    }
  }

  //https://www.dailynews.com/

  await page.goto("https://www.dailynews.com/sports/nfl/los-angeles-rams/", {
    waitUntil: "domcontentloaded",
    timeout: 0,
  });
  let dailyNewsLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll("main .entry-title .article-title");
    if (!posts) {
      return;
    }
    let articleLinksList = [];
    posts.forEach((link) => {
      articleLinksList.push(link.href);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  if (dailyNewsLinks) {
    for (let link of dailyNewsLinks) {
      console.log(`Fetching data from ${link}...`);
      await page.goto(link, {waitUntil: "domcontentloaded", timeout: 0});
      let newsData = await page.evaluate(() => {
        let title = document.querySelector(".headline-area .entry-title");
        if (title) {
          title = title.innerText;
        } else {
          return;
        }
        let time = document.querySelector("main .time time");
        time = time.getAttribute("datetime");
        let imageLink = document.querySelector(".image-wrapper img");
        if (imageLink) {
          imageLink = imageLink.src;
        } else {
          return;
        }
        return {
          title: title,
          articleLink: window.location.href,
          time: time,
          imageLink: imageLink,
          newsSource: "LA Daily News",
        };
      });
      if (newsData && Date.parse(newsData.time) > lastNewsCall.time) {
        newsArticleArray.push(newsData);
      }
    }
  }

  await browser.close();

  for (let newsArticle of newsArticleArray) {
    let newPost = new NewsArticle({
      title: newsArticle.title,
      link: newsArticle.articleLink,
      time: newsArticle.time,
      imgSrc: newsArticle.imageLink,
      source: newsArticle.newsSource,
      sourceLogoRef: newsArticle.newsSource.replace(/\s/g, ""),
      isFeatured: false,
    });
    await newPost.save();
  }

  let allNewsData = await NewsArticle.find({});
  allNewsData = allNewsData.sort(
    (a, b) => Date.parse(b.time) - Date.parse(a.time)
  );
  if (allNewsData.length > 50) {
    for (let i = 0; i < allNewsData.length; i++) {
      if (i > 50) {
        let currentID = allNewsData[i]._id;
        await NewsArticle.deleteOne({_id: currentID});
      }
    }
  }

  console.log("Success!");
  if (newsArticleArray.length !== 0) {
    console.log(newsArticleArray);
  } else {
    console.log("No new article found...");
  }

  await LastAPICallTime.deleteOne({API: "news"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "news",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};
