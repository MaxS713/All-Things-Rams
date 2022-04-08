//Library Imports -----------//
import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { TwitterApi } from "twitter-api-v2";
import cheerio from "cheerio";
import axios from "axios";
import puppeteer from "puppeteer";

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/all-things-rams");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

//------------------ All Needed Imports/Requirements -----------------//

//------------------ Twitter Data -----------------//

const client = new TwitterApi({
  appKey: "Vx3ZSb24vmi5uIT2VUTzNzU7i",
  appSecret: "W89gf4TJsicNjurmSxk9ySO4Xc63WdNpY5jP2TjRYFOMm0r4nb",
  accessToken: "823682646840606720-zLTOtJSesKFwWkSI12vy3Bb2a5z5EAa",
  accessSecret: "8c2uLmpd6TolEh0s1axDLYJb7lzBJkAQkcMfsaVCKaOKu",
});

let allTweetsIDs = [];

//Twitter link - https://twitter.com/theramswire?lang=en
//Twitter Numeric ID: 4889534300
const tweetRamsWire = await client.v2.userTimeline("4889534300", {
  exclude: "replies",
});

tweetRamsWire.tweets.forEach((tweet) => {
  allTweetsIDs.push(tweet.id);
});

//Twitter link - https://twitter.com/LARamsNews/with_replies?lang=en
//Twitter Numeric ID: 4722927636
const tweetLaRamsNews = await client.v2.userTimeline("4722927636", {
  exclude: "replies",
});

tweetLaRamsNews.tweets.forEach((tweet) => {
  allTweetsIDs.push(tweet.id);
});

//Twitter link - https://twitter.com/DowntownRams
//Twitter Numeric ID: 733295648976572416
const tweetDowntownRams = await client.v2.userTimeline("733295648976572416", {
  exclude: "replies",
});

tweetDowntownRams.tweets.forEach((tweet) => {
  allTweetsIDs.push(tweet.id);
});

//Twitter link - https://twitter.com/RapSheet?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor
//Twitter Numeric ID: 30142826
const tweetRapSheet = await client.v2.userTimeline("30142826", {
  exclude: "replies",
});

tweetRapSheet.tweets.forEach((tweet) => {
  allTweetsIDs.push(tweet.id);
});

//Twitter link -  https://twitter.com/JourdanRodrigue
//Twitter Numeric ID: 182176877
const tweetJourdanRodrigue = await client.v2.userTimeline("182176877", {
  exclude: "replies",
});

tweetJourdanRodrigue.tweets.forEach((tweet) => {
  allTweetsIDs.push(tweet.id);
});

// https://twitter.com/LATimesklein
//Twitter Numeric ID: 33620284
const tweetLATimesklein = await client.v2.userTimeline("33620284", {
  exclude: "replies",
});

tweetLATimesklein.tweets.forEach((tweet) => {
  allTweetsIDs.push(tweet.id);
});

//Sorting Tweet Data by ID#
allTweetsIDs = allTweetsIDs.sort((a, b) => b - a);

//Slice out first 10 tweets
allTweetsIDs = allTweetsIDs.slice(0, 9);

app.get("/get-latest-tweets", async (req, res) => {
  res.send(allTweetsIDs);
});

//------------------ Instagram Data -----------------//

let instaAccountsArray = [
  // https://www.instagram.com/camakers3/
  { fullName: "Cam Akers", username: "camakers3" },
  // https://www.instagram.com/jalenramsey/
  { fullName: "Jalen Ramsey", username: "jalenramsey" },
  // https://www.instagram.com/cooperkupp/
  { fullName: "Cooper Kupp", username: "cooperkupp" },
  // https://www.instagram.com/j_fuller4/
  { fullName: "Jordan Fuller", username: "j_fuller4" },
  // https://www.instagram.com/aarondonald99/
  { fullName: "Aaron Donald", username: "aarondonald99" },
  // https://www.instagram.com/thill_13/
  { fullName: "Troy Hill", username: "thill_13" },
  // https://www.instagram.com/robertw10ds/
  { fullName: "Robert Woods", username: "robertw10ds" },
  //. https://www.instagram.com/m.d.fox007/
  { fullName: "Morgan Fox", username: "m.d.fox007" },
  // https://www.instagram.com/higbeedoe/
  { fullName: "Tyler Higbee", username: "higbeedoe" },
  // https://www.instagram.com/mbrockers90/
  { fullName: "Michael Brockers", username: "mbrockers90" },
  // https://www.instagram.com/young_forever42/
  { fullName: "Kenny Young", username: "young_forever42" },
  //https://www.instagram.com/jhekk/?hl=en
  { fullName: "Johnny Hekker", username: "jhekk" },
];

// Los Angeles Rams (rams) https://www.instagram.com/rams/
let laramsInstaAccount = { fullName: "Los Angeles Rams", username: "rams" };

function shuffleInstaAccounts() {
  for (var i = instaAccountsArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = instaAccountsArray[i];
    instaAccountsArray[i] = instaAccountsArray[j];
    instaAccountsArray[j] = temp;
  }
  instaAccountsArray.unshift(laramsInstaAccount);
  instaAccountsArray = instaAccountsArray.slice(0, 8);
}
shuffleInstaAccounts();

app.get("/get-insta-accounts", async (req, res) => {
  res.send(instaAccountsArray);
});

//------------------ Podcasts Data -----------------//

// For Podcasts - whenever channels post a new episode:
// https://cms.megaphone.fm/channel/lockedonrams?selected=LKN3949761363
// https://cms.megaphone.fm/channel/VMP2239040395?selected=VMP6429804232
// https://www.spreaker.com/show/downtown-rams-podcast
// https://www.feedspot.com/infiniterss.php?_src=feed_title&followfeedid=5195169&q=site:https%3A%2F%2Ffeeds.simplecast.com%2FN1Urh5XU
// https://www.spreaker.com/show/rams-talk-radio
// https://www.buzzsprout.com/235435

//------------------ News Data -----------------//
// What we want to get from news source: Title/Headline, date, image

// 
// https://www.turfshowtimes.com
// https://www.downtownrams.com
// https://profootballtalk.nbcsports.com/category/teams/nfc/los-angeles-rams/
// http://ramstalk.net/
// https://fansided.com/nfl/
// https://www.espn.com/nfl/team/_/name/lar/los-angeles-rams
// https://www.latimes.com/sports/rams
// https://www.dailynews.com/sports/nfl/los-angeles-rams/
// https://www.ocregister.com/sports/nfl/los-angeles-rams/
// https://www.sandiegouniontribune.com/sports/chargers-rams

// async function getNewsData() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   let newsArticleArray = [];

//   //Webpage we are scraping from --- https://ramblinfan.com
//   await page.goto("https://ramblinfan.com/");
//   await page.waitForSelector(".article-meta .title a");
//   let ramblinLinks = await page.evaluate(() => {
//     let posts = document.querySelectorAll(
//       ".article-meta .title a:nth-child(-n+3)"
//     );
//     let articleLinksList = [];
//     posts.forEach((links) => {
//       let link = links.href;
//       articleLinksList.push(link);
//     });
//     return articleLinksList;
//   });
//   for (let link of ramblinLinks) {
//     await page.goto(link);
//     await page.waitForSelector(".article-header h1");
//     let newsData = await page.evaluate(() => {
//       let title = document.querySelector(".article-header h1").innerText;
//       let time = document.querySelector("time");
//       time = time.getAttribute("datetime");
//       let summary = document.querySelector(".speakable-content");
//       summary = summary.innerText;
//       let imageLink = document.querySelector(".wp-caption a");
//       if (imageLink !== null) {
//         imageLink = imageLink.href;
//       }
//       return {
//         title: title,
//         time: time,
//         summary: summary,
//         imageLink: imageLink,
//       };
//     });
//     newsArticleArray.push(newsData)
//   }

//   // Webpage we are scraping from --- https://theramswire.usatoday.com
//   await page.goto("https://theramswire.usatoday.com");
//   await page.waitForSelector("header .post .post__title");
//   let articleLinks = await page.evaluate(() => {
//     let posts = document.querySelectorAll(
//       "header .post .post__title:nth-child(-n+3)"
//     );
//     let articleLinksList = [];
//     posts.forEach((links) => {
//       let link = links.href;
//       articleLinksList.push(link);
//     });
//     return articleLinksList;
//   });
//   for (let link of articleLinks) {
//     await page.goto(link);
//     await page.waitForSelector(".article-header h1");
//     let newsData = await page.evaluate(() => {
//       let title = document.querySelector(".article-header h1").innerText;
//       let time = document.querySelector("time");
//       time = time.getAttribute("datetime");
//       let summary = document.querySelector(".speakable-content");
//       summary = summary.innerText;
//       let imageLink = document.querySelector(".wp-caption a");
//       if (imageLink !== null) {
//         imageLink = imageLink.href;
//       }
//       return {
//         title: title,
//         time: time,
//         summary: summary,
//         imageLink: imageLink,
//       };
//     });
//     newsArticleArray.push(newsData)
//   }
//   console.log(newsArticleArray);
// }
// getNewsData();

app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});
