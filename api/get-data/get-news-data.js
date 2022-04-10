const {NewsArticle, LastAPICallTime} = require ("../models.js");
const puppeteer = require ("puppeteer")

//------------------ News Data -----------------//
module.exports = async function getLatestNewsData() {

  await LastAPICallTime.deleteOne({API: "news"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "news",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let newsArticleArray = [];

  //https://ramblinfan.com
  await page.goto("https://ramblinfan.com/", {waitUntil: "domcontentloaded"});
  let ramblinLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".article-meta .title a");
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });

  for (let link of ramblinLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".article-header h1").innerText;
      let time = document.querySelector("time");
      time = time.getAttribute("datetime");
      let summary = document.querySelector(".speakable-content").innerText;
      let imageLink = document.querySelector('[property="og:image"]');
      if (imageLink !== null) {
        imageLink = imageLink.getAttribute("content");
      }
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "Ramblin Fan",
      };
    });
    newsArticleArray.push(newsData);
  }

  //https://theramswire.usatoday.com
  await page.goto("https://theramswire.usatoday.com", {
    waitUntil: "domcontentloaded",
  });
  let ramsWireLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll("header .bundle .post .post__title");
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of ramsWireLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "networkidle2"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".entry__title__wrapper h1").innerText;
      let time = document.querySelector('[itemprop="datePublished"]');
      time = time.getAttribute("content");
      let summary = document.querySelector(
        "#content-container .articleBody p"
      ).innerText;
      let imageLink = document.querySelector(".article__thumbnail img");
      if (imageLink !== null) {
        imageLink = imageLink.src;
      }
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "USA Today",
      };
    });
    newsArticleArray.push(newsData);
  }

  //https://www.turfshowtimes.com
  await page.goto("https://www.turfshowtimes.com", {
    waitUntil: "domcontentloaded",
  });
  let turfLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll('[data-analytics-link="article"]');
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of turfLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".c-page-title").innerText;
      let time = document.querySelector('[data-ui="timestamp"]');
      time = time.getAttribute("datetime");
      let summary = document.querySelector(".c-entry-content p").innerText;
      let imageLink = document.querySelector(".c-picture img");
      if (imageLink !== null) {
        imageLink = imageLink.src;
      }
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "Turf Show Times",
      };
    });
    newsArticleArray.push(newsData);
  }

  //https://www.downtownrams.com
  await page.goto("https://www.downtownrams.com/single-post/category/rams/", {
    waitUntil: "domcontentloaded",
  });
  let downtownRamsLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".list-post .entry-title a");
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of downtownRamsLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".post-title").innerText;
      let time = document.querySelector(".entry-date");
      time = time.getAttribute("datetime");
      let summary = document.querySelector(".entry-content p").innerText;
      let imageLink = document.querySelector(".post-image a");
      if (imageLink !== null) {
        imageLink = imageLink.href;
      }
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "Downtown Rams",
      };
    });
    newsArticleArray.push(newsData);
  }

  //https://profootballtalk.nbcsports.com/
  await page.goto(
    "https://profootballtalk.nbcsports.com/category/teams/nfc/los-angeles-rams/",
    {waitUntil: "domcontentloaded"}
  );
  let proFootballTalkLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".entry-header .entry-title a");
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of proFootballTalkLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".entry-title").innerText;
      let time = document.querySelector(".entry-date").innerText;
      let summary = document.querySelector(".entry-content p").innerText;
      let imageLink = document.querySelector(".entry-content img");
      if (imageLink !== null) {
        imageLink = imageLink.src;
      }
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "NBC Sports",
      };
    });
    newsArticleArray.push(newsData);
  }

  //http://ramstalk.net/
  await page.goto("http://ramstalk.net/tag/rams/", {
    waitUntil: "domcontentloaded",
  });
  let ramsTalkLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(
      "#archive-list-wrap .infinite-post a"
    );
    let articleLinksList = [];
    posts.forEach((links) => {
      let link = links.href;
      articleLinksList.push(link);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of ramsTalkLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".post-title").innerText;
      let time = document.querySelector(".post-date time");
      time = time.getAttribute("datetime");
      let summary = document.querySelector("#content-main p").innerText;
      let imageLink = document.querySelector("#post-feat-img img");
      if (imageLink !== null) {
        imageLink = imageLink.src;
      }
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "Rams Talk",
      };
    });
    newsArticleArray.push(newsData);
  }

  //https://fansided.com/
  await page.goto("https://fansided.com/nfl/teams/los-angeles-rams/", {
    waitUntil: "domcontentloaded",
  });
  let fanSidedLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".title a");
    let articleLinksList = [];
    posts.forEach((link) => {
      articleLinksList.push(link.href);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of fanSidedLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".article-header h1").innerText;
      let time = document.querySelector(".byline time");
      time = time.getAttribute("datetime");
      let summary = document.querySelector(".speakable-content").innerText;
      let imageLink = document.querySelector('head [property="og:image"]');
      imageLink = imageLink.getAttribute("content");
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "Fansided",
      };
    });
    newsArticleArray.push(newsData);
  }

  //https://www.espn.com/
  await page.goto("https://www.espn.com/nfl/team/_/name/lar/los-angeles-rams", {
    waitUntil: "networkidle2",
  });
  let espnLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".contentItem__content--standard");
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
  for (let link of espnLinks) {
    console.log(`Fetching data from ${link.postURL}...`);
    await page.goto(link.postURL, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".article-header h1").innerText;
      let time = document.querySelector(".article-meta .timestamp");
      time = time.getAttribute("data-date");
      let summary = document.querySelector(
        ".article .article-body p"
      ).innerText;
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        newsSource: "ESPN",
      };
    });
    newsData = {...newsData, imageLink: link.imageLink};
    newsArticleArray.push(newsData);
  }

  //https://www.latimes.com/
  await page.goto("https://www.latimes.com/sports/rams", {
    waitUntil: "domcontentloaded",
  });
  let laTimesLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll(".promo-title .link");
    let articleLinksList = [];
    posts.forEach((link) => {
      articleLinksList.push(link.href);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of laTimesLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(".headline").innerText;
      let time = document.querySelector(".byline time");
      time = time.getAttribute("datetime");
      let summary = document.querySelector(".page-article-body p").innerText;
      let imageLink = document.querySelector(".image");
      imageLink = imageLink.src;
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "LA Times",
      };
    });
    newsArticleArray.push(newsData);
  }
  
  
  //https://www.dailynews.com/

  await page.goto("https://www.dailynews.com/sports/nfl/los-angeles-rams/", {
    waitUntil: "domcontentloaded",
  });
  let dailyNewsLinks = await page.evaluate(() => {
    let posts = document.querySelectorAll("main .entry-title .article-title");
    let articleLinksList = [];
    posts.forEach((link) => {
      articleLinksList.push(link.href);
    });
    articleLinksList = articleLinksList.slice(0, 3);
    return articleLinksList;
  });
  for (let link of dailyNewsLinks) {
    console.log(`Fetching data from ${link}...`);
    await page.goto(link, {waitUntil: "domcontentloaded"});
    let newsData = await page.evaluate(() => {
      let title = document.querySelector(
        ".headline-area .entry-title"
      ).innerText;
      let time = document.querySelector("main .time time");
      time = time.getAttribute("datetime");
      let summary = document.querySelector(".article-body p").innerText;
      let imageLink = document.querySelector(".image-wrapper img");
      imageLink = imageLink.src;
      return {
        title: title,
        articleLink: window.location.href,
        time: time,
        summary: summary,
        imageLink: imageLink,
        newsSource: "LA Daily News",
      };
    });
    await browser.close();
    newsArticleArray.push(newsData);
  }
  

  console.log(`Sorting Data...`)
  newsArticleArray = newsArticleArray.sort(
    (a, b) => Date.parse(b.time) - Date.parse(a.time)
  );
  

  console.log(`Slicing Data...`)
  newsArticleArray = newsArticleArray.slice(0, 10);
  
  await NewsArticle.deleteMany({});

  for (let newsArticle of newsArticleArray) {
    let newPost = new NewsArticle({
      title: newsArticle.title,
      link: newsArticle.articleLink,
      time: newsArticle.time,
      imgSrc: newsArticle.imageLink,
      summary: newsArticle.summary,
      source: newsArticle.newsSource,
    });
    await newPost.save();
  }
  console.log("Success!")
  console.log(newsArticleArray)
}
