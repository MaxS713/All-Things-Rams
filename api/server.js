//Library Imports -----------//
const express = require("express");
// const nodemailer = require("nodemailer");
const cors = require("cors");
const {
  Tweet,
  InstagramPost,
  NewsArticle,
  LastAPICallTime,
  Video,
  SurveyData,
} = require("./models.js");
const getLatestTweets = require("./get-data/get-twitter-data.js");
const getLatestInstagramPosts = require("./get-data/get-instagram-data.js");
const getLatestNewsData = require("./get-data/get-news-data.js");
const getVideoData = require("./get-data/get-videos-data.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//------------------ Podcasts Data -----------------//

// For Podcasts - whenever channels post a new episode:
// https://cms.megaphone.fm/channel/lockedonrams?selected=LKN3949761363
// https://cms.megaphone.fm/channel/VMP2239040395?selected=VMP6429804232
// https://www.spreaker.com/show/downtown-rams-podcast
// https://www.feedspot.com/infiniterss.php?_src=feed_title&followfeedid=5195169&q=site:https%3A%2F%2Ffeeds.simplecast.com%2FN1Urh5XU
// https://www.spreaker.com/show/rams-talk-radio
// https://www.buzzsprout.com/235435

(async function checkTimeOfLatestAPICall() {
  await getVideoData();
  let currentTime = Date.now();
  let lastTwitterCall = await LastAPICallTime.findOne({ API: "twitter" });
  let lastInstagramCall = await LastAPICallTime.findOne({ API: "instagram" });
  let lastNewsCall = await LastAPICallTime.findOne({ API: "news" });
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
  if (!lastVideoCall || currentTime - lastVideoCall.time > 3600000) {
    await getVideoData();
  }
})();

app.get("/", async (req, res) => {
  await res.send("Hi Maix");
});

app.get("/get-latest-tweets", async (req, res) => {
  let allLatestTweets = await Tweet.find({});
  await res.send(allLatestTweets);
});

app.get("/get-instagram-posts", async (req, res) => {
  let allLatestInstagramPosts = await InstagramPost.find({});
  await res.send(allLatestInstagramPosts);
});

app.get("/get-news-article", async (req, res) => {
  let allLatestNewsArticle = await NewsArticle.find({});
  allLatestNewsArticle = allLatestNewsArticle.slice(3);
  await res.send(allLatestNewsArticle);
});

app.get("/get-featured-news", async (req, res) => {
  let allLatestNewsArticle = await NewsArticle.find({});
  allLatestNewsArticle = allLatestNewsArticle.slice(0,3);
  await res.send(allLatestNewsArticle);
});

app.get("/get-latest-videos", async (req, res) => {
  let allLatestVideos = await Video.find({});
  await res.send(allLatestVideos);
});

app.get("/get-survey-data", async (req, res) => {
  let surveyData = await SurveyData.find({});
  await res.send(surveyData);
});

app.post("/post-survey-vote", async (req, res) => {
  let surveyData = await SurveyData.findOne({});
  if (req.body.text===surveyData.textAnswer1){
    surveyData.votesAnswer1++
    await surveyData.save();
  } else if (req.body.text===surveyData.textAnswer2){
    surveyData.votesAnswer2++
    await surveyData.save();
  }
});

async function createNewSurvey() {
  let question = "What do you prefer?";
  let answer1 = "Hamburgers";
  let answer2 = "Hot-Dogs";
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


/*
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "***************@gmail.com",
    pass: "********",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});



  
 */





app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});
