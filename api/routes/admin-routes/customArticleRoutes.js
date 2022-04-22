const { CustomArticle } = require("../../models.js");

module.exports = (app) => {
  app.get("/api/customarticles", async (req, res) => {
    let customarticles = await CustomArticle.find({});
    await res.send(customarticles);
  });

  app.post("/api/customarticles", async (req, res) => {
    const newCustomArticle = new CustomArticle(req.body);
    await newCustomArticle.save();
  });

  app.get("/api/customarticles/:id", async (req, res) => {
    const CustomArticleId = req.params.id;
    const customArticles = await CustomArticle.findById(CustomArticleId);
    res.send(customArticles);
  });

  app.put("/api/customarticles/:id", async (req, res) => {
    const CustomArticleId = req.params.id;
    const updates = req.body;
    await CustomArticle.findByIdAndUpdate(CustomArticleId, updates);
    const CustomArticleToUpdate = await CustomArticle.findById(CustomArticleId);
    res.send({ data: CustomArticleToUpdate });
  });

  app.delete("/api/customarticles/:id", async (req, res) => {
    const CustomArticleId = req.params.id;
    const CustomArticleToDelete = await CustomArticle.findById(CustomArticleId);
    await CustomArticle.findByIdAndDelete(CustomArticleId);
    res.send({ data: CustomArticleToDelete });
  });
};
