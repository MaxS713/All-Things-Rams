const {TikTokVideo, LastAPICallTime} = require("../models.js");
const puppeteer = require("puppeteer");

//------------------ Get Instagram Data -----------------//
module.exports = async function getTikTokVideos() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let listOfTikTokUsers = [
    "offical.aaron.donald",
    "cooperkupp",
    "rams",
    "jalen5ramsey",
  ];

  let latestTikTokPosts = [];

  for (let user of listOfTikTokUsers) {
    await page.goto(`https://urlebird.com/user/${user}/`, {
      waitUntil: "domcontentloaded",
    });
    console.log(`Getting TikTok Data from @${user}`);
    let latestPosts = await page.evaluate(() => {
      let results = [];
      let dates = [];
      let links = document.querySelectorAll(".thumb > a");
      let datesText = document.querySelectorAll(
        ".thumb .stats .flex:first-child span"
      );
      datesText.forEach((date) => {
        if (date.innerText[0] === " ") {
          dates.push(date.innerText.slice(1));
        } else {
          dates.push(date.innerText);
        }
      });
      links.forEach((link, index) => {
        results.push({link: link.href.replace(/\D/g, ""), date: dates[index]});
      });
      return results;
    });
    latestPosts = await latestPosts.sort(
      (a, b) => parseTimeAgo(a.date) - parseTimeAgo(b.date)
    );
    latestPosts = await latestPosts.slice(0, 6);
    for (let post of latestPosts) {
      let storedTikTokData = await TikTokVideo.find({});
      let hasDuplicate = false;
      for (let storedPost of storedTikTokData) {
        if (post.link === storedPost.linkID) {
          hasDuplicate = true;
        }
      }
      if (hasDuplicate !== true) {
        post = {...post, author: user};
        latestTikTokPosts.push(post);
      }
    }
  }

  for (let post of latestTikTokPosts) {
    let newPost = new TikTokVideo({
      author: post.author,
      linkID: post.link,
      time: post.date,
    });
    await newPost.save();
  }

  let tiktokData = await TikTokVideo.find({});
  tiktokData = tiktokData.sort(
    (a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time)
  );
  if (tiktokData.length > 40) {
    for (let i = 0; i < tiktokData.length; i++) {
      if (i > 25) {
        let currentID = tiktokData[i]._id;
        await TikTokVideo.deleteOne({_id: currentID});
      }
    }
  }

  console.log("Success!");
  if (latestTikTokPosts.length !== 0) {
    console.table(latestTikTokPosts);
  } else {
    console.log("No new tiktok posts found...");
  }

  await LastAPICallTime.deleteOne({API: "tiktok"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "tiktok",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};

//function to convert the instagram "time ago" measure of time into a number
function parseTimeAgo(timeAgo) {
  timeAgo = timeAgo.replace("s", "");
  timeAgo = timeAgo.split(" ");
  let numberOf;
  let multiplier;
  numberOf = parseInt(timeAgo[0]);
  if (timeAgo[1] === "hour") {
    multiplier = 1;
  } else if (timeAgo[1] === "day") {
    multiplier = 24;
  } else if (timeAgo[1] === "month") {
    multiplier = 30 * 24;
  } else if (timeAgo[1] === "year") {
    multiplier = 12 * 30 * 24;
  }
  return numberOf * multiplier;
}
