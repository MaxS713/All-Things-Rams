//Library Imports -----------//
const express = require("express");
const cors = require("cors");
const {
  TweetID,
  InstagramPost,
  NewsArticle,
  LastAPICallTime,
} = require("./models.js");
const getLatestTweets = require("./get-data/get-twitter-data.js");
const getLatestInstagramPosts = require("./get-data/get-instagram-data.js");
const getLatestNewsData = require("./get-data/get-news-data.js");

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
  let currentTime = Date.now();
  let lastTwitterCall = await LastAPICallTime.findOne({ API: "twitter" });
  let lastInstagramCall = await LastAPICallTime.findOne({ API: "instagram" });
  let lastNewsCall = await LastAPICallTime.findOne({ API: "news" });

  if (!lastTwitterCall || currentTime - lastTwitterCall.time > 3600000) {
    await getLatestTweets();
  }
  if (!lastInstagramCall || currentTime - lastInstagramCall.time > 3600000) {
    await getLatestInstagramPosts();
  }
  if (!lastNewsCall || currentTime - lastNewsCall.time > 3600000) {
    await getLatestNewsData();
  }
})();

app.get("/get-latest-tweets", async (req, res) => {
  let allLatestTweets = await TweetID.find({});
  await res.send(allLatestTweets);
});

app.get("/get-instagram-posts", async (req, res) => {
  let allLatestInstagramPosts = await InstagramPost.find({});
  await res.send(allLatestInstagramPosts);
});

app.get("/get-news-article", async (req, res) => {
  let allLatestNewsArticle = await NewsArticle.find({});
  await res.send(allLatestNewsArticle);
});

app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});
