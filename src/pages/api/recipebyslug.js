import { Recipe } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (req.query.slug == undefined || req.query.slug == null) {
        res.status(404).send("Must specify slug");
      } else {
        const result = await Recipe.find(
          {
            slug: req.query.slug,
          },
          null,
          {
            limit: 1,
          }
        ).exec();
        if (!result || result.length < 1) {
          res.status(404).send("Invalid id");
        } else {
          res.status(200).json(result);
          return;
        }
      }
    } else {
      res.status(404).send("Use GET");
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send();
  }
}
