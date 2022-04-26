const { InstagramPost } = require("../../models.js");

module.exports = (app) => {
  app.get("/api/instagramposts", async (req, res) => {
    let instagramposts = await InstagramPost.find({});
    await res.send(instagramposts);
  });

  app.post("/api/instagramposts", async (req, res) => {
    const newInstagramPost = new InstagramPost(req.body);
    await newInstagramPost.save();
  });

  app.get("/api/instagramposts/:id", async (req, res) => {
    const InstagramPostId = req.params.id;
    const InstagramPosts = await InstagramPost.findById(InstagramPostId);
    res.send(InstagramPosts);
  });

  app.put("/api/instagramposts/:id", async (req, res) => {
    const InstagramPostId = req.params.id;
    const updates = req.body;
    await InstagramPost.findByIdAndUpdate(InstagramPostId, updates);
    const InstagramPostToUpdate = await InstagramPost.findById(InstagramPostId);
    res.send({ data: InstagramPostToUpdate });
  });

  app.delete("/api/instagramposts/:id", async (req, res) => {
    const InstagramPostId = req.params.id;
    const InstagramPostToDelete = await InstagramPost.findById(InstagramPostId);
    await InstagramPost.findByIdAndDelete(InstagramPostId);
    res.send({ data: InstagramPostToDelete });
  });
};
