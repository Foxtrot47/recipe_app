import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { fetchData, renderRating } from "./Helpers.jsx";
import Icon from "@mdi/react";
import { mdiBarleyOff, mdiEggOff, mdiSquareCircle } from "@mdi/js";
import moment from "moment";

const Recipe = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  let { recipeslug } = useParams();

  const recipeCategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Drink",
    "Pasta",
    "Pizza",
    "Salad",
  ];

  useEffect(() => {
    if (recipeslug === undefined) return;
    let endPoint = "recipebyslug";
    fetchData(endPoint, { slug: recipeslug }, "get", (response) => {
      if (
        response.status === 200 &&
        response.data !== null &&
        response.data.length > 0
      ) {
        setRecipeData(response.data[0]);
        fetchReviews(response.data[0]["_id"]);
        setLoading(false);
      } else {
        console.log("uh oh");
      }
    });
  }, [recipeslug]);

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
        <div className="flex flex-col gap-y-4 relative justify-center items-center bg-red-500 h-72 text-white font-medium">
          {!loading && (
            <img
              src={recipeData.image.url}
              alt={recipeData.image.alt}
              className="object-cover object-center w-full absolute opacity-10 h-full"
            />
          )}
          <div className="text-4xl font-helvetica-neue font-semibold">
            {!loading && recipeData.name}
          </div>
          <div className="text-lg flex flex-row gap-x-2 items-center z-0 text-gray-200 font-regular">
            <Link to={"/"} className="hover:text-gray-100">
              <i className="fa-solid fa-home"></i>
              &nbsp;Home
            </Link>
            <i className="fa-regular fa-angle-right text-sm"></i>
            {!loading && recipeData.category[0]}
            <i className="fa-regular fa-angle-right text-sm"></i>
            <span className="text-gray-100">{!loading && recipeData.name}</span>
          </div>
        </div>
        <div className="flex flex-row gap-x-6 px-20">
          <div className="flex flex-col gap-y-1 ">
            <div className="flex flex-row gap-x-10 p-2 mb-1">
              <div className="text-gray-500 dark:gray-200 flex flex-row gap-x-1 items-center">
                <i className="text-red-500 font-bold fa-solid fa-user"></i>
                <span className="text-gray-500 dark:text-gray-300">By</span>
                {!loading && recipeData.author}
              </div>
              {!loading && recipeData.cuisine.length > 0 && (
                <div className=" flex flex-row gap-x-1">
                  <i className="text-red-500 font-bold fa-solid fa-bell-concierge"></i>
                  <span className="text-gray-500">Cuisine:</span>
                  <span>{recipeData.cuisine}</span>
                </div>
              )}
              {!loading && recipeData.category.length > 0 && (
                <div className=" flex flex-row gap-x-1">
                  <i className="text-red-500 font-bold fa-solid fa-book"></i>
                  <span className="text-gray-500">Category:</span>
                  {recipeData.category.map((cat, id) => {
                    return <span key={id}>{cat},</span>;
                  })}
                </div>
              )}
              {!loading && recipeData.diet.length > 0 && (
                <div className=" flex flex-row gap-x-4">
                  {recipeData.diet.map((dietInfo, id) => {
                    return (
                      <div
                        key={id}
                        className="flex flex-row gap-x-2 items-center whitespace-normal"
                      >
                        {(dietInfo.slug === "diary-free" && (
                          <Icon path={mdiEggOff} title="Diary free" />
                        )) ||
                          (dietInfo.slug === "gluten-free" && (
                            <Icon
                              path={mdiBarleyOff}
                              title="Gluten free"
                              size="19"
                              className="text-red-500"
                            />
                          )) ||
                          (dietInfo.slug === "vegan" && (
                            <i className="fa-solid fa-circle-check text-red-500"></i>
                          )) ||
                          (dietInfo.slug === "healthy" && (
                            <i className="fa-solid fa-heart text-red-500"></i>
                          ))}
                        {dietInfo.display !== "Vegetarian" && dietInfo.display}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {!loading && (
              <div className="relative">
                <img
                  className="object-cover object-center rounded w-full h-[450px]"
                  src={recipeData.image.url}
                  alt={recipeData.image.alt}
                />

                <div className="flex flex-row gap-x-6 absolute bottom-5 left-5 y-0 bg-white">
                  {recipeData.diet.find((term) => {
                    return (
                      term.display === "Vegetarian" || term.display === "Vegan"
                    );
                  }) ? (
                    <Icon
                      path={mdiSquareCircle}
                      className="text-[#008100]"
                      size="50"
                    />
                  ) : (
                    <Icon
                      path={mdiSquareCircle}
                      className="text-[#9d380c]"
                      size="50"
                    />
                  )}
                </div>
                <div className="absolute top-5 left-5 border border-black bg-white px-2 py-1">
                  <div className="flex flex-row gap-x-2 text-lg text-black">
                    {renderRating(recipeData.rating.avg)}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 gap-x-1 rounded bg-gray-100 dark:bg-gray-700 px-16">
              <div className="flex flex-row gap-x-4 px-2 justify-center items-center">
                <i className="fa-duotone fa-hat-chef text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Difficulty</span>
                  <span className="text-gray-400">
                    {(!loading && recipeData.skillLevel) || "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 px-8 justify-center items-center">
                <i className="fa-duotone fa-family text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Servings</span>
                  <span className="text-gray-400">
                    {(!loading && recipeData.yield) || "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 px-4 py-5 justify-center items-center">
                <i className="fa-duotone fa-knife-kitchen text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Prep Time</span>
                  <span className="text-gray-400">
                    {!loading && recipeData.time.prepTime}m
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 px-4 py-5 justify-center items-center">
                <i className="fa-duotone fa-bowl-rice text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Cook Time</span>
                  <span className="text-gray-400">
                    {!loading && recipeData.time.cookTime}m
                  </span>
                </div>
              </div>
            </div>
            <div className="py-4 text-lg">
              {!loading && recipeData.description}
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex flex-col">
                <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                  <p className="text-3xl font-medium">Ingredients</p>
                  <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-36">
                    &nbsp;
                  </span>
                </div>
                <div className="flex flex-col gap-y-2 my-10">
                  {!loading &&
                    recipeData.ingredients.map((section, id) => {
                      return (
                        <div key={id}>
                          {section.heading && (
                            <p className="text-2xl py-4">{section.heading}</p>
                          )}
                          <div className="text-lg flex flex-col px-4 gap-y-4">
                            <ul className="list-disc">
                              {section.ingredients.map((ingredient, ingid) => {
                                return (
                                  <li key={ingid}>
                                    {ingredient.quantityText} {}
                                    {ingredient.ingredientText}
                                    {ingredient.note}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                  <p className="text-3xl font-medium">Instructions</p>
                  <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-36">
                    &nbsp;
                  </span>
                </div>
                <div className="flex flex-col gap-y-9 my-10">
                  {!loading &&
                    recipeData.instructions.map((instruction, id) => {
                      return (
                        <div key={id} className="flex flex-row gap-x-4">
                          <div className="h-10 pr-4 py-1 border-r-red-500 border-r-2 flex items-center text-2xl flex-none">
                            Step {id + 1}
                          </div>
                          <p className="text-lg pt-1 whitespace-pre-wrap">
                            {instruction.text}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-3xl font-medium">
                  <i className="fa-solid fa-wheat text-red-500 text-xl mr-2"></i>
                  Nutrional Info
                </p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-52">
                  &nbsp;
                </span>
              </div>
              <div className="grid grid-cols-8 gap-x-4 py-8 w-full">
                {!loading &&
                  recipeData.nutritionalInfo.map((nutrition, id) => {
                    return (
                      <div
                        key={id}
                        className="flex flex-col gap-x-4 bg-gray-200 dark:bg-gray-600 items-center px-12 py-4 rounded-full"
                      >
                        <p className="text-lg pt-1 whitespace-pre-wrap">
                          {nutrition.value}
                          {nutrition.suffix}
                        </p>
                        <span className="text-lg capitalize font-semibold dark:text-gray-200">
                          {nutrition.label}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mr-20">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-3xl font-medium">
                  <i className="fa-solid fa-comments text-red-500 text-xl mr-2"></i>
                  Comments, questions and tips
                </p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-2/5">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-8 py-8 w-5/6">
                {!loading &&
                  reviews != null &&
                  reviews.map((review, id) => {
                    return (
                      <div
                        key={id}
                        className="flex flex-col gap-y-4 p-4 bg-gray-100 dark:bg-gray-600 rounded-lg drop-shadow"
                      >
                        <div className="flex flex-row gap-x-4 justify-between items-start">
                          <div className="flex flex-row gap-x-2 items-center">
                            <i className="fa-solid fa-circle-user text-red-500 text-bg-gray-200 text-5xl mr-2"></i>
                            <div className="flex flex-col gap-y-1">
                              <span className="capitalize text-2xl">
                                {review.author.displayName}
                              </span>
                              {review.changed && (
                                <div className="text-lg text-gray-500">
                                  {moment(
                                    review.changed,
                                    "YYYY-MM-DDTh:mm:ss a"
                                  ).fromNow()}
                                </div>
                              )}
                            </div>
                          </div>
                          {review.rating && (
                            <div className="font-accent flex flex-row gap-x-2 text-red-500">
                              {renderRating(review.rating)}
                            </div>
                          )}
                        </div>
                        {review.body && (
                          <div className="text-xl px-16">{review.body}</div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/4 flex-none h-full">
            <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mb-6">
              <p className="text-2xl font-medium">Similiar Recipes</p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-4">
              {!loading &&
                recipeData.similiarRecipes !== null &&
                recipeData.similiarRecipes.map((recipe, id) => {
                  if (id < 4)
                    return (
                      <Link
                        key={id}
                        className="flex flex-row gap-x-4 w-full pr-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 hover:drop-shadow"
                        to={recipe.url}
                      >
                        <div className="flex-none">
                          <img
                            className="object-cover object-center h-24 rounded-lg"
                            src={recipe.image.url}
                            alt={recipe.image.alt}
                          />
                        </div>
                        <div className="flex flex-col justify-around items-start">
                          <p className="text-lg font-semibold text-clip overflow-hidden w-50">
                            {recipe.title}
                          </p>
                          <div className="flex flex-row gap-x-2 text-red-500 text-sm">
                            {renderRating(recipe.rating.ratingValue)}
                          </div>
                        </div>
                      </Link>
                    );
                })}
            </div>
            <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-4">
              <p className="text-2xl font-medium">Recipe Categories</p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col w-16 px-2 pt-4 gap-y-4 text-xl text-gray-600 dark:text-gray-200">
                {recipeCategories.map((category, id) => {
                  return (
                    <div key={id} className="flex flex-row gap-x-2">
                      <i className="fa-solid fa-circle-arrow-right text-red-500"></i>
                      <p> {category}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
