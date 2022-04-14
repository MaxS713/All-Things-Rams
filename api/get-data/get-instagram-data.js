const {InstagramPost, LastAPICallTime} = require("../models.js");
const puppeteer = require("puppeteer");

//------------------ Get Instagram Data -----------------//
module.exports = async function getLatestInstagramPosts() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let listOfInstagramUsernames = [
    {fullName: "Cam Akers", username: "camakers3"},
    {fullName: "Jalen Ramsey", username: "jalenramsey"},
    {fullName: "Cooper Kupp", username: "cooperkupp"},
    {fullName: "Jordan Fuller", username: "j_fuller4"},
    {fullName: "Aaron Donald", username: "aarondonald99"},
    {fullName: "Troy Hill", username: "thill_13"},
    {fullName: "Robert Woods", username: "robertw10ds"},
    {fullName: "Morgan Fox", username: "m.d.fox007"},
    {fullName: "Tyler Higbee", username: "higbeedoe"},
    {fullName: "Michael Brockers", username: "mbrockers90"},
    {fullName: "Johnny Hekker", username: "jhekk"},
  ];

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

      let storedInstaData = await InstagramPost.find({});
      let hasDuplicate = false;
      for (let storedPost of storedInstaData) {
        if (linkData.path === storedPost.path) {
          hasDuplicate = true;
        }
      }
      if (hasDuplicate !== true) {
        latestInstagramPosts.push(linkData);
      }
    }
  }

  console.log(`Sorting Data...`);
  latestInstagramPosts = latestInstagramPosts.sort(
    (a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time)
  );

  console.log(`Slicing Data...`);
  latestInstagramPosts = latestInstagramPosts.slice(0, 5);

  for (let instagramPost of latestInstagramPosts) {
    let newPost = new InstagramPost({
      path: instagramPost.path,
      author: instagramPost.author,
      time: instagramPost.time,
    });
    await newPost.save();
  }
  console.log("Success!");
  console.table(latestInstagramPosts);
  await LastAPICallTime.deleteOne({API: "instagram"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "instagram",
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
