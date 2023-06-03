import { fetchJsonById } from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (req.query.id == undefined || req.query.id == null) {
        res.status(404).send("Must specify id");
      } else if (isNaN(req.query.id) || req.query.id < 1) {
        res.status(404).send("id must be a positive number");
      } else {
        const result = await fetchJsonById(Number(req.query.id));
        if (result == null) {
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
