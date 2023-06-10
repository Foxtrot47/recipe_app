import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const fetchJsonById = async (id: number) => {
  return await prisma.recipes.findUnique({
    where: {
      id,
    },
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
      recipecuisines: {
        select: {
          cuisines: true,
        },
      },
      recipediets: {
        select: {
          diets: true,
        },
      },
      ingredientgroups: {
        select: {
          ingredients: true,
        },
      },
      instructions: true,
      recipekeywords: {
        select: {
          keywords: true,
        },
      },
      similarrecipes: {
        select: {
          similiarrecipeid: true,
        },
      },
      slug: true,
    },
  });
};

const fetchJsonBySlug = async (slug: string) => {
  return await prisma.recipes.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      date: true,
      description: true,
      images: true,
      name: true,
      recipecategories: {
        select: {
          categories: true,
        },
      },
      recipecuisines: {
        select: {
          cuisines: true,
        },
      },
      recipediets: {
        select: {
          diets: true,
        },
      },
      ingredientgroups: {
        select: {
          ingredients: true,
        },
      },
      instructions: true,
      nutritionalinfos: true,
      ratings: true,
      recipekeywords: {
        select: {
          keywords: true,
        },
      },
      similarrecipes: {
        select: {
          similiarrecipeid: true,
        },
      },
      skilllevel: true,
      slug: true,
      times: true,
      yield: true,
    },
  });
};

export default prisma;
export { fetchJsonById, fetchJsonBySlug };
