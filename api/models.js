const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://MaxS713:nwcc4cJr0mTYpju4@cluster0.bgmkx.mongodb.net/all-things-rams"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

const twitterDataSchema = new mongoose.Schema({
  tweetID: String,
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
});

const lastAPICallTimeSchema = new mongoose.Schema({
  API: String,
  time: Number,
});

const TweetID = mongoose.model("TweetID", twitterDataSchema);
const InstagramPost = mongoose.model("InstagramPost", instagramDataSchema);
const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);
const LastAPICallTime = mongoose.model(
  "LastAPICallTime",
  lastAPICallTimeSchema
);

module.exports = { TweetID, InstagramPost, NewsArticle, LastAPICallTime };
