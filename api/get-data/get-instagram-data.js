const {InstagramPost, InstagramUser, LastAPICallTime} = require("../models.js");
const puppeteer = require("puppeteer");

//------------------ Get Instagram Data -----------------//
module.exports = async function getLatestInstagramPosts() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let listOfInstagramUsernames = await InstagramUser.find({});
  // for (let user of listOfInstagramUsernames){
  //   let newInstaUser = new InstagramUser({fullName: user.fullName, username: user.username})
  //   await newInstaUser.save()
  // }

  let latestInstagramPosts = [];

  for (let user of listOfInstagramUsernames) {
    await page.goto(`https://imginn.org/${user.username}/`, {
      waitUntil: "domcontentloaded",
    });
    console.log(
      `Getting Instagram Data from ${user.fullName}, ${user.username}`
    );
    let latestPosts = await page.evaluate(() => {
      let results = [];
      let latestLinks = document.querySelectorAll(".post-items a");
      latestLinks.forEach((link) => {
        results.push(link.href);
      });
      results = results.slice(0, 3);
      return results;
    });
    let lastInstagramCall = await LastAPICallTime.findOne({API: "instagram"});
    for (let link of latestPosts) {
      await page.goto(link, {waitUntil: "domcontentloaded"});
      let linkData = await page.evaluate(() => {
        let path = window.location.pathname;
        let time = document.querySelector(".date").innerText;
        let author = document.querySelector(".nickname").innerText;
        return {
          path: path,
          author: author,
          time: time,
        };
      });
      linkData.time = await parseTimeAgo(linkData.time)
      // if (linkData.time > lastInstagramCall.time) {
        latestInstagramPosts.push(linkData);
      // }
    }
  }

  for (let instagramPost of latestInstagramPosts) {
    let newPost = new InstagramPost({
      path: instagramPost.path,
      author: instagramPost.author,
      time: instagramPost.time,
    });
    await newPost.save();
  }

  let instaData = await InstagramPost.find({});
  instaData = instaData.sort(
    (a, b) => a.time - b.time
  );
  if (instaData.length > 25) {
    for (let i = 0; i < instaData.length; i++) {
      if (i > 25) {
        let currentID = instaData[i]._id;
        await InstagramPost.deleteOne({_id: currentID});
      }
    }
  }

  console.log("Success!");
  if (latestInstagramPosts.length !== 0) {
    console.table(latestInstagramPosts);
  } else {
    console.log("No new instagram posts found...");
  }

  await LastAPICallTime.deleteOne({API: "instagram"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "instagram",
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
