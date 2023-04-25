import { Recipe } from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (req.query.q == undefined || req.query.q == null) {
        res.status(404).send("Must specify query parameter");
      } else {
        const regex = new RegExp(req.query.q, "i");
        res.send(
          await Recipe.find(
            {
              name: regex,
            },
            "_id name slug image rating",
            {
              limit: 5,
            }
          ).exec()
        );
      }
    } else {
      res.status(404).send("Use GET");
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).send();
  }
}
