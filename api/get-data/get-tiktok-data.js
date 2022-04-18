const { TikTokVideo, LastAPICallTime } = require("../models.js");
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

  let latestInstagramPosts = [];

  for (let user of listOfInstagramUsernames) {
    await page.goto(`https://urlebird.com/user/${user}/`, {
      waitUntil: "domcontentloaded",
    });
    console.log(`Getting TikTok Data from @${user}`);
    let latestPosts = await page.evaluate(() => {
      let results = [];
      let latestLinks = document.querySelectorAll(".thumb a");
      let linksDate = document.querySelectorAll(".thumb .stats .flex span").innerText;
      // let sorted
      // latestLinks.forEach((link, index) => {
      //   results.push(link.href);
      // });
      // results = results.slice(0, 6);
      return linksDate;
    });

    console.log(latestPosts)

    for (let link of latestPosts) {
      await page.goto(link, { waitUntil: "domcontentloaded" });
      let linkData = await page.evaluate(() => {
        let path = window.location.pathname.replace(/\D/g, "");
        let time = document.querySelector(".video_html5 h6").innerText.slice(7);
        let author = document.querySelector(".nickname").innerText;
        return {
          vidID: path,
          author: author,
          time: time,
        };
      });
      latestInstagramPosts.push(linkData);
    }
  }

  await InstagramPost.deleteMany({});
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
    (a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time)
  );
  if (instaData.length > 25) {
    for (let i = 0; i < instaData.length; i++) {
      if (i > 25) {
        let currentID = instaData[i]._id;
        await InstagramPost.deleteOne({ _id: currentID });
      }
    }
  }

  console.log("Success!");

  await LastAPICallTime.deleteOne({ API: "instagram" });
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
