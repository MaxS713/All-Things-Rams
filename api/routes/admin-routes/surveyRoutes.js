const { SurveyData } = require("../../models.js");

module.exports = (app) => {
  app.get("/api/surveydatas", async (req, res) => {
    let SurveyDatas = await SurveyData.find({});
    await res.send(SurveyDatas);
  });

  app.post("/api/surveydatas", async (req, res) => {
    const newSurveyData = new SurveyData(req.body);
    await newSurveyData.save();
  });

  app.get("/api/surveydatas/:id", async (req, res) => {
    const SurveyDataId = req.params.id;
    const SurveyDatas = await SurveyData.findById(SurveyDataId);
    res.send(SurveyDatas);
  });

  app.put("/api/surveydatas/:id", async (req, res) => {
    const SurveyDataId = req.params.id;
    const updates = req.body;
    await SurveyData.findByIdAndUpdate(SurveyDataId, updates);
    const SurveyDataToUpdate = await SurveyData.findById(SurveyDataId);
    res.send({ data: SurveyDataToUpdate });
  });

  app.delete("/api/surveydatas/:id", async (req, res) => {
    const SurveyDataId = req.params.id;
    const SurveyDataToDelete = await SurveyData.findById(SurveyDataId);
    await SurveyData.findByIdAndDelete(SurveyDataId);
    res.send({ data: SurveyDataToDelete });
  });
};
