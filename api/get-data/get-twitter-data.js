const { Tweet, LastAPICallTime } = require("../models.js");
const { TwitterApi } = require("twitter-api-v2");

//------------------ Get Twitter Data -----------------//

module.exports = async function getLatestTweets() {
  const client = new TwitterApi({
    appKey: "Vx3ZSb24vmi5uIT2VUTzNzU7i",
    appSecret: "W89gf4TJsicNjurmSxk9ySO4Xc63WdNpY5jP2TjRYFOMm0r4nb",
    accessToken: "823682646840606720-zLTOtJSesKFwWkSI12vy3Bb2a5z5EAa",
    accessSecret: "8c2uLmpd6TolEh0s1axDLYJb7lzBJkAQkcMfsaVCKaOKu",
  });

  let listOfTwitterUsers = [
    { twitterHandle: "@RamsNFL", userID: "24109979" }, //@RamsNFL
    { twitterHandle: "@TheRamsWire", userID: "4889534300" }, //@TheRamsWire
    { twitterHandle: "@LARamsNews", userID: "4722927636" }, //@LARamsNews
    { twitterHandle: "@DowntownRams", userID: "733295648976572416" }, //@DowntownRams
    { twitterHandle: "@LindseyThiry", userID: "30142826" }, //@LindseyThiry
    { twitterHandle: "@JourdanRodrigue", userID: "182176877" }, // @JourdanRodrigue
    { twitterHandle: "@LATimesklein", userID: "33620284" }, // @LATimesklein
  ];

  let allTweetsData = [];

  for (let twitterUser of listOfTwitterUsers) {
    console.log(`Fetching latest tweets from ${twitterUser.twitterHandle}`);
    let latestTweets = await client.v2.userTimeline(twitterUser.userID, {
      exclude: "replies",
      max_results: 5,
    });
    for (let tweet of latestTweets.tweets) {
      let storedTweetData = await Tweet.find({});
      let hasDuplicate = false;
      for (let storedTweet of storedTweetData) {
        if (tweet.id === storedTweet.ID) {
          hasDuplicate = true;
        }
      }
      if (hasDuplicate !== true) {
        allTweetsData.push({
          author: twitterUser.twitterHandle,
          ID: tweet.id,
        });
      }
    }
  }

  // //Sorting Tweet Data by ID#
  // console.log(`Sorting Data...`);
  // allTweetsData = allTweetsData.sort((a, b) => b.ID - a.ID);

  for (let tweet of allTweetsData) {
    let newTweet = new Tweet({
      author: tweet.author,
      ID: tweet.ID,
    });
    await newTweet.save();
  }

  let tweetData = await Tweet.find({});
  console.log(tweetData)
  tweetData.sort((a, b) => parseInt(b.ID) - parseInt(a.ID));
  console.log(tweetData)
  if (tweetData.length > 50) {
    for (let i = 0; i < tweetData.length; i++) {
      if (i > 50) {
        let currentID = tweetData[i]._id;
        await Tweet.deleteOne({ _id: currentID });
      }
    }
  }

  console.log("Success!");
  if (allTweetsData.length !== 0) {
    console.table(allTweetsData);
  } else {
    console.log("No new tweets found...");
  }

  await LastAPICallTime.deleteOne({ API: "twitter" });
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "twitter",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};
