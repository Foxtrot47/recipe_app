import { Recipe } from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(404).send("Use GET");
    }

    const query = {};
    query.name = new RegExp(req.query.q, "i");

    // You shouldn't await for the response
    // The Scraper will take some time if there are lot of search results
    if (query.name != "")
      fetch(
        process.env.SCRAPER_API_URL +
          "search?query=" +
          query.name +
          "&fetchSinglePage=false"
      );

    if (req.query.cuisineTypes) query.cuisine = req.query.cuisineTypes;
    if (req.query.keywords) query.keywords = req.query.keywords;
    if (req.query.mealTypes) query.category = req.query.mealTypes;
    if (req.query.dietTypes)
      query.diet = { $elemMatch: { $or: [{ display: req.query.dietTypes }] } };
    if (req.query.skillLevel) query.skillLevel = req.query.skillLevel;
    if (req.query.yield) {
      if (req.query.yield === "9+") query.yield = { $gt: 8 };
      else query.yield = req.query.yield;
    }
    if (req.query.totalTime) {
      const totalTimes = {
        lte10: { $lte: 10 },
        lte30: { $lte: 30 },
        lte60: { $lte: 60 },
        gt60: { $gt: 60 },
      };
      query["time.totalTime"] = totalTimes[req.query.totalTime];
    }

    if (req.query.q == null && Object.keys(query) < 2) {
      res.send("Must specify some parameters to search");
      return;
    }

    if (req.query.kcal) {
      const kcalValues = {
        lte250: { $lte: 250 },
        lte500: { $lte: 500 },
        lte750: { $lte: 750 },
        lte1000: { $lte: 1000 },
        lte1500: { $lte: 1500 },
        gt1500: { $gt: 1500 },
      };
      query["nutritionalInfo"] = {
        $elemMatch: { label: "kcal", value: kcalValues[req.query.kcal] },
      };
    }

    if (req.query.rating) {
      const ratings = {
        gte1: { $gte: 1 },
        gte2: { $gte: 2 },
        gte3: { $gte: 3 },
        gte4: { $gte: 4 },
        eq5: 5,
      };
      query["rating.avg"] = ratings[req.query.rating];
    }

    const sort =
      req.query.sortBy && req.query.sortOrder
        ? [[req.query.sortBy, parseInt(req.query.sortOrder)]]
        : [];

    const recipes = await Recipe.find(
      query,
      "_id name slug image rating date description",
      { limit: 20, skip: req.query.offset || 0 }
    ).sort(sort);
    res.send(recipes);
  } catch (ex) {
    console.error(ex);
    res.status(500).send();
  }
}
