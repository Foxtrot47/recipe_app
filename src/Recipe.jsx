import Navbar from "./Navbar.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cleanupRecipeData, fetchData, renderRating } from "./Helpers.jsx";

const Recipe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  let { recipeid } = useParams();

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
    if (recipeid === undefined) return;
    let endPoint = recipeid + "/information";
    fetchData(endPoint, { includeNutrition: true }, "get", (response) => {
      if (response.status === 200 && response.data !== null) {
        cleanupRecipeData(response.data);
        setData(response.data);
        fetchSimiliar();
        setLoading(false);
      } else {
        console.log("uh oh");
      }
    });
  }, [recipeid]);

  const fetchSimiliar = () => {
    endPoint = recipeid + "/similar";
    fetchData(endPoint, { number: 4 }, "get", (response) => {
      if (response.status === 200 && response.data !== null) {
        let newData = data;
        newData["similiarRecipies"] = response.data;
        setData(newData);
      } else {
        console.log("Failed to fetch similiar recipies");
      }
    });
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col gap-y-6 mt-14">
        <div className="flex flex-col gap-y-4 relative justify-center items-center bg-accent h-72 text-white font-medium">
          <img
            src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-3-1536x864.jpg"
            alt=""
            className="object-cover object-center w-full absolute opacity-10 h-full"
          />
          <div className="text-4xl">{!loading && data.title}</div>
          <span className="text-lg flex flex-row gap-x-2 items-center">
            <i className="fa-solid fa-home"></i>
            Home
            <i className="fa-regular fa-angle-right text-sm"></i>
            Cateogry
            <i className="fa-regular fa-angle-right text-sm"></i>
            <span className="text-gray-800">{!loading && data.title}</span>
          </span>
        </div>
        <div className="flex flex-row gap-x-6 px-40">
          <div className="flex flex-col gap-y-1 ">
            <div className="flex flex-row gap-x-4 p-2 mb-1 ">
              <div className="text-gray-500 flex flex-row gap-x-1">
                <i className="text-accent font-bold fa-solid fa-user"></i>
                <span className="text-black">By</span>
                {!loading && data.sourceName}
              </div>
              <div className=" flex flex-row gap-x-1">
                <i className="text-accent font-bold fa-solid fa-book"></i>
                <span>Cuisine:</span>
                <span className="text-gray-500 italic">
                  {!loading && data.cuisines.map((cuisine) => cuisine + ", ")}
                </span>
              </div>
            </div>
            {!loading && (
              <div className="relative">
                <img
                  className="object-cover object-center rounded w-full h-[450px]"
                  src={`https://spoonacular.com/recipeImages/${data.id}-636x393.${data.imageType}`}
                  alt="Recipe Image"
                />

                <div className="flex flex-row gap-x-6 absolute bottom-5 left-5">
                  <img
                    className="w-8 h-8"
                    src={
                      data.vegetarian
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png"
                    }
                    alt=""
                  />
                </div>
                <div className="absolute top-5 left-5 border border-black bg-white px-2 py-1">
                  <div className="flex flex-row gap-x-2 text-lg text-black">
                    {renderRating()}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 gap-x-1">
              <div className="flex flex-row gap-x-4 px-4 py-5 justify-center items-center rounded bg-gray-100">
                <i className="fa-duotone fa-timer text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Prep Time</span>
                  <span className="text-gray-500">
                    {!loading && data.readyInMinutes}m
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 px-2 justify-center items-center rounded bg-gray-100">
                <i className="fa-solid fa-heart text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Health Points</span>
                  <span className="text-gray-500">
                    {!loading && data.healthScore}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 px-8 justify-center items-center rounded bg-gray-100">
                <i className="fa-duotone fa-family text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Serving</span>
                  <span className="text-gray-500">
                    {!loading && data.servings}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 px-8 justify-center items-center rounded bg-gray-100">
                <i className="fa-duotone fa-thumbs-up text-4xl text-red-500"></i>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">Likes</span>
                  <span className="text-gray-500">
                    {!loading && data.aggregateLikes}
                  </span>
                </div>
              </div>
            </div>
            <div className="py-4 text-lg">{!loading && data.summary}</div>
            <div className="bg-gray-100 flex flex-col gap-y-4 p-8 pt-4">
              <div className="flex flex-row gap-x-2 text-2xl">
                <i className="fa-solid fa-list text-red-500"></i>
                <span className="font-semibold">Ingredients</span>
              </div>
              <div className="bg-white drop-shadow-lg p-4">
                <ul className="pl-4 mt-2 text-lg flex flex-col gap-y-4">
                  {!loading &&
                    data.extendedIngredients.map((ingredient, id) => {
                      return <ol key={id}>{ingredient.original}</ol>;
                    })}
                </ul>
              </div>
            </div>
            {
              /* Some recipes do not have instructions for them , ignore rendering for them */
              !loading && data.analyzedInstructions[0] !== undefined && (
                <div className="flex flex-col">
                  <div className="border-b border-gray-300 relative pb-2 mt-6">
                    <p className="text-3xl font-medium">Instructions</p>
                    <span className="bg-accent text-sm font-light absolute -bottom-0.5 h-[4px] w-36">
                      &nbsp;
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-9 my-10">
                    {data.analyzedInstructions[0].steps.map(
                      (instruction, id) => {
                        return (
                          <div key={id} className="flex flex-row gap-x-4">
                            <div className="h-10 pr-4 py-1 border-r-accent border-r-2 flex items-center text-2xl flex-none">
                              Step {instruction.number}
                            </div>
                            <p className="text-lg pt-1 whitespace-pre-wrap">
                              {instruction.step}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )
            }
          </div>
          <div className="flex flex-col w-1/3 flex-none h-full">
            <div className="border-b border-gray-300 relative pb-2 mb-4">
              <p className="text-2xl font-medium">Similiar Recipes</p>
              <span className="bg-accent text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-6">
              {!loading &&
                data.similiarRecipies !== undefined &&
                data.similiarRecipies.map((recipe, id) => {
                  return (
                    <div key={id} className="flex flex-row gap-x-4">
                      <div className="flex-none">
                        <img
                          className="object-cover object-center w-36 h-36 rounded-lg"
                          src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-y-4 relative">
                        <p className="font-semibold text-lg whitespace-normal mt-6">
                          {recipe.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-b border-gray-300 relative pb-2 mt-4">
              <p className="text-2xl font-medium">Recipe Categories</p>
              <span className="bg-accent text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col w-16 px-2 pt-4 gap-y-4 text-xl text-[#646464]">
                {recipeCategories.map((category, id) => {
                  return (
                    <div key={id} className="flex flex-row gap-x-2">
                      <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                      <p> {category}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-red-50 flex flex-col gap-y-4 p-6 pt-4 mt-6">
              <div className="flex flex-row gap-x-2 text-2xl">
                <i className="fa-solid fa-info text-red-500"></i>
                <span className="font-semibold">Nutrition</span>
              </div>
              <span>
                Per Serving:{" "}
                {!loading &&
                  data.nutrition.weightPerServing.amount +
                    data.nutrition.weightPerServing.unit}
              </span>
              <div className="bg-white drop-shadow-lg p-4 flex flex-col gap-y-2 pt-6 text-lg">
                <div className="flex justify-end text-sm text-gray-500">
                  Daily Value*
                </div>
                <div className="w-full flex flex-col gap-y-4">
                  {!loading &&
                    data.nutrition.nutrients.map((nutrient, id) => {
                      /* Only show selected few nutrients */
                      if (
                        nutrient.name === "Calories" ||
                        nutrient.name === "Fat" ||
                        nutrient.name === "Saturated Fat" ||
                        nutrient.name === "Carbohydrates" ||
                        nutrient.name === "Sugar" ||
                        nutrient.name === "Cholesterol" ||
                        nutrient.name === "Sodium"
                      ) {
                        return (
                          <div
                            key={id}
                            className="flex flex-row justify-between"
                          >
                            <span className="text-gray-600">
                              {nutrient.name}: {nutrient.amount + nutrient.unit}{" "}
                            </span>
                            <span className="font-semibold">
                              {nutrient.percentOfDailyNeeds}%
                            </span>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      &nbsp; &nbsp; &nbsp;
    </div>
  );
};

export default Recipe;
