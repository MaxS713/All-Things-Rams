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
  LastAPICallTime,
  Video,
  SurveyData,
} = require("./models.js");
const getLatestTweets = require("./get-data/get-twitter-data.js");
const getLatestInstagramPosts = require("./get-data/get-instagram-data.js");
const getLatestNewsData = require("./get-data/get-news-data.js");
const getVideoData = require("./get-data/get-videos-data.js");
const getPodcastData = require("./get-data/get-podcasts-data.js");
const getTeamData = require("./get-data/get-team-info.js");
const getTikTokVideos = require("./get-data/get-tiktok-data.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async function checkTimeOfLatestAPICall() {
  let currentTime = Date.now();
  let lastTwitterCall = await LastAPICallTime.findOne({ API: "twitter" });
  let lastInstagramCall = await LastAPICallTime.findOne({ API: "instagram" });
  let lastNewsCall = await LastAPICallTime.findOne({ API: "news" });
  let lastPodcastCall = await LastAPICallTime.findOne({ API: "podcast" });
  let lastVideoCall = await LastAPICallTime.findOne({ API: "videos" });

  if (!lastTwitterCall || currentTime - lastTwitterCall.time > 3600000) {
    await getLatestTweets();
  }
  if (!lastInstagramCall || currentTime - lastInstagramCall.time > 3600000) {
    await getLatestInstagramPosts();
  }
  if (!lastNewsCall || currentTime - lastNewsCall.time > 3600000) {
    await getLatestNewsData();
  }
  if (!lastPodcastCall || currentTime - lastPodcastCall.time > 3600000) {
    await getPodcastData();
  }
  if (!lastVideoCall || currentTime - lastVideoCall.time > 3600000) {
    await getVideoData();
  }
})();

app.get("/", async (req, res) => {
  await res.send("Hi Maix");
});

app.get("/get-latest-tweets", async (req, res) => {
  let allLatestTweets = await Tweet.find({});
  allLatestTweets = allLatestTweets.sort(
    (a, b) => parseInt(b.ID) - parseInt(a.ID)
  );
  let dataToSend = [allLatestTweets[0]];
  for (let data of allLatestTweets) {
    if (!dataToSend.some((e) => e.author === data.author)) {
      dataToSend.push(data);
    }
  }
  allLatestTweets.forEach((data) => {
    if (dataToSend.includes(data) === false) {
      dataToSend.push(data);
    }
  });
  dataToSend = dataToSend.slice(0, 10);
  await res.send(dataToSend);
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
  await res.send(dataToSend);
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
  await res.send(dataToSend);
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
  dataToSend = dataToSend.slice(3, 13);
  await res.send(dataToSend);
});

app.get("/get-more-news-article", async (req, res) => {
  let dataToSend = await NewsArticle.find({});
  dataToSend = dataToSend.sort(
    (a, b) => Date.parse(b.time) - Date.parse(a.time)
  );
  dataToSend = dataToSend.slice(3, 25);
  await res.send(dataToSend);
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
  await res.send(dataToSend);
});

app.get("/get-latest-videos", async (req, res) => {
  let allLatestVideos = await Video.find({});
  allLatestVideos.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
  allLatestVideos = allLatestVideos.slice(0, 6);
  await res.send(allLatestVideos);
});

app.get("/get-survey-data", async (req, res) => {
  let surveyData = await SurveyData.find({});
  await res.send(surveyData);
});

app.post("/post-survey-vote", async (req, res) => {
  let surveyData = await SurveyData.findOne({});
  if (surveyData.ipAdresses.includes(req.body.ip)) {
    return res.json({ status: "Already Voted" });
  } else {
    surveyData.ipAdresses.push(req.body.ip);
  }
  if (req.body.text === surveyData.textAnswer1) {
    surveyData.votesAnswer1++;
    await surveyData.save();
  } else if (req.body.text === surveyData.textAnswer2) {
    surveyData.votesAnswer2++;
    await surveyData.save();
  }
});

async function createNewSurvey() {
  let question = "What do you prefer?";
  let answer1 = "Instagram";
  let answer2 = "Twitter";
  let newQuestion = new SurveyData({
    surveyQuestion: question,
    textAnswer1: answer1,
    // votesAnswer1: Number,
    textAnswer2: answer2,
    // votesAnswer2: Number,
  });
  await newQuestion.save();
}

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

app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});
