const { Tweet } = require("../../models.js");

module.exports = (app) => {
  app.get("/api/tweets", async (req, res) => {
    let tweets = await Tweet.find({});
    await res.send(tweets);
  });

  app.post("/api/tweets", async (req, res) => {
    const newTweet = new Tweet(req.body);
    await newTweet.save();
  });

  app.get("/api/tweets/:id", async (req, res) => {
    const tweetId = req.params.id;
    const tweets = await Tweet.findById(tweetId);
    res.send(tweets);
  });

  app.put("/api/tweets/:id", async (req, res) => {
    const tweetId = req.params.id;
    const updates = req.body;
    await Tweet.findByIdAndUpdate(tweetId, updates);
    const tweetToUpdate = await Tweet.findById(tweetId);
    res.send({ data: tweetToUpdate });
  });

  app.delete("/api/tweets/:id", async (req, res) => {
    const tweetId = req.params.id;
    const tweetToDelete = await Tweet.findById(tweetId);
    await Tweet.findByIdAndDelete(tweetId);
    res.send({ data: tweetToDelete });
  });
};
