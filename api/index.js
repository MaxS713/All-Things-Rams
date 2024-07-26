//Library Imports -----------//
const express = require("express");
const cors = require("cors");
const app = require("express")();

const port = 5000;

const {
  Tweet,
  InstagramPost,
  NewsArticle,
  Podcast,
  TikTokVideo,
  CustomArticle,
  LastAPICallTime,
  Video,
  PickTweet,
  SurveyData,
} = require("./models.js");

app.get("/api/get-latest-tweets", async (req, res) => {
  let allLatestPicksTweets = await Tweet.find({});
  allLatestPicksTweets = allLatestPicksTweets.sort(
    (a, b) => parseInt(b.ID) - parseInt(a.ID)
  );
  let dataToSend = [allLatestPicksTweets[0]];
  for (let data of allLatestPicksTweets) {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  }
  allLatestPicksTweets.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 8);
  res.send(dataToSend);
});

app.get("/api/get-tweet-picks", async (req, res) => {
  let allLatestPicksTweets = await PickTweet.find({});
  allLatestPicksTweets = allLatestPicksTweets.sort(
    (a, b) => parseInt(b.ID) - parseInt(a.ID)
  );
  let dataToSend = [allLatestPicksTweets[0]];
  for (let data of allLatestPicksTweets) {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  }
  dataToSend = dataToSend.slice(0, 2);
  res.send(dataToSend);
});

app.get("/api/get-instagram-posts", async (req, res) => {
  let allLatestInstagramPosts = await InstagramPost.find({});
  allLatestInstagramPosts = allLatestInstagramPosts.sort(
    (a, b) => b.time - a.time
  );
  let dataToSend = [allLatestInstagramPosts[0]];
  allLatestInstagramPosts.forEach((data) => {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  });
  allLatestInstagramPosts.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 5);
  res.send(dataToSend);
});

app.get("/api/get-tiktok-posts", async (req, res) => {
  let allLatestTikTokPosts = await TikTokVideo.find({});
  allLatestTikTokPosts = allLatestTikTokPosts.sort((a, b) => b.time - a.time);
  let dataToSend = [allLatestTikTokPosts[0]];
  allLatestTikTokPosts.forEach((data) => {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  });
  allLatestTikTokPosts.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 5);
  res.send(dataToSend);
});

app.get("/api/get-featured-news", async (req, res) => {
  let allFeaturedArticles = await NewsArticle.find({ isFeatured: true });
  if (allFeaturedArticles.length === 0) {
    let allLatestNewsArticle = await NewsArticle.find({});
    allLatestNewsArticle = allLatestNewsArticle.sort(
      (a, b) => Date.parse(b.time) - Date.parse(a.time)
    );
    let dataToSend = [allLatestNewsArticle[0]];
    allLatestNewsArticle.forEach((data) => {
      if (!dataToSend.some((e) => e.source === data.source)) {
        dataToSend.push(data);
      }
    });
    allLatestNewsArticle.forEach((data) => {
      if (dataToSend.includes(data) === false) {
        dataToSend.push(data);
      }
    });
    dataToSend = dataToSend.slice(0, 3);
    res.send(dataToSend);
  } else {
    allFeaturedArticles = allFeaturedArticles.slice(0, 6);
    res.send(allFeaturedArticles);
  }
});

app.get("/api/get-news-article", async (req, res) => {
  let allLatestNewsArticle = await NewsArticle.find({});
  allLatestNewsArticle = allLatestNewsArticle.sort(
    (a, b) => Date.parse(b.time) - Date.parse(a.time)
  );
  let dataToSend = [allLatestNewsArticle[0]];
  allLatestNewsArticle.forEach((data) => {
    if (!dataToSend.some((e) => e.source === data.source)) {
      dataToSend.push(data);
    }
  });
  allLatestNewsArticle.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 8);
  res.send(dataToSend);
});

app.get("/api/get-latest-podcasts", async (req, res) => {
  let allLatestPodcasts = await Podcast.find({});
  allLatestPodcasts = allLatestPodcasts.sort((a, b) => b.time - a.time);
  let dataToSend = [allLatestPodcasts[0]];
  allLatestPodcasts.forEach((data) => {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  });
  allLatestPodcasts.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 10);
  res.send(dataToSend);
});

app.get("/api/get-latest-videos", async (req, res) => {
  let allLatestVideos = await Video.find({});
  allLatestVideos.sort((a, b) => b.time - a.time);
  let dataToSend = [allLatestVideos[0]];
  allLatestVideos.forEach((data) => {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  });
  allLatestVideos.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 6);
  res.send(dataToSend);
});

app.get("/api/get-custom-article", async (req, res) => {
  let data = await CustomArticle.find({});
  data = data[data.length - 1];
  res.send(data);
});

app.listen(port, () => {
  console.log("Now listening on " + port);
});

module.exports = app;
