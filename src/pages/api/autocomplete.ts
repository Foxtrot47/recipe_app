import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (req.query.q == undefined || req.query.q == null) {
        res.status(404).send("Must specify query parameter");
      } else {
        res.send(
          await prisma.recipes.findMany({
            where: {
              name: {
                contains: req.query.q
              }
            },
            select: {
              id: true,
              name: true,
              images: true,
              slug: true,
              ratings: true
            },
            take: 5
          })
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
