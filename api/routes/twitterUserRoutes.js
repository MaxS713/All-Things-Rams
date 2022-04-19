const { TwitterUser } = require("../models.js");

module.exports = (app) => {
  app.get("/api/TwitterUsers", async (req, res) => {
    let TwitterUsers = await TwitterUser.find({});
    await res.send(TwitterUsers);
  });

  app.post("/api/TwitterUsers", async (req, res) => {
    const newTwitterUser = new TwitterUser(req.body);
    await newTwitterUser.save();
  });

  app.get("/api/TwitterUsers/:id", async (req, res) => {
    const TwitterUserId = req.params.id;
    const newTwitterUser = new TwitterUser(req.body);
    const TwitterUser = await TwitterUser.findById(TwitterUserId);
    res.send(TwitterUser);
  });

  app.put("/api/TwitterUsers/:id", async (req, res) => {
    const TwitterUserId = req.params.id;
    const updates = req.body;
    await TwitterUser.findByIdAndUpdate(TwitterUserId, updates);
    const TwitterUserToUpdate = await TwitterUser.findById(TwitterUserId);
    res.send({ data: TwitterUserToUpdate });
  });

  app.delete("/api/TwitterUsers/:id", async (req, res) => {
    const TwitterUserId = req.params.id;
    const TwitterUserToDelete = await TwitterUser.findById(TwitterUserId);
    await TwitterUser.findByIdAndDelete(TwitterUserId);
    res.send({ data: TwitterUserToDelete });
  });
};
