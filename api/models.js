const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://MaxS713:nwcc4cJr0mTYpju4@cluster0.bgmkx.mongodb.net/all-things-rams"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

const twitterDataSchema = new mongoose.Schema({
  author: String,
  ID: String,
  time: String,
});

const instagramDataSchema = new mongoose.Schema({
  path: String,
  author: String,
  time: String,
});

const newsArticleSchema = new mongoose.Schema({
  title: String,
  link: String,
  time: String,
  imgSrc: String,
  summary: String,
  source: String,
  sourceLogoRef: String,
});

const videosLinkSchema = new mongoose.Schema({
  title: String,
  link: String,
  time: String,
  imgSrc: String,
  summary: String,
});

const lastAPICallTimeSchema = new mongoose.Schema({
  API: String,
  time: Number,
});

const surveyDataSchema = new mongoose.Schema({
  surveyQuestion: String,
  textAnswer1: String,
  votesAnswer1: { type: Number, default: 0 },
  textAnswer2: String,
  votesAnswer2: { type: Number, default: 0 },
  textAnswer3: String,
  votesAnswer3: { type: Number, default: 0 },
  textAnswer4: String,
  votesAnswer4: { type: Number, default: 0 },
});

const Tweet = mongoose.model("Tweet", twitterDataSchema);
const InstagramPost = mongoose.model("InstagramPost", instagramDataSchema);
const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);
const Video = mongoose.model("Videos", videosLinkSchema);
const LastAPICallTime = mongoose.model(
  "LastAPICallTime",
  lastAPICallTimeSchema
);
const SurveyData = mongoose.model("SurveyData", surveyDataSchema);

module.exports = {
  Tweet,
  InstagramPost,
  NewsArticle,
  Video,
  LastAPICallTime,
  SurveyData,
};
