import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      if (req.query.limit == undefined || req.query.limit == null) {
        res.status(404).send("Must specify limit");
      } else if (isNaN(req.query.limit) || req.query.limit < 1) {
        res.status(404).send("Limit must be a positive number");
      } else {
        const recipesCount = await prisma.recipes.count();
        const skip = Math.floor(Math.random() * recipesCount);
        const result = await prisma.recipes.findMany({
          take: Number(req.query.limit),
          skip: skip,
          select: {
            date: true,
            description: true,
            images: true,
            name: true,
            recipecategories: {
              select: {
                categories: true,
              },
            },
            ratings: true,
            slug: true,
          },
        })
        res.status(200).json(result);
        return ;
      }
    } else {
      res.status(404).send("Use GET");
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).send();
  }
}

