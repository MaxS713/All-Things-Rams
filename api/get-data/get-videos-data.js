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
    let summaries = document.querySelectorAll(".d3-o-media-object__summary");
    let imageLinks = document.querySelectorAll(
      ".d3-o-media-object__figure img"
    );
    for (let i = 0; i < 6; i++) {
      videosDataArray.push({
        title: titles[i].innerText,
        link: links[i].href,
        time: times[i].innerText,
        summary: summaries[i].innerText,
        imageLink: imageLinks[i].src.replace("/t_lazy", ""),
      });
    }
    return videosDataArray;
  });
  await browser.close();

  let storedVideoData = await Video.find({});
  let videosToAdd = [];

  videosData.forEach((video) => {
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
      summary: data.summary,
      imgSrc: data.imageLink,
    });
    await newVideo.save();
  }

  let vidData = await Video.find({});
  vidData = vidData.sort(
    (a, b) => Date.parse(b.time) - Date.parse(a.time)
  );
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
