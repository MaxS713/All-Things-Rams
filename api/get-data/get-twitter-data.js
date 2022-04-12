const {Tweet, LastAPICallTime} = require("../models.js");
const {TwitterApi} = require("twitter-api-v2");

//------------------ Get Twitter Data -----------------//

module.exports = async function getLatestTweets() {
  const client = new TwitterApi({
    appKey: "Vx3ZSb24vmi5uIT2VUTzNzU7i",
    appSecret: "W89gf4TJsicNjurmSxk9ySO4Xc63WdNpY5jP2TjRYFOMm0r4nb",
    accessToken: "823682646840606720-zLTOtJSesKFwWkSI12vy3Bb2a5z5EAa",
    accessSecret: "8c2uLmpd6TolEh0s1axDLYJb7lzBJkAQkcMfsaVCKaOKu",
  });

  let listOfTwitterUsers = [
    {twitterHandle: "@TheRamsWire", userID: "4889534300"}, //@TheRamsWire
    {twitterHandle: "@LARamsNews", userID: "4722927636"}, //@LARamsNews
    {twitterHandle: "@DowntownRams", userID: "733295648976572416"}, //@DowntownRams
    {twitterHandle: "@LindseyThiry", userID: "30142826"}, //@LindseyThiry
    {twitterHandle: "@JourdanRodrigue", userID: "182176877"}, // @JourdanRodrigue
    {twitterHandle: "@LATimesklein", userID: "33620284"}, // @LATimesklein
  ];

  let allTweetsData = [];

  for (let twitterUser of listOfTwitterUsers) {
    console.log(`Fetching latest tweets from ${twitterUser.twitterHandle}`);
    let latestTweets = await client.v2.userTimeline(twitterUser.userID, {
      exclude: "replies",
    });
    for (let tweet of latestTweets.tweets) {
      let tweetTime = tweetIDToTime(tweet.id);
      allTweetsData.push({
        author: twitterUser.twitterHandle,
        ID: tweet.id,
        time: tweetTime,
      });
    }
  }

  //Sorting Tweet Data by ID#
  console.log(`Sorting Data...`);
  allTweetsData = allTweetsData.sort((a, b) => b.ID - a.ID);

  //Slice out first 10 tweets
  console.log(`Slicing Data...`);
  allTweetsData = allTweetsData.slice(0, 10);

  await Tweet.deleteMany({});
  for (let tweet of allTweetsData) {
    let newTweet = new Tweet({
      author: tweet.author,
      ID: tweet.ID,
      time: tweet.time,
    });
    await newTweet.save();
  }
  console.log("Success!");
  console.table(allTweetsData);
  await LastAPICallTime.deleteOne({API: "twitter"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "twitter",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();
};

function tweetIDToTime(tweetId) {
  return new Date(parseInt(tweetId / 2 ** 22) + 1288834974657);
}
