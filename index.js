//Library Imports -----------//
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

const getLatestTweets = require("./get-data/get-twitter-data.js");
const getLatestInstagramPosts = require("./get-data/get-instagram-data.js");
const getLatestNewsData = require("./get-data/get-news-data.js");
const getVideoData = require("./get-data/get-videos-data.js");
const getPodcastData = require("./get-data/get-podcasts-data.js");
// const getTeamData = require("./get-data/get-team-info.js");
const getTikTokVideos = require("./get-data/get-tiktok-data.js");
const getLatestPickTweets = require("./get-data/get-picks-twitter-data.js");

async function checkTimeOfLatestAPICall() {
  let currentTime = Date.now();
  let lastTwitterCall = await LastAPICallTime.findOne({ API: "twitter" });
  let lastInstagramCall = await LastAPICallTime.findOne({ API: "instagram" });
  let lastTikTokCall = await LastAPICallTime.findOne({ API: "tiktok" });
  let lastNewsCall = await LastAPICallTime.findOne({ API: "news" });
  let lastPodcastCall = await LastAPICallTime.findOne({ API: "podcast" });
  let lastVideoCall = await LastAPICallTime.findOne({ API: "videos" });
  let lastPicksCall = await LastAPICallTime.findOne({ API: "picks" });

  if (!lastTwitterCall || currentTime - lastTwitterCall.time > 3600000) {
    await getLatestTweets();
  }
  if (!lastPicksCall || currentTime - lastPicksCall.time > 21600000) {
    await getLatestPickTweets();
  }
  if (!lastInstagramCall || currentTime - lastInstagramCall.time > 43200000) {
    await getLatestInstagramPosts();
  }
  if (!lastTikTokCall || currentTime - lastTikTokCall.time > 21600000) {
    await getTikTokVideos();
  }
  if (!lastPodcastCall || currentTime - lastPodcastCall.time > 21600000) {
    await getPodcastData();
  }
  if (!lastVideoCall || currentTime - lastVideoCall.time > 21600000) {
    await getVideoData();
  }
  if (!lastNewsCall || currentTime - lastNewsCall.time > 3600000) {
    await getLatestNewsData();
  }
}

const twitterRoutes = require("./routes/admin-routes/twitterRoutes");
const twitterUserRoutes = require("./routes/admin-routes/twitterUserRoutes");
const instaRoutes = require("./routes/admin-routes/instaRoutes");
const instaUserRoutes = require("./routes/admin-routes/instaUserRoutes");
const newsRoutes = require("./routes/admin-routes/newsRoutes");
const surveyRoutes = require("./routes/admin-routes/surveyRoutes");
const customArticleRoutes = require("./routes/admin-routes/customArticleRoutes");

instaRoutes(app);
twitterRoutes(app);
newsRoutes(app);
instaUserRoutes(app);
twitterUserRoutes(app);
surveyRoutes(app);
customArticleRoutes(app);

app.get("/api/get-latest-tweets", async (req, res) => {
  checkTimeOfLatestAPICall()
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

app.get("/api/get-more-tweets", async (req, res) => {
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
  dataToSend = dataToSend.slice(0, 15);
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

app.get("/api/get-more-instagram-posts", async (req, res) => {
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
  dataToSend = dataToSend.slice(0, 10);
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

app.get("/api/get-more-tiktok-posts", async (req, res) => {
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
  dataToSend = dataToSend.slice(0, 10);
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

app.get("/api/get-more-news-article", async (req, res) => {
  let dataToSend = await NewsArticle.find({});
  dataToSend = dataToSend.sort(
    (a, b) => Date.parse(b.time) - Date.parse(a.time)
  );
  dataToSend = dataToSend.slice(0, 20);
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

app.get("/api/get-survey-data", async (req, res) => {
  let surveyData = await SurveyData.find({});
  surveyData = surveyData[surveyData.length - 1];
  res.send(surveyData);
});

app.get("/api/get-custom-article", async (req, res) => {
  let data = await CustomArticle.find({});
  data = data[data.length - 1];
  res.send(data);
});

app.post("/api/post-survey-vote", async (req, res) => {
  let surveyData = await SurveyData.find({});
  surveyData = surveyData[surveyData.length - 1];
  surveyData.ipAddresses.push(req.body.ip);
  if (req.body.text === surveyData.textAnswer1) {
    surveyData.votesAnswer1++;
    await surveyData.save();
  } else if (req.body.text === surveyData.textAnswer2) {
    surveyData.votesAnswer2++;
    await surveyData.save();
  }
});

//-------- Contact -------- //

//Needs better authorization
let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: "allthingsrams.official@gmail.com",
    pass: "tqVfBDMnGN7vWKrc",
  },
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/api/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const mail = {
    from: `${name} <${email}>`,
    to: "allthingsrams.official@gmail.com",
    subject: "Contact from All Things Rams website",
    html: `<p>Name: ${name}</p>
<p>Email: ${email}</p>
<p>Subject:  ${subject}</p>
<p>Message: ${message}</p>`,
  };
  await transporter.sendMail(mail, (error) => {
    if (error) {
      console.log(error);
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

//-------- Submit -------- //

app.post("/api/submit", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  // const attachment = req.body.attachment;
  const mail = {
    from: name,
    to: "allthingsramstest1234@gmail.com",
    subject: "article-submission",
    attachments: [
      {
        content: req.files.file,
      },
    ],
    html: `<p>Name: ${name}</p>
    <p>Email: ${email}</p>`,
  };
  await transporter.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Submission Sent" });
    }
  });
});

const PORT = process.env.PORT || 5000;

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Now listening on " + PORT);
});
