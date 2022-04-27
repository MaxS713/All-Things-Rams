const {Video, LastAPICallTime} = require("../models.js");
const puppeteer = require("puppeteer");

//------------------ News Data -----------------//
module.exports = async function getVideoData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.therams.com/video/highlights", {
    waitUntil: "networkidle2",
    timeout: 0,
  });

  console.log("Getting Video Data");
  let videosData = await page.evaluate(() => {
    let videosDataArray = [];
    let titles = document.querySelectorAll(".d3-o-media-object__title");
    let links = document.querySelectorAll(".d3-o-media-object a");
    let times = document.querySelectorAll(".d3-o-media-object__date");
    let imageLinks = document.querySelectorAll(
      ".d3-o-media-object__figure img"
    );
    for (let i = 0; i < 6; i++) {
      videosDataArray.push({
        title: titles[i].innerText,
        link: links[i].href,
        time: times[i].innerText,
        author: "Official Rams Website",
        imageLink: imageLinks[i].src.replace("/t_lazy", ""),
      });
    }
    return videosDataArray;
  });

  await page.goto(
    "https://www.youtube.com/channel/UCUdw5lcggxzfecHU9mfxVGw?app=desktop",
    {
      waitUntil: "networkidle2",
      timeout: 0,
    }
  );

  console.log("Getting Rams Loyal Nation Data");
  let youTubeData = await page.evaluate(() => {
    let videosDataArray = [];
    let titles = document.querySelectorAll("#video-title");
    let links = document.querySelectorAll("#video-title");
    let times = document.querySelectorAll("#metadata-line span:nth-child(2)");
    let imageLinks = document.querySelectorAll(
      "ytd-grid-video-renderer #thumbnail #img"
    );
    for (let i = 0; i < titles.length; i++) {
      videosDataArray.push({
        title: titles[i].innerText,
        link: links[i].href,
        time: times[i].innerText,
        author: "Rams Loyal Nation",
        imageLink: imageLinks[i].src,
      });
    }
    return videosDataArray;
  });
  await browser.close();

  let storedVideoData = await Video.find({});
  let videosToAdd = [];

  videosData.forEach((video) => {
    video.time = Date.parse(video.time);
    let hasDuplicate = false;
    for (let storedVideo of storedVideoData) {
      if (video.title === storedVideo.title) {
        hasDuplicate = true;
      }
    }
    if (hasDuplicate !== true) {
      videosToAdd.push(video);
    }
  });

  youTubeData.forEach((video) => {
    video.time = parseTimeAgo(video.time);
    let hasDuplicate = false;
    for (let storedVideo of storedVideoData) {
      if (video.title === storedVideo.title) {
        hasDuplicate = true;
      }
    }
    if (hasDuplicate !== true) {
      videosToAdd.push(video);
    }
  });

  for (let data of videosToAdd) {
    let newVideo = new Video({
      title: data.title,
      link: data.link,
      time: data.time,
      author: data.author,
      imgSrc: data.imageLink,
    });
    await newVideo.save();
  }

  let vidData = await Video.find({});
  vidData = vidData.sort((a, b) => b.time - a.time);
  if (vidData.length > 50) {
    for (let i = 0; i < vidData.length; i++) {
      if (i > 50) {
        let currentID = vidData[i]._id;
        await Video.deleteOne({_id: currentID});
      }
    }
  }

  console.log("Success!");
  if (videosToAdd.length !== 0) {
    console.log(videosToAdd);
  } else {
    console.log("No new videos found...");
  }

  await LastAPICallTime.deleteOne({API: "videos"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "videos",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};

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
