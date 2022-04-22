const {Podcast, LastAPICallTime} = require("../models.js");

module.exports = async function getPodcastData() {
  const api = require("podcast-index-api")(
    "7HE9JCMFVURJN6GYVKGC",
    "$GafgxCXw#P8kJ4Xe$aVTqQjtB6DX8546Uw4bvDs"
  );

  let listOfPodcasts = [
    {podcastName: "Locked On Rams", searchID: 4037264},
    {podcastName: "Turf Show Times", searchID: 573567},
    {podcastName: "Downtown Rams", searchID: 891683},
    {podcastName: "11 Personnel", searchID: 599430},
    {podcastName: "Rams Talk Radio", searchID: 9114},
    {podcastName: "Rams Brothers", searchID: 589136},
  ];

  let allPodcastData = [];

  for (let podcast of listOfPodcasts) {
    console.log(`Fetching latest podcasts from ${podcast.podcastName}`);
    let latestPodcasts = await api.episodesByFeedId(`${podcast.searchID}`);
    latestPodcasts = latestPodcasts.items;
    for (let i = 0; i < 3; i++) {
      let lastPodcastCall = await LastAPICallTime.findOne({ API: "podcast" });
      if (latestPodcasts[i].datePublished*1000 > lastPodcastCall.time) {
        allPodcastData.push({
          title: latestPodcasts[i].title,
          link: latestPodcasts[i].enclosureUrl,
          author: podcast.podcastName,
          summary: latestPodcasts[i].description,
          image: latestPodcasts[i].feedImage,
          time: latestPodcasts[i].datePublished,
          timeString: latestPodcasts[i].datePublishedPretty,
        });
      }
    }
  }

  for (let podcast of allPodcastData) {
    let newPodcast = new Podcast({
      title: podcast.title,
      link: podcast.link,
      author: podcast.author,
      summary: podcast.summary,
      image: podcast.image,
      time: podcast.time,
      timeString: podcast.timeString,
      sourceLogoRef: podcast.author.replace(/\s/g, ""),
    });
    await newPodcast.save();
  }

  let podcastData = await Podcast.find({});
  podcastData = podcastData.sort((a, b) => b.time - a.time);
  if (podcastData.length > 50) {
    for (let i = 0; i < podcastData.length; i++) {
      if (i > 50) {
        let currentID = podcastData[i]._id;
        await Podcast.deleteOne({_id: currentID});
      }
    }
  }

  console.log("Success!");
  if (allPodcastData.length !== 0) {
    console.log(allPodcastData);
  } else {
    console.log("No new podcasts found...");
  }
  await LastAPICallTime.deleteOne({API: "podcast"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "podcast",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};
