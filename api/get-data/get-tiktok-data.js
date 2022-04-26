const {TikTokVideo, TikTokUser, LastAPICallTime} = require("../models.js");
const puppeteer = require("puppeteer");

//------------------ Get Instagram Data -----------------//
module.exports = async function getTikTokVideos() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let listOfTikTokUsers = await TikTokUser.find({})

  let latestTikTokPosts = [];
  let lastTikTokCall = await LastAPICallTime.findOne({API: "tiktok"});
  for (let user of listOfTikTokUsers) {
    await page.goto(`https://urlebird.com/user/${user.username}/`, {
      waitUntil: "domcontentloaded",
    });
    console.log(`Getting TikTok Data from @${user.username}`);
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
        results.push({
          link: link.href.replace(/\D/g, ""),
          date: dates[index],
        });
      });
      return results;
    });
    latestPosts.forEach((post) => {
      while (post.link.length !== 19) {
        post.link = post.link.slice(1);
      }
      post.date = parseTimeAgo(post.date)
    });
    latestPosts = latestPosts.sort(
      (a, b) => b.date - a.date
    );
    latestPosts = latestPosts.slice(0, 6);
    for (let post of latestPosts) {
      if (post.date > lastTikTokCall.time) {
        post = {...post, author: user.username};
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
    (a, b) => b.time - a.time
  );
  if (tiktokData.length > 40) {
    for (let i = 0; i < tiktokData.length; i++) {
      if (i > 40) {
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

//function to convert "time ago" measure of time into time in ms
function parseTimeAgo(timeAgo) {
  timeAgo = timeAgo.replace("s", "");
  timeAgo = timeAgo.split(" ");
  let numberOf;
  let multiplier;
  if (timeAgo[0] === "a") {
    numberOf = 1;
  } else {
    numberOf = parseInt(timeAgo[0]);
  }
  if (timeAgo[1] === "hour") {
    multiplier = 3600000;
  } else if (timeAgo[1] === "minute") {
    multiplier = 60000;
  } else if (timeAgo[1] === "day") {
    multiplier = 86400000;
  } else if (timeAgo[1] === "week") {
    multiplier = 604800000;
  } else if (timeAgo[1] === "month") {
    multiplier = 2629746000;
  } else if (timeAgo[1] === "year") {
    multiplier = 31557600000;
  }
  return Date.now() - numberOf * multiplier;
}
