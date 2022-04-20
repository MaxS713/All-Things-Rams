//Database Connect
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://MaxS713:nwcc4cJr0mTYpju4@cluster0.bgmkx.mongodb.net/all-things-rams"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

const twitterDataSchema = new mongoose.Schema({
  author: String,
  text: String,
  ID: String,
});

const twitterPickDataSchema = new mongoose.Schema({
  author: String,
  text: String,
  ID: String,
});

const instagramDataSchema = new mongoose.Schema({
  path: String,
  author: String,
  time: String,
});

const instagramUserSchema = new mongoose.Schema({
  fullName: String,
  username: String,
});

const twitterUserSchema = new mongoose.Schema({
  twitterHandle: String,
  userID: String,
});

const tikTokSchema = new mongoose.Schema({
  linkID: String,
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

const podcastSchema = new mongoose.Schema({
  title: String,
  link: String,
  author: String,
  summary: String,
  time: Number,
  timeString: String,
  image: String,
  sourceLogoRef: String,
});

const videosLinkSchema = new mongoose.Schema({
  title: String,
  link: String,
  time: String,
  imgSrc: String,
  summary: String,
});

const customArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  date: String,
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
  ipAdresses: { type: Array, default: ["1"] }
});

const Tweet = mongoose.model("Tweet", twitterDataSchema);
const PickTweet = mongoose.model("PickTweet", twitterPickDataSchema);
const TwitterUser = mongoose.model("TwitterUser", twitterUserSchema);
const InstagramPost = mongoose.model("InstagramPost", instagramDataSchema);
const InstagramUser = mongoose.model("InstagramUser", instagramUserSchema);
const TikTokVideo = mongoose.model("TikTokVideo", tikTokSchema);
const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);
const Podcast = mongoose.model("Podcasts", podcastSchema);
const Video = mongoose.model("Videos", videosLinkSchema);
const LastAPICallTime = mongoose.model(
  "LastAPICallTime",
  lastAPICallTimeSchema
);
const SurveyData = mongoose.model("SurveyData", surveyDataSchema);
const CustomArticle = mongoose.model("CustomArticle", customArticleSchema);

module.exports = {
  Tweet,
  PickTweet,
  CustomArticle,
  TwitterUser,
  InstagramPost,
  InstagramUser,
  TikTokVideo,
  NewsArticle,
  Podcast,
  Video,
  LastAPICallTime,
  SurveyData,
};
