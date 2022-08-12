import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData, renderRating } from "./Helpers.jsx";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("random", { limit: 6 }, "get", (response) => {
      if (response.status === 200 && response.data !== null) {
        setData(response.data);
        setLoading(false);
      } else {
        console.log("Fetching recipies from API failed");
      }
    });
  }, []);

  const doAutoComplete = async () => {
    const query = document.getElementById("searchfield").value;
    if (query === "") setSearchResults(null);
    fetchData("autocomplete", { q: query }, "get", (response) => {
      if (response.status === 200 && response.data !== null) {
        setSearchResults(response.data);
      }
    });
  };

  const gotoSearch = (event) => {
    if (event.key === "Enter") navigate("/search?q=" + event.target.value);
  };

  return (
    <div className="App h-full">
      <Navbar />
      {/* Body Section */}
      <div className="flex flex-col h-full gap-y-8">
        {/* Hero Section */}
        <div className="flex-none mt-10 w-full h-[25rem] flex justify-center items-center">
          <img
            className="object-cover object-center w-full h-full fade-to-bottom filter brightness-75"
            src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna-wordpress-theme-radiustheme.com-4-1240x578.jpg"
          />
          <div className="absolute w-full items-center flex flex-col gap-y-4">
            <p className="text-6xl font-medium text-white font-serif drop-shadow-xl filter">
              Find a Recipe
            </p>
            <span className="w-2/5 bg-white flex flex-row items-center text-2xl py-2 opacity-80 drop-shadow-xl filter">
              <i className="fa-solid fa-magnifying-glass px-4 text-accent"></i>
              <input
                id="searchfield"
                className=" py-2 w-full outline-none"
                type="text"
                placeholder="Search for recipes"
                onInput={doAutoComplete.bind()}
                onKeyDown={gotoSearch}
                autoComplete="off"
              />
            </span>
            {searchResult !== null && searchResult.length > 0 && (
              <div className="absolute top-36 bg-white rounded z-10 flex flex-col gap-y-2 p-2 opacity-90 drop-shadow-xl filter w-2/5 text-xl">
                {searchResult.map((recipe, id) => {
                  return (
                    <Link
                      key={id}
                      to={`/recipes/${recipe.slug}`}
                      className="flex flex-row gap-x-4 items-center hover:bg-[#ff2400] drop-shadow rounded"
                    >
                      <img src={recipe.image.url} className="w-16 rounded" />
                      <p key={id}>{recipe.name}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Rest of body */}
        <div className="px-8 grid grid-cols-3 gap-x-10 gap-y-6 text-center">
          {!loading &&
            data.map((recipe, id) => {
              return (
                <Link
                  key={id}
                  to={"/recipes/" + recipe.slug}
                  className="flex flex-col gap-y-6 hover:bg-gray-50 rounded-lg hover:drop-shadow-lg"
                >
                  <img
                    className="drop-shadow-xl filter rounded-lg object-cover object-center h-80"
                    src={recipe.image.url}
                    alt={recipe.image.alt}
                  />
                  <div className="flex flex-col items-center gap-y-2 px-4">
                    <p className="text-accent font-semibold capitalize ">
                      {recipe.category.length > 0
                        ? recipe.category[0]
                        : "Unknown"}
                    </p>
                    <p className="text-2xl font-semibold truncate w-full">
                      {recipe.name}
                    </p>
                    <div className="flex flex-row gap-x-2 text-sm"></div>
                    <p className="px-4 h-24 w-full text-ellipsis overflow-hidden">
                      {recipe.description}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="px-12">
          <div className="border-b border-gray-300 relative pb-2">
            <p className="text-3xl font-medium">Trending Recipes</p>
            <span className="bg-accent text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
              &nbsp;
            </span>
          </div>
        </div>
        <div className="px-8 w-full h-full flex-none flex flex-col gap-y-10">
          <div className="relative h-[30rem] flex items-center justify-center">
            <img
              className="filter brightness-75 object-cover object-center w-full h-full rounded-lg shadow-xl"
              src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-3.jpg"
            />
            <div className="absolute flex flex-row justify-between w-full items-center px-10 text-red-400 ">
              <div className="bg-white rounded-full p-4 px-6 font-bold drop-shadow-xl filter">
                &lt;
              </div>
              <div className="bg-white rounded-full p-4 px-6 font-bold drop-shadow-xl filter">
                &gt;
              </div>
            </div>
            <div className="absolute h-full flex flex-col gap-y-4 justify-end items-center">
              <div className="bg-white px-10 py-6 flex flex-col gap-y-4 items-center ">
                <p className="text-accent font-semibold">Lunch</p>
                <p className="text-3xl font-semibold">
                  Lorem ipsum dolor sit amet
                </p>
                <div className="flex flex-row gap-x-2 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-duotone fa-star"></i>
                  <i className="fa-duotone fa-star"></i>
                  <i className="fa-duotone fa-star"></i>
                  <i className="fa-duotone fa-star"></i>
                </div>
                <p className="whitespace-normal text-center hidden">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  tincidunt sem sed sem accumsan molestie. Ut facilisis dolor
                  lectus, vel ultricies magna maximus quis.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-10 w-full">
            <div className="flex flex-col">
              <div className="flex flex-row gap-x-6">
                <div className="flex flex-col gap-y-6">
                  <img
                    className="drop-shadow-xl filter rounded-lg"
                    src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-9-530x338.jpg"
                  />
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-accent font-semibold">Breakfast</p>
                    <p className="text-2xl font-semibold">
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className="flex flex-row gap-x-2 text-sm">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                    </div>
                    <p className="px-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed quis eleifend arcu. Aliquam mollis porta suscipit.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-6">
                  <img
                    className="drop-shadow-xl filter rounded-lg"
                    src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-9-530x338.jpg"
                  />
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-accent font-semibold">Breakfast</p>
                    <p className="text-2xl font-semibold">
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className="flex flex-row gap-x-2 text-sm">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                    </div>
                    <p className="px-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed quis eleifend arcu. Aliquam mollis porta suscipit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-x-6">
                <div className="flex flex-col gap-y-6">
                  <img
                    className="drop-shadow-xl filter rounded-lg"
                    src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-9-530x338.jpg"
                  />
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-accent font-semibold">Breakfast</p>
                    <p className="text-2xl font-semibold">
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className="flex flex-row gap-x-2 text-sm">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                    </div>
                    <p className="px-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed quis eleifend arcu. Aliquam mollis porta suscipit.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-6">
                  <img
                    className="drop-shadow-xl filter rounded-lg"
                    src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2020/06/ranna-wordpress-theme-radiustheme.com-9-530x338.jpg"
                  />
                  <div className="flex flex-col items-center gap-y-2">
                    <p className="text-accent font-semibold">Breakfast</p>
                    <p className="text-2xl font-semibold">
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className="flex flex-row gap-x-2 text-sm">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                      <i className="fa-duotone fa-star"></i>
                    </div>
                    <p className="px-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed quis eleifend arcu. Aliquam mollis porta suscipit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 w-3/6">
              <div className="border-b border-gray-300 relative pb-2 mb-4">
                <p className="text-2xl font-medium">Latest Recipes</p>
                <span className="bg-accent text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-row gap-x-4">
                  <div className="flex-none">
                    <img
                      className="object-cover object-center w-36 h-36 rounded-lg"
                      src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna_wordpress_theme_radiustheme.com_1-530x338.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-4 relative">
                    <span className="text-accent font-semibold -top-1.5 absolute">
                      Dinner
                    </span>
                    <p className="font-semibold text-lg whitespace-normal mt-6">
                      Lorem ipsum dolor sit amet jkjskfskfj
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="flex-none">
                    <img
                      className="object-cover object-center w-36 h-36 rounded-lg"
                      src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna_wordpress_theme_radiustheme.com_1-530x338.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-4 relative">
                    <span className="text-accent font-semibold -top-1.5 absolute">
                      Dinner
                    </span>
                    <p className="font-semibold text-lg whitespace-normal mt-6">
                      Lorem ipsum dolor sit amet jkjskfskfj
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="flex-none">
                    <img
                      className="object-cover object-center w-36 h-36 rounded-lg"
                      src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna_wordpress_theme_radiustheme.com_1-530x338.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-4 relative">
                    <span className="text-accent font-semibold -top-1.5 absolute">
                      Dinner
                    </span>
                    <p className="font-semibold text-lg whitespace-normal mt-6">
                      Lorem ipsum dolor sit amet jkjskfskfj
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="flex-none">
                    <img
                      className="object-cover object-center w-36 h-36 rounded-lg"
                      src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna_wordpress_theme_radiustheme.com_1-530x338.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-4 relative">
                    <span className="text-accent font-semibold -top-1.5 absolute">
                      Dinner
                    </span>
                    <p className="font-semibold text-lg whitespace-normal mt-6">
                      Lorem ipsum dolor sit amet jkjskfskfj
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-300 relative pb-2 mt-4">
                <p className="text-2xl font-medium">Recipe Categories</p>
                <span className="bg-accent text-sm font-light absolute -bottom-0.5 h-[3px] w-14">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-6">
                <div className="grid grid-cols-2 w-16 px-2 gap-4 text-xl text-[#646464]">
                  <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                  <p> Breakfast</p>
                  <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                  <p>Lunch</p>
                  <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                  <p>Dinner</p>
                  <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                  <p>Drink</p>
                  <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                  <p>Pasta</p>
                  <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                  <p>Pizza</p>
                  <i className="fa-solid fa-circle-arrow-right text-accent"></i>
                  <p>Salad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
