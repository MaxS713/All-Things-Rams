const { Video, LastAPICallTime } = require("../models.js");
const puppeteer = require("puppeteer");

//------------------ News Data -----------------//
module.exports = async function getVideoData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  

  await page.goto("https://www.therams.com/video/highlights", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  
  console.log("Getting Video Data")
  let videosData = await page.evaluate(() => {
    let videosDataArray = [];
    let titles = document.querySelectorAll(".d3-o-media-object__title");
    let links = document.querySelectorAll(".d3-o-media-object a");
    let times = document.querySelectorAll(".d3-o-media-object__date");
    let summaries = document.querySelectorAll(".d3-o-media-object__summary");
    let imageLinks = document.querySelectorAll(
      ".d3-o-media-object__figure img"
    );
    for (let i = 0; i < 3; i++) {
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

  await Video.deleteMany({});
  
  for (let data of videosData) {
    let newVideo = new Video({
      title: data.title,
      link: data.link,
      time: data.time,
      summary: data.summary,
      imgSrc: data.imageLink,
    });
    await newVideo.save();
  }
  console.log("Success!");
  console.log(videosData);

  await LastAPICallTime.deleteOne({ API: "videos" });
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "videos",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};
