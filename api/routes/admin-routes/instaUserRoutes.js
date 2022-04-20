const { InstagramUser } = require("../../models.js");

module.exports = (app) => {
  app.get("/api/instagramusers", async (req, res) => {
    let instagramUsers = await InstagramUser.find({});
    await res.send(instagramUsers);
  });

  app.post("/api/instagramusers", async (req, res) => {
    const newInstagramUser = new InstagramUser(req.body);
    await newInstagramUser.save();
  });

  app.get("/api/instagramusers/:id", async (req, res) => {
    const InstagramUserId = req.params.id;
    const InstagramUser = await InstagramUser.findById(InstagramUserId);
    res.send(InstagramUser);
  });

  app.put("/api/instagramusers/:id", async (req, res) => {
    const InstagramUserId = req.params.id;
    const updates = req.body;
    await InstagramUser.findByIdAndUpdate(InstagramUserId, updates);
    const InstagramUserToUpdate = await InstagramUser.findById(InstagramUserId);
    res.send({ data: InstagramUserToUpdate });
  });

  app.delete("/api/instagramusers/:id", async (req, res) => {
    const InstagramUserId = req.params.id;
    const InstagramUserToDelete = await InstagramUser.findById(InstagramUserId);
    await InstagramUser.findByIdAndDelete(InstagramUserId);
    res.send({ data: InstagramUserToDelete });
  });
};
