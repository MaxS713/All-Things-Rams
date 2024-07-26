const { PickTweet, LastAPICallTime } = require("../models.js");
const { TwitterApi } = require("twitter-api-v2");

//------------------ Get Twitter Data -----------------//

module.exports = async function getLatestPickTweets() {
  const client = new TwitterApi({
    appKey: "Vx3ZSb24vmi5uIT2VUTzNzU7i",
    appSecret: "W89gf4TJsicNjurmSxk9ySO4Xc63WdNpY5jP2TjRYFOMm0r4nb",
    accessToken: "823682646840606720-zLTOtJSesKFwWkSI12vy3Bb2a5z5EAa",
    accessSecret: "8c2uLmpd6TolEh0s1axDLYJb7lzBJkAQkcMfsaVCKaOKu",
  });

  let listOfTwitterUsers = [{twitterHandle: "@AllThingsRams_", userID:"1516451940577726473"}, {twitterHandle: "@pbeats_ats", userID:"1516471388416221186"}]

  let allTweetsData = [];

  for (let twitterUser of listOfTwitterUsers) {
    console.log(`Fetching latest tweets from ${twitterUser.twitterHandle}`);
    let latestTweets = await client.v2.userTimeline(twitterUser.userID, {
      exclude: "replies",
      max_results: 5,
    });
    for (let tweet of latestTweets.tweets) {
      let storedTweetData = await PickTweet.find({});
      let hasDuplicate = false;
      for (let storedTweet of storedTweetData) {
        if (tweet.id === storedTweet.ID) {
          hasDuplicate = true;
        }
      }
      if (hasDuplicate !== true) {
        allTweetsData.push({
          author: twitterUser.twitterHandle,
          text: tweet.text.slice(20) + "...",
          ID: tweet.id,
        });
      }
    }
  }

  for (let tweet of allTweetsData) {
    let newTweet = new PickTweet({
      author: tweet.author,
      text: tweet.text,
      ID: tweet.ID,
    });
    await newTweet.save();
  }

  let tweetData = await PickTweet.find({});
  tweetData.sort((a, b) => parseInt(b.ID) - parseInt(a.ID));
  if (tweetData.length > 25) {
    for (let i = 0; i < tweetData.length; i++) {
      if (i >25) {
        let currentID = tweetData[i]._id;
        await PickTweet.deleteOne({ _id: currentID });
      }
    }
  }

  console.log("Success!");
  if (allTweetsData.length !== 0) {
    console.table(allTweetsData);
  } else {
    console.log("No new tweets found...");
  }

  await LastAPICallTime.deleteOne({ API: "picks" });
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "picks",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};
