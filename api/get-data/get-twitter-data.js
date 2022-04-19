const { Tweet, TwitterUser, LastAPICallTime } = require("../models.js");
const { TwitterApi } = require("twitter-api-v2");

//------------------ Get Twitter Data -----------------//

module.exports = async function getLatestTweets() {
  const client = new TwitterApi({
    appKey: "Vx3ZSb24vmi5uIT2VUTzNzU7i",
    appSecret: "W89gf4TJsicNjurmSxk9ySO4Xc63WdNpY5jP2TjRYFOMm0r4nb",
    accessToken: "823682646840606720-zLTOtJSesKFwWkSI12vy3Bb2a5z5EAa",
    accessSecret: "8c2uLmpd6TolEh0s1axDLYJb7lzBJkAQkcMfsaVCKaOKu",
  });

  let listOfTwitterUsers = await TwitterUser.find({})

  //   for (let user of listOfTwitterUsers){
  //   let newTwitterUser = new TwitterUser({twitterHandle: user.twitterHandle, userID: user.userID})  
  //   await newTwitterUser.save()
  // }

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
  tweetData.sort((a, b) => parseInt(b.ID) - parseInt(a.ID));
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
