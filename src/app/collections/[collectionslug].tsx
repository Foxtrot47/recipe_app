import serialize from "form-serialize";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Key, SetStateAction, useEffect, useState } from "react";

import Pagination from "../../components/Pagination";
import { renderRating } from "../../Helpers";
import prisma from "../../lib/prisma";

const Collection = ({ collectionData, recipesData }) => {
  const [recipes, setRecipes] = useState(recipesData.recipes);
  const [loading, setLoading] = useState(false);
  const [resultCount, setResultCount] = useState(recipesData.total);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageChanged, setPageChanged] = useState(false);

  const PageSize = 20;

  useEffect(() => {
    if (!collectionData || (currentPage === 1 && !pageChanged)) return;
    setPageChanged(true);
    setLoading(true);
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchResults = async () => {
    const params: Record<string, string> = {};
    params.collectionid = collectionData.id;
    if (currentPage > 1)
      params.skip = (currentPage * PageSize - PageSize).toString();

    const serializedParams = queryString.stringify(params);

    const fetchResponse = await fetch(`/api/collectionrecipesbyid?${serializedParams}`);
    const fetchResult = await fetchResponse.json();
    if (fetchResponse.status === 200 && fetchResult.recipes !== null) {
      setRecipes(fetchResult.recipes);
      setResultCount(fetchResult.total);
      setLoading(false);
    } else {
      console.log("Fetching resuls from API failed");
    }
  };

  return (
    <div className="flex flex-col mt-[62px]">
      <div className="flex flex-col gap-y-4 relative justify-center items-center bg-red-500 h-auto py-8 text-white font-medium text-center">
        {!loading && (
          <img
            src={recipes[0].images.url}
            alt={recipes[0].images.alt}
            className="object-cover object-center w-full absolute opacity-10 h-full"
          />
        )}
        <div className="text-3xl md:text-4xl font-helvetica-neue font-semibold px-4">
          {!loading && collectionData.name}
        </div>
        <div className="px-10 md:w-1/2 text-gray-300 font-regular">
          <p className="text-gray-100">
            {!loading && collectionData.description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 pt-6 md:pt-16 px-4 md:px-24">
        {!loading &&
          recipes &&
          recipes.length > 0 &&
          recipes.map((recipe, id: Key) => {
            return (
              <Link
                key={id}
                href={"/recipes/" + recipe.slug}
                className="flex flex-col gap-y-6 hover:bg-white dark:hover:bg-gray-600 rounded-lg hover:drop-shadow-lg"
              >
                <Image
                  className="drop-shadow-xl filter rounded-lg object-cover object-center h-72 w-auto"
                  width={recipe.images.width}
                  height={recipe.images.height}
                  src={recipe.images.url}
                  alt={recipe.images.alt}
                />
                <div className="flex flex-col gap-y-2 px-4">
                  <p className="text-xl font-semibold truncate w-full dark:text-white">
                    {recipe.name}
                  </p>
                  <div className="flex flex-row gap-x-2 text-red-500">
                    {renderRating(recipe.ratings.avg)}
                  </div>
                  <div className="flex flex-row gap-x-2 text-sm"></div>
                  <p className="h-12 mb-4 w-full text-ellipsis overflow-hidden">
                    {recipe.description}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
      {!loading && recipes && recipes.length > 0 && (
        <div className="flex w-full justify-center my-6">
          <Pagination
            currentPage={currentPage}
            totalCount={resultCount}
            pageSize={PageSize}
            onPageChange={(page: SetStateAction<number>) =>
              setCurrentPage(page)
            }
          />
        </div>
      )}
    </div>
  );
};

export default Collection;

export async function getServerSideProps(context) {
  const { collectionslug } = context.query;

  console.log(collectionslug);

  const collectionData = await prisma.collections.findFirst({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
    },
    where: {
      slug: collectionslug,
    },
  });


  const count = await prisma.recipes.count({
    where: {
      collectionrecipes: {
        some: {
          collectionid: collectionData.id,
        },
      },
    },
  });

  const recipes = await prisma.recipes.findMany({
    select: {
      description: true,
      id: true,
      images: true,
      name: true,
      ratings: true,
      recipecuisines: {
        select: {
          cuisines: true,
        },
      },
      slug: true,
      skilllevel: true,
    },
    where: {
      collectionrecipes: {
        every: {
          collectionid: collectionData.id,
        },
      },
    },
    take: 20,
  });

  const recipesData = {
    recipes,
    limit: 20,
    skip: 0,
    total: count,
  };
  return { props: { collectionData, recipesData } };
}
