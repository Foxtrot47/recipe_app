import { Recipe } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const query = {};
      let offset = 0,
        sort = [];
      query.name = new RegExp(req.query.q, "i");
      if (req.query.cuisineTypes) query.cuisine = req.query.cuisineTypes;
      if (req.query.keywords) query.keywords = req.query.keywords;
      if (req.query.mealTypes) query.category = req.query.mealTypes;
      if (req.query.dietTypes)
        query.diet = { $elemMatch: { display: req.query.dietTypes } };
      if (req.query.skillLevel) query.skillLevel = req.query.skillLevel;
      if (req.query.yield) {
        if (req.query.yield === "9+") query.yield = { $gt: 8 };
        else query.yield = req.query.yield;
      }
      if (req.query.totalTime) {
        if (req.query.totalTime === "lte10")
          query["time.totalTime"] = { $lte: 10 };
        else if (req.query.totalTime === "lte30")
          query["time.totalTime"] = { $lte: 30 };
        else if (req.query.totalTime === "lte60")
          query["time.totalTime"] = { $lte: 60 };
        else if (req.query.totalTime === "gt60")
          query["time.totalTime"] = { $gt: 60 };
      }

      if (req.query.q == null && Object.keys(query) < 2) {
        res.send("Must specify some parameters to search");
        return;
      }

      if (req.query.kcal) {
        query["nutritionalInfo"] = { $elemMatch: { label: "kcal" } };
        if (req.query.kcal === "lte250")
          query["nutritionalInfo"].$elemMatch.value = { $lte: 250 };
        else if (req.query.kcal === "lte500")
          query["nutritionalInfo"].$elemMatch.value = { $lte: 500 };
        else if (req.query.kcal === "lte750")
          query["nutritionalInfo"].$elemMatch.value = { $lte: 750 };
        else if (req.query.kcal === "lte1000")
          query["nutritionalInfo"].$elemMatch.value = { $lte: 1000 };
        else if (req.query.kcal === "lte1500")
          query["nutritionalInfo"].$elemMatch.value = { $lte: 1500 };
        else if (req.query.kcal === "gt1500")
          query["nutritionalInfo"].$elemMatch.value = { $gt: 1500 };
      }

      if (req.query.rating) {
        if (req.query.rating === "gte1") query["rating.avg"] = { $gte: 1 };
        else if (req.query.rating === "gte2") query["rating.avg"] = { $gte: 2 };
        else if (req.query.rating === "gte3") query["rating.avg"] = { $gte: 3 };
        else if (req.query.rating === "gte4") query["rating.avg"] = { $gte: 4 };
        else if (req.query.rating === "eq5") query["rating.avg"] = 5;
      }
      if (req.query.offset) offset = req.query.offset;
      if (req.query.sortBy && req.query.sortOrder)
        sort = [[req.query.sortBy, parseInt(req.query.sortOrder)]];

        console.log(query);
      res.send(
        await Recipe.find(
          query,
          "_id name slug image rating date description",
          {
            limit: 20,
            skip: offset,
          }
        ).sort(sort)
      );
      return;
    } else {
      res.status(404).send("Use GET");
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send();
  }
}
