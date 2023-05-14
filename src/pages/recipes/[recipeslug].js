import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import RecipeCardSmallHorizontal from "../../components/RecipeCardSmallHorizontal";
import { fetchData, renderRating } from "../../Helpers";
import { mealTypesSmall } from "../../SearchData";

// Cache Some data to show the skeleton screen properly
const cachedRecipeData = {
  title: "dummy",
  similiarRecipes: [1, 2, 3, 4, 5, 6, 7, 8],
  nutritionalInfo: [1, 2, 3, 4, 5, 6],
  instructions: [1, 2, 3, 4, 5, 6],
  ingredients: [
    {
      heading: "",
      ingredients: [
        {
          ingredientText: "",
        },
        {
          ingredientText: "",
        },
        {
          ingredientText: "",
        },
        {
          ingredientText: "",
        },
        {
          ingredientText: "",
        },
        {
          ingredientText: "",
        },
        {
          ingredientText: "",
        },
      ],
    },
  ],
};

const cachedCommentData = [1, 2, 3, 4];

const Recipe = () => {
  const [recipeData, setRecipeData] = useState(cachedRecipeData);
  const [reviews, setReviews] = useState(cachedCommentData);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { recipeslug } = router.query;

  useEffect(() => {
    // Main fetch function logic
    if (recipeslug === undefined) return;
    // Show the skeleton screen
    setLoading(true);
    fetchData("recipebyslug", { slug: recipeslug }, "get", (response) => {
      if (
        response.status === 200 &&
        response.data !== null &&
        response.data.length > 0
      ) {
         setRecipeData(response.data[0]);
        // The key is _id and not id because of the way mongodb stores data
        // eslint-disable-next-line no-underscore-dangle
        fetchReviews(response.data[0]._id);
      } else {
        console.log("uh oh");
      }
    });
  }, [recipeslug]);

  useEffect(() => {
    // We are setting loading state here because useState might not update the data fast enough
    if (recipeData !== null && recipeData.title !== "dummy") setLoading(false);
  }, [recipeData]);

  const fetchReviews = async (recipeId) => {
    // Required params for comments api
    const params = {
      siteId: "bbcgoodfood",
      entityType: "recipe",
      entityId: recipeId,
      source: "content-api",
      itemsPerPage: 5,
      page: 1,
      client: "bbcgoodfood",
    };
    await axios({
      method: "get",
      url: "https://reactions.api.immediate.co.uk/api/reactions?",
      params,
    }).then((response) => {
      if (
        response.status === 200 &&
        response.data !== null &&
        response.data["hydra:member"].length > 0
      ) {
        setReviews(response.data["hydra:member"]);
      }
    });
  };

  return (
    <div className="flex flex-col gap-y-6 mt-14">
      <div className="flex flex-col gap-y-4 relative justify-center items-center bg-red-500 h-56 md:h-72 text-white font-medium text-center">
        {!loading && (
          <img
            src={recipeData.image.url}
            alt={recipeData.image.alt}
            className="object-cover object-center w-full absolute opacity-10 h-full"
          />
        )}

        {/* Recipe Title Section Start */}
        <div className="text-3xl md:text-4xl font-helvetica-neue font-semibold px-4">
          {!loading ? (
            recipeData.name
          ) : (
            <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-72 animate-pulse mt-8"></div>
          )}
        </div>
        {/* Recipe Title Section End */}

        {/* Breadcrumb Section Start */}
        <div className="text-lg md:flex md:flex-row gap-x-2 items-center z-0 text-gray-300 font-regular">
          <Link href="/" className="hover:text-gray-100">
            <i className="fa-solid fa-home"></i>
            &nbsp;Home&nbsp;
            <i className="fa-regular fa-angle-right text-sm"></i>
          </Link>

          {!loading && recipeData.category && recipeData.category[0] && (
            <Link
              href={`/search?mealTypes=${recipeData.category[0]}`}
              className="hover:text-gray-100"
            >
              &nbsp;
              {recipeData.category[0]}
              &nbsp;
            </Link>
          )}
          {!loading && recipeData.category === null && "N/A"}
          {loading && (
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 animate-pulse"></div>
          )}
          <i className="fa-regular fa-angle-right text-sm" />
          <div className="text-gray-100">
            {!loading ? (
              recipeData.name
            ) : (
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 animate-pulse"></div>
            )}
          </div>
        </div>
        {/* Breadcrumb Section End */}
      </div>
      <div className="flex flex-col md:flex-row gap-x-6 px-4 md:px-20">
        <div className="flex flex-col gap-y-1 w-full">
          {!loading && (
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-6 p-2 mb-1">
              {recipeData && recipeData.author && (
                <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1 items-center">
                  <i className="text-red-500 font-bold fa-solid fa-user"></i>
                  <span className="text-gray-500 dark:text-gray-400">By</span>
                  {!loading ? (
                    recipeData.author
                  ) : (
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 animate-pulse"></div>
                  )}
                </div>
              )}
              {recipeData.cuisine && recipeData.cuisine.length > 0 && (
                <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1">
                  <i className="text-red-500 font-bold fa-solid fa-bell-concierge"></i>
                  <span className="text-gray-500 dark:text-gray-400">
                    Cuisine:
                  </span>
                  <span>{!loading && recipeData.cuisine}</span>
                </div>
              )}
              {recipeData.category && recipeData.category.length > 0 && (
                <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1">
                  <i className="text-red-500 font-bold fa-solid fa-book"></i>
                  <span className="text-gray-500 dark:text-gray-400">
                    Category:
                  </span>
                  {!loading &&
                    recipeData.category.map((cat) => (
                      <span key={cat.id}>{cat},</span>
                    ))}
                </div>
              )}
              {recipeData.diet.length > 0 && (
                <div className=" flex flex-row gap-x-4">
                  {recipeData.diet.map((dietInfo) => (
                    <div
                      key={dietInfo.id}
                      className="flex flex-row gap-x-2 items-center whitespace-normal"
                    >
                      {(dietInfo.slug === "diary-free" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M22.1 21.5L2.4 1.7L1.1 3L6.1 8C5.1 10.3 4.5 12.8 4.5 14.5C4.5 18.6 7.9 22 12 22C14.2 22 16.2 21 17.6 19.5L20.8 22.7L22.1 21.5M19.5 14.5C19.5 10.4 16.1 2 12 2C10.5 2 9.1 3.1 7.9 4.7L19.3 16.1C19.4 15.6 19.5 15.1 19.5 14.5Z" />
                        </svg>
                      )) ||
                        (dietInfo.slug === "gluten-free" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="text-red-500 w-6"
                            stroke="currentColor"
                            fontSize={19}
                          >
                            <path d="M11.96,1.21C11.3,2.76 10.64,4.31 10.65,5.82C10.66,6.42 10.77,7 10.94,7.62C10.86,7.46 10.77,7.31 10.67,7.17C9.83,6 8.17,5 6.5,4C6.5,4.8 6.5,5.59 6.68,6.36L13,12.68V10.7C14.5,9.8 15.92,8.88 16.67,7.83C17.5,6.67 17.5,5.33 17.5,4C15.83,5 14.17,6 13.33,7.17C13.23,7.31 13.15,7.45 13.07,7.59C13.25,6.96 13.36,6.32 13.35,5.69C13.34,4.18 12.65,2.69 11.96,1.21M3.28,5.5L2,6.77L6.64,11.41C6.75,12 6.95,12.55 7.33,13.08C8.08,14.13 9.5,15.05 11,15.95V18.23L10.67,17.67C9.83,16.5 8.17,15.5 6.5,14.5C6.5,15.83 6.5,17.17 7.33,18.33C8.08,19.38 9.5,20.3 11,21.2V23H13V21.2C13.74,20.76 14.45,20.31 15.07,19.84L18.73,23.5L20,22.22C14,16.23 9.1,11.32 3.28,5.5M17.5,9.25C15.83,10.25 14.17,11.25 13.33,12.42L13.12,12.79L15,14.66C15.67,14.16 16.27,13.64 16.67,13.08C17.5,11.92 17.5,10.58 17.5,9.25M17.5,14.5C16.93,14.84 16.38,15.18 15.85,15.53L17.29,16.97C17.5,16.17 17.5,15.33 17.5,14.5Z" />
                          </svg>
                        )) ||
                        (dietInfo.slug === "vegan" && (
                          <i className="fa-solid fa-circle-check text-red-500"></i>
                        )) ||
                        (dietInfo.slug === "healthy" && (
                          <i className="fa-solid fa-heart text-red-500"></i>
                        ))}
                      <span className="whitespace-nowrap">
                        {dietInfo.display !== "Vegetarian" && dietInfo.display}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div>
            {loading && (
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 animate-pulse"></div>
            )}
          </div>

          {/* Main Image section */}
          <div className="relative">
            <div className="w-full h-56 md:h-[450px] relative">
              {!loading ? (
                <Image
                  fill={true}
                  className="object-cover object-center rounded"
                  src={recipeData.image.url}
                  alt={recipeData.image.alt}
                  priority={true}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-300 rounded dark:bg-gray-700 animate-pulse">
                  <svg
                    className="w-12 h-12 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex flex-row gap-x-6 absolute bottom-3 md:bottom-5 left-3 md:left-5 y-0 bg-white">
              {!loading &&
              recipeData.diet.find(
                (term) =>
                  term.display === "Vegetarian" || term.display === "Vegan"
              ) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="text-green-500 w-10 md:w-12"
                  fill="currentColor"
                >
                  <path d="M20 4V20H4V4H20M22 2H2V22H22V2M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6Z" />
                </svg>
              ) : (
                !loading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="text-[#9d380c] w-10 md:w-12"
                    fill="currentColor"
                  >
                    <path d="M20 4V20H4V4H20M22 2H2V22H22V2M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6Z" />
                  </svg>
                )
              )}
              {loading && (
                <div class="flex items-center justify-center w-12 h-12 bg-gray-300 dark:bg-gray-600 animate-pulse">
                  <svg
                    class="w-3/4 h-3/4 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="absolute top-3 md:top-5 left-3 md:left-5 border border-black bg-white px-2 py-1">
              {!loading ? (
                <div className="flex flex-row gap-x-2 md:text-lg text-black">
                  {renderRating(recipeData.rating.avg)}
                </div>
              ) : (
                <div className="flex flex-row gap-x-2 md:text-lg text-black animate-pulse">
                  {renderRating(5)}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-y-4 rounded bg-gray-100 dark:bg-gray-700 px-2 py-4 md:px-16">
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-hat-chef text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Difficulty</span>
                <span className="text-gray-400">
                  {(!loading && recipeData.skillLevel) ||
                    (loading && (
                      <div className="h-3 bg-gray-200 rounded-xl dark:bg-gray-600 w-16 mt-2 animate-pulse"></div>
                    )) ||
                    "N/A"}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-family text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Servings</span>
                <span className="text-gray-400">
                  {(!loading && recipeData.yield) ||
                    (loading && (
                      <div className="h-3 bg-gray-200 rounded-xl dark:bg-gray-600 w-16 mt-2 animate-pulse"></div>
                    )) ||
                    "N/A"}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-knife-kitchen text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Prep Time</span>
                <span className="text-gray-400">
                  {(!loading && recipeData.time.prepTime + "m") ||
                    (loading && (
                      <div className="h-3 bg-gray-200 rounded-xl dark:bg-gray-600 w-16 mt-2 animate-pulse"></div>
                    )) ||
                    "N/A"}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-bowl-rice text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Cook Time</span>
                <span className="text-gray-400">
                  {(!loading && recipeData.time.cookTime + "m") ||
                    (loading && (
                      <div className="h-3 bg-gray-200 rounded-xl dark:bg-gray-600 w-16 mt-2 animate-pulse"></div>
                    )) ||
                    "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="py-4 text-lg">
            {!loading ? (
              recipeData.description
            ) : (
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 animate-pulse"></div>
            )}
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-2xl md:text-3xl font-medium">Ingredients</p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-32 md:w-40">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-2 my-10">
                {recipeData.ingredients.map((section) => (
                  <div key={section.id}>
                    {section.heading && (
                      <p className="text-2xl py-4">{section.heading}</p>
                    )}
                    <div className="text-lg flex flex-col px-4 gap-y-4">
                      <ul className="list-disc">
                        {section.ingredients.map((ingredient, sectid) => (
                          <li key={sectid}>
                            {!loading ? (
                              <>
                                {ingredient.quantityText} {}
                                {ingredient.ingredientText}
                                {ingredient.note}
                              </>
                            ) : (
                              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 animate-pulse"></div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-2xl md:text-3xl font-medium">Instructions</p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-32 md:w-40">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-9 my-10">
                {recipeData.instructions &&
                  recipeData.instructions.map((instruction, id) => (
                    <div key={instruction.id} className="flex flex-row gap-x-4">
                      <div className="h-10 pr-4 py-1 border-r-red-500 border-r-2 flex items-center text-2xl flex-none">
                        {!loading ? (
                          `Step ${id + 1}`
                        ) : (
                          <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 animate-pulse"></div>
                        )}
                      </div>
                      <div className="text-lg pt-1 whitespace-pre-wrap">
                        {!loading ? (
                          instruction.text
                        ) : (
                          <>
                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 animate-pulse mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 animate-pulse mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 animate-pulse "></div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
              <p className="text-2xl md:text-3xl font-medium">
                <i className="fa-solid fa-wheat text-red-500 text-xl mr-2"></i>
                Nutrional Info
              </p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-44 md:w-56">
                &nbsp;
              </span>
            </div>
            <div className="grid grid-cols-8 gap-x-32 md:gap-x-32 py-8 overflow-x-scroll md:overflow-visible">
              {recipeData.nutritionalInfo.map((nutrition, id) => (
                <div
                  key={`nutrition_bubble_${id}`}
                  className="flex flex-col gap-x-4 bg-gray-200 dark:bg-gray-600 items-center px-14 py-6 rounded-full"
                >
                  {!loading && (
                    <p className="text-lg pt-1 whitespace-pre-wrap">
                      {nutrition.value}
                      {nutrition.suffix}
                    </p>
                  )}
                  <span className="text-lg capitalize font-semibold dark:text-gray-200">
                    {!loading ? (
                      nutrition.label
                    ) : (
                      <div className="h-2 my-4 bg-gray-200 rounded-full dark:bg-gray-500 w-16 animate-pulse"></div>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-4 md:mr-20">
            <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
              <p className="text-2xl md:text-3xl font-medium">
                <i className="fa-solid fa-comments text-red-500 md:text-xl mr-2"></i>
                Comments
              </p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-40 md:w-48">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-8 py-8 md:w-5/6">
              {reviews &&
                reviews.map((review, id) => (
                  <div
                    key={id}
                    className="flex flex-col gap-y-4 p-4 bg-gray-100 dark:bg-gray-600 rounded-lg drop-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-2 justify-between items-start">
                      <div className="flex flex-row gap-x-2 items-center">
                        <i className="fa-solid fa-circle-user text-red-500 text-bg-gray-200 text-5xl mr-2"></i>
                        <div className="flex flex-col md:gap-y-1">
                          <span className="capitalize text-xl dark:text-gray-100 truncate w-64">
                            {review.author ? (
                              review.author.displayName
                            ) : (
                              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse"></div>
                            )}
                          </span>
                          {review.changed && (
                            <div className="text-lg text-gray-500">
                              {review.changed ? (
                                moment(
                                  review.changed,
                                  "YYYY-MM-DDTh:mm:ss a"
                                ).fromNow()
                              ) : (
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 animate-pulse">
                                  Gwello
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-2 text-red-500">
                        {review.rating ? (
                          renderRating(review.rating)
                        ) : (
                          <div className="h-4 my-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                    <div className="md:text-lg md:px-16">
                      {review.body || (
                        <>
                          <div className="h-2 my-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 animate-pulse"></div>
                          <div className="h-2 my-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 animate-pulse"></div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-1/4 flex-none h-full">
          <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mb-6">
            <p className="text-2xl font-medium">Similiar Recipes</p>
            <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-44">
              &nbsp;
            </span>
          </div>
          <div className="flex flex-col gap-y-4 mb-4">
            {recipeData.similiarRecipes !== null &&
              recipeData.similiarRecipes.map((similiarRecipe, id) => (
                <RecipeCardSmallHorizontal
                  key={"similiar_recipe_" + id}
                  recipeData={similiarRecipe}
                  dataLoading={loading}
                />
              ))}
          </div>
          <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-4">
            <p className="text-2xl font-medium">Recipe Categories</p>
            <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-48">
              &nbsp;
            </span>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col w-16 px-2 pt-4 gap-y-4 text-xl text-gray-600 dark:text-gray-200 mb-4">
              {mealTypesSmall.map((category) => (
                <Link
                  key={category.id}
                  className="flex flex-row gap-x-2"
                  href={`/search?mealTypes=${category}`}
                >
                  <i className="fa-solid fa-circle-arrow-right text-red-500"></i>
                  <p> {category}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
