import { Recipe } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (req.query.limit == undefined || req.query.limit == null) {
        res.status(404).send("Must specify limit");
      } else if (isNaN(req.query.limit) || req.query.limit < 1) {
        res.status(404).send("Limit must be a positive number");
      } else {

        let recipes = [];
        const count = await Recipe.estimatedDocumentCount().exec();
        for (let i = 0; i < req.query.limit; i++) {
          let random = Math.floor(Math.random() * count);
          recipes.push(await Recipe.findOne().skip(random).exec());
        }

        if (!recipes || recipes.length < 1) {
          res.status(500).send("Failed to generate recipes");
        } else {
          res.status(200).json(recipes);
          return;
        }
      }
    } else {
      res.status(404).send("Use GET");
    }
  }
  catch(ex) {
    console.log(ex);
    res.status(500).send();
  }
}
