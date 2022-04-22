//Library Imports -----------//
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
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
const getLatestPicksTweets = require("./get-data/get-twitter-data.js");
const getLatestInstagramPosts = require("./get-data/get-instagram-data.js");
const getLatestNewsData = require("./get-data/get-news-data.js");
const getVideoData = require("./get-data/get-videos-data.js");
const getPodcastData = require("./get-data/get-podcasts-data.js");
// const getTeamData = require("./get-data/get-team-info.js");
const getTikTokVideos = require("./get-data/get-tiktok-data.js");
const getLatestPickTweets = require("./get-data/get-picks-twitter-data.js");

const app = express();
const port = process.env.PORT || 5000;

const twitterRoutes = require("./routes/admin-routes/twitterRoutes");
const twitterUserRoutes = require("./routes/admin-routes/twitterUserRoutes");
const instaRoutes = require("./routes/admin-routes/instaRoutes");
const instaUserRoutes = require("./routes/admin-routes/instaUserRoutes");
const newsRoutes = require("./routes/admin-routes/newsRoutes");
const surveyRoutes = require("./routes/admin-routes/surveyRoutes");
const customArticleRoutes = require("./routes/admin-routes/customArticleRoutes");
app.use(cors());
app.use(express.json());

(async function checkTimeOfLatestAPICall() {
  let currentTime = Date.now();
  let lastTwitterCall = await LastAPICallTime.findOne({ API: "twitter" });
  let lastInstagramCall = await LastAPICallTime.findOne({ API: "instagram" });
  let lastTikTokCall = await LastAPICallTime.findOne({ API: "tiktok" });
  let lastNewsCall = await LastAPICallTime.findOne({ API: "news" });
  let lastPodcastCall = await LastAPICallTime.findOne({ API: "podcast" });
  let lastVideoCall = await LastAPICallTime.findOne({ API: "videos" });
  let lastPicksCall = await LastAPICallTime.findOne({ API: "picks" });

  if (!lastTwitterCall || currentTime - lastTwitterCall.time > 3600000) {
    await getLatestPicksTweets();
  }
  if (!lastInstagramCall || currentTime - lastInstagramCall.time > 43200000) {
    await getLatestInstagramPosts();
  }
  if (!lastTikTokCall || currentTime - lastTikTokCall.time > 21600000) {
    await getTikTokVideos();
  }
  if (!lastNewsCall || currentTime - lastNewsCall.time > 3600000) {
    await getLatestNewsData();
  }
  if (!lastPodcastCall || currentTime - lastPodcastCall.time > 21600000) {
    await getPodcastData();
  }
  if (!lastVideoCall || currentTime - lastVideoCall.time > 21600000) {
    await getVideoData();
  }
  if (!lastPicksCall || currentTime - lastPicksCall.time > 21600000) {
    await getLatestPickTweets();
  }
})();

instaRoutes(app);
twitterRoutes(app);
newsRoutes(app);
instaUserRoutes(app);
twitterUserRoutes(app);
surveyRoutes(app);
customArticleRoutes(app)

app.get("/", async (req, res) => {
  res.send("All Things Rams");
});

app.get("/get-latest-tweets", async (req, res) => {
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

app.get("/get-tweet-picks", async (req, res) => {
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

app.get("/get-more-tweets", async (req, res) => {
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

app.get("/get-instagram-posts", async (req, res) => {
  //function to convert the instagram "time ago" measure of time into a number
  function parseTimeAgo(timeAgo) {
    timeAgo = timeAgo.replace("s", "");
    timeAgo = timeAgo.split(" ");
    let numberOf;
    let multiplier;
    if (timeAgo[1] === "year") {
      return "tooLong";
    }
    if (timeAgo[0] === "a") {
      numberOf = 1;
    } else {
      numberOf = parseInt(timeAgo[0]);
    }
    if (timeAgo[1] === "hour") {
      multiplier = 1;
    } else if (timeAgo[1] === "day") {
      multiplier = 24;
    } else if (timeAgo[1] === "week") {
      multiplier = 24 * 7;
    } else if (timeAgo[1] === "month") {
      multiplier = 30 * 24;
    }
    return numberOf * multiplier;
  }
  let allLatestInstagramPosts = await InstagramPost.find({});
  allLatestInstagramPosts = allLatestInstagramPosts.sort(
    (a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time)
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

app.get("/get-more-instagram-posts", async (req, res) => {
  //function to convert the instagram "time ago" measure of time into a number
  function parseTimeAgo(timeAgo) {
    timeAgo = timeAgo.replace("s", "");
    timeAgo = timeAgo.split(" ");
    let numberOf;
    let multiplier;
    if (timeAgo[1] === "year") {
      return "tooLong";
    }
    if (timeAgo[0] === "a") {
      numberOf = 1;
    } else {
      numberOf = parseInt(timeAgo[0]);
    }
    if (timeAgo[1] === "hour") {
      multiplier = 1;
    } else if (timeAgo[1] === "day") {
      multiplier = 24;
    } else if (timeAgo[1] === "week") {
      multiplier = 24 * 7;
    } else if (timeAgo[1] === "month") {
      multiplier = 30 * 24;
    }
    return numberOf * multiplier;
  }
  let allLatestInstagramPosts = await InstagramPost.find({});
  allLatestInstagramPosts = allLatestInstagramPosts.sort(
    (a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time)
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

app.get("/get-tiktok-posts", async (req, res) => {
  //function to convert the instagram "time ago" measure of time into a number
  function parseTimeAgo(timeAgo) {
    timeAgo = timeAgo.replace("s", "");
    timeAgo = timeAgo.split(" ");
    let numberOf;
    let multiplier;
    if (timeAgo[1] === "year") {
      return "tooLong";
    }
    numberOf = parseInt(timeAgo[0]);
    if (timeAgo[1] === "hour") {
      multiplier = 1;
    } else if (timeAgo[1] === "day") {
      multiplier = 24;
    } else if (timeAgo[1] === "week") {
      multiplier = 24 * 7;
    } else if (timeAgo[1] === "month") {
      multiplier = 30 * 24;
    }
    return numberOf * multiplier;
  }
  let allLatestTikTokPosts = await TikTokVideo.find({});
  allLatestTikTokPosts = allLatestTikTokPosts.sort(
    (a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time)
  );
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

app.get("/get-more-tiktok-posts", async (req, res) => {
  //function to convert the instagram "time ago" measure of time into a number
  function parseTimeAgo(timeAgo) {
    timeAgo = timeAgo.replace("s", "");
    timeAgo = timeAgo.split(" ");
    let numberOf;
    let multiplier;
    if (timeAgo[1] === "year") {
      return "tooLong";
    }
    numberOf = parseInt(timeAgo[0]);
    if (timeAgo[1] === "hour") {
      multiplier = 1;
    } else if (timeAgo[1] === "day") {
      multiplier = 24;
    } else if (timeAgo[1] === "week") {
      multiplier = 24 * 7;
    } else if (timeAgo[1] === "month") {
      multiplier = 30 * 24;
    }
    return numberOf * multiplier;
  }
  let allLatestTikTokPosts = await TikTokVideo.find({});
  allLatestTikTokPosts = allLatestTikTokPosts.sort(
    (a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time)
  );
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

app.get("/get-featured-news", async (req, res) => {
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
});

app.get("/get-news-article", async (req, res) => {
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
  dataToSend = dataToSend.slice(3, 10);
  res.send(dataToSend);
});

app.get("/get-more-news-article", async (req, res) => {
  let dataToSend = await NewsArticle.find({});
  dataToSend = dataToSend.sort(
    (a, b) => Date.parse(b.time) - Date.parse(a.time)
  );
  dataToSend = dataToSend.slice(3, 20);
  res.send(dataToSend);
});

app.get("/get-latest-podcasts", async (req, res) => {
  let allLatestPodcasts = await Podcast.find({});
  allLatestPodcasts = allLatestPodcasts.sort((a, b) => b.time - a.time);
  let dataToSend = [allLatestPodcasts[0]];
  for (let data of allLatestPodcasts) {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  }
  allLatestPodcasts.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 10);
  res.send(dataToSend);
});

app.get("/get-latest-videos", async (req, res) => {
  let allLatestVideos = await Video.find({});
  allLatestVideos.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
  allLatestVideos = allLatestVideos.slice(0, 6);
  res.send(allLatestVideos);
});

app.get("/get-survey-data", async (req, res) => {
  let surveyData = await SurveyData.findOne({});
  res.send(surveyData);
});

app.get("/get-custom-article", async (req, res) => {
  let data = await CustomArticle.findOne({});
  res.send(data);
});

app.post("/post-survey-vote", async (req, res) => {
  let surveyData = await SurveyData.findOne({});
  surveyData.ipAdresses.push(req.body.ip);
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
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "allthingsramstest1234@gmail.com",
    pass: "ATR54321",
  },
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const mail = {
    from: name,
    to: "allthingsramstest1234@gmail.com",
    html: `<p>Name: ${name}</p>
<p>Email: ${email}</p>
<p>Subject: ${subject}</p>
<p>Message: ${message}</p>`,
  };
  await transporter.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

//-------- Submit -------- //

// Needs better authorization
let transporter2 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "allthingsramstest1234@gmail.com",
    pass: "ATR54321",
  },
});

transporter2.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/submit", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  // const attachment = req.body.attachment;
  const mail = {
    from: name,
    to: "allthingsramstest1234@gmail.com",
    subject: "article-submission",
    // attachment: [
    //   {
    //     filename: attachment + ".jpg",
    //     contentType: "image/jpeg",
    //     content: new Buffer.from(req.body.image.split("base64,")[1], "base64"),
    //   },
    // ],
    html: `<p>Name: ${name}</p>
   <p>Email: ${email}</p>`,
  };
  await transporter2.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Submission Sent" });
    }
  });
});

app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});
