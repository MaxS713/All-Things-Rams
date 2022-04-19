const { NewsArticle } = require("../models.js");

module.exports = (app) => {
  app.get("/api/newsarticles", async (req, res) => {
    let NewsArticles = await NewsArticle.find({});
    await res.send(NewsArticles);
  });

  app.post("/api/newsarticles", async (req, res) => {
    const newNewsArticle = new NewsArticle(req.body);
    await newNewsArticle.save();
  });

  app.get("/api/newsarticles/:id", async (req, res) => {
    const NewsArticleId = req.params.id;
    const newNewsArticle = new NewsArticle(req.body);
    const NewsArticle = await NewsArticle.findById(NewsArticleId);
    res.send(NewsArticle);
  });

  app.put("/api/newsarticles/:id", async (req, res) => {
    const NewsArticleId = req.params.id;
    const updates = req.body;
    await NewsArticle.findByIdAndUpdate(NewsArticleId, updates);
    const NewsArticleToUpdate = await NewsArticle.findById(NewsArticleId);
    res.send({ data: NewsArticleToUpdate });
  });

  app.delete("/api/newsarticles/:id", async (req, res) => {
    const NewsArticleId = req.params.id;
    const NewsArticleToDelete = await NewsArticle.findById(NewsArticleId);
    await NewsArticle.findByIdAndDelete(NewsArticleId);
    res.send({ data: NewsArticleToDelete });
  });
};
