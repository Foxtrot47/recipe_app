import { fetchJsonBySlug } from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (!req.query.slug || req.query.slug == null) {
        res.status(404).send("Must specify slug");
      } else {
        let result = await fetchJsonBySlug(req.query.slug);
        if (result != null) {
          res.status(200).json(result);
          return;
        }
        console.log("Trying to fetch new recipes");
        await fetch(
          process.env.SCRAPER_API_URL +
            "search?query=" +
            req.query.slug +
            "&fetchSinglePage=true"
        );
        result = await fetchJsonBySlug(req.query.slug);
        if (result != null) {
          res.status(200).json(result);
          return;
        } else {
          res.status(404);
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

