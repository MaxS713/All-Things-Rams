const {TweetID, LastAPICallTime} = require ("../models.js");
const {TwitterApi} = require ("twitter-api-v2");

//------------------ Get Twitter Data -----------------//

module.exports = async function getLatestTweets() {
  await LastAPICallTime.deleteOne({API: "twitter"});
  let timeOfApiCallRequest = new LastAPICallTime({
    API: "twitter",
    time: Date.now(),
  });
  await timeOfApiCallRequest.save();

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

  let allTweetsIDs = [];

  for (let twitterUser of listOfTwitterUsers) {
    console.log(`Fetching latest tweets from ${twitterUser.twitterHandle}`)
    let latestTweets = await client.v2.userTimeline(twitterUser.userID, {
      exclude: "replies",
    });
    for (let tweet of latestTweets.tweets) {
      allTweetsIDs.push(tweet.id);
    }
  }

  //Sorting Tweet Data by ID#
  console.log(`Sorting Data...`)
  allTweetsIDs = allTweetsIDs.sort((a, b) => b - a);

  //Slice out first 10 tweets
  console.log(`Slicing Data...`)
  allTweetsIDs = allTweetsIDs.slice(0, 10);

  await TweetID.deleteMany({});
  for (let tweetID of allTweetsIDs) {
    let newTweet = new TweetID({tweetID: tweetID});
    await newTweet.save();
  }
  console.log("Success!")
  console.table(allTweetsIDs)
}
