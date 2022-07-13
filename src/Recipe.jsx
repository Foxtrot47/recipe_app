import Navbar from "./Navbar.jsx";

const Recipe = () => {
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
            <div className="text-4xl">Lorem ipsum dolor sit amet consectetur</div>
            <span className="text-lg flex flex-row gap-x-2 items-center">
            <i className="fa-solid fa-home"></i>
            Home
            <i className="fa-regular fa-angle-right text-sm"></i>
            Cateogry
            <i className="fa-regular fa-angle-right text-sm"></i>
            <span className="text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </span>
          </span>
          </div>
          <div className="flex flex-row gap-x-6 px-40">
            <div className="flex flex-col gap-y-1 ">
              <div className="flex flex-row gap-x-2 mb-1">
                <div className="px-6 py-2 border border-gray-300 rounded">
                  SOURCE
                </div>
                <div className="px-6 py-2 border border-gray-300 rounded">
                  CUISINE
                </div>
              </div>
              <div className="relative">
                <img
                    className="object-cover object-center rounded"
                    src="https://radiustheme.com/demo/wordpress/themes/ranna/wp-content/uploads/2019/09/ranna-wordpress-theme-radiustheme.com-4.jpg"
                    alt=""
                />
                <div className="absolute top-5 left-5 border border-black bg-white px-2 py-1">
                  <div className="flex flex-row gap-x-2 text-lg text-black">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-duotone fa-star"></i>
                    <i className="fa-duotone fa-star"></i>
                    <i className="fa-duotone fa-star"></i>
                    <i className="fa-duotone fa-star"></i>
                  </div>
                </div>
                <div className="flex flex-row gap-x-6 absolute bottom-5 left-5">
                  <img
                      className="w-8 h-8"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png"
                      alt=""
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-1">
                <div className="flex flex-row gap-x-4 px-4 py-5 justify-center items-center rounded bg-gray-100">
                  <i className="fa-duotone fa-timer text-4xl text-red-500"></i>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">Prep Time</span>
                    <span className="text-gray-500">20 mins</span>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4 px-2 justify-center items-center rounded bg-gray-100">
                  <i className="fa-solid fa-heart text-4xl text-red-500"></i>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">Health Points</span>
                    <span className="text-gray-500">4.3</span>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4 px-8 justify-center items-center rounded bg-gray-100">
                  <i className="fa-duotone fa-family text-4xl text-red-500"></i>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">Serving</span>
                    <span className="text-gray-500">4</span>
                  </div>
                </div>
                <div className="flex flex-row gap-x-4 px-8 justify-center items-center rounded bg-gray-100">
                  <i className="fa-duotone fa-thumbs-up text-4xl text-red-500"></i>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">Likes</span>
                    <span className="text-gray-500">100</span>
                  </div>
                </div>
              </div>
              <div className="py-4 text-lg">
                Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a
                good recipe to expand your main course repertoire. One portion of
                this dish contains approximately <b>19g of protein </b>,{" "}
                <b>20g of fat </b>, and a total of <b>584 calories </b>. For{" "}
                <b>$1.63 per serving </b>, this recipe <b>covers 23% </b> of your
                daily requirements of vitamins and minerals. This recipe serves 2.
                It is brought to you by fullbellysisters.blogspot.com. 209 people
                were glad they tried this recipe. A mixture of scallions, salt and
                pepper, white wine, and a handful of other ingredients are all it
                takes to make this recipe so scrumptious. From preparation to the
                plate, this recipe takes approximately <b>45 minutes </b>. All
                things considered, we decided this recipe{" "}
                <b>deserves a spoonacular score of 83% </b>. This score is
                awesome.
              </div>
              <div className="grid grid-cols-2 gap-x-6 mt-4 w-full">
                <div className="bg-gray-100 flex flex-col gap-y-4 py-4 px-6">
                  <div className="flex flex-row gap-x-2 text-2xl">
                    <i className="fa-solid fa-list text-red-500"></i>
                    <span className="font-semibold">Ingredients</span>
                  </div>
                  <div className="bg-white drop-shadow-lg p-4">
                    <ol className="list-decimal pl-4 mt-2 text-lg flex flex-col gap-y-4">
                      <li>
                        8 ounces of large uncooked shrimp (peeled, tails on),
                        thawed
                      </li>
                      <li>1/4 cup chicken, seafood, or vegetable broth</li>
                      <li>4 cloves garlic, minced</li>
                      <li>2 tablespoons white wine vinegar</li>
                    </ol>
                  </div>
                </div>
                <div className="bg-red-50 flex flex-col gap-y-4 py-4 px-6">
                  <div className="flex flex-row gap-x-2 text-2xl">
                    <i className="fa-solid fa-info text-red-500"></i>
                    <span className="font-semibold">Nutrition</span>
                  </div>
                  <span>Per Serving: 83 g</span>
                  <div className="bg-white drop-shadow-lg p-4 flex flex-col gap-y-2 pt-6 text-lg">
                    <div className="flex justify-end text-sm text-gray-500">
                      Daily Value*
                    </div>
                    <div className="w-full border border-gray-200"></div>
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-600">Total Fat: 45.8g</span>
                      <span className="font-semibold">32%</span>
                    </div>
                    <div className="w-full border border-gray-200"></div>
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-600">Chlosterols: 224mg</span>
                      <span className="font-semibold">79%</span>
                    </div>
                    <div className="w-full border border-gray-200"></div>
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-600">Sodium: 149mg</span>
                      <span className="font-semibold">44%</span>
                    </div>
                    <div className="w-full border border-gray-200"></div>
                    <div className="flex flex-row justify-between">
                      <span className="text-gray-600">Vitamin D : 150 ng</span>
                      <span className="font-semibold">2%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-300 relative pb-2 mt-6">
                <p className="text-3xl font-medium">Instructions</p>
                <span className="bg-accent text-sm font-light absolute -bottom-0.5 h-[4px] w-36">
                &nbsp;
              </span>
              </div>
              <div className="flex flex-col gap-y-9 my-10">
                <div className="flex flex-row gap-x-4">
                  <div className="h-10 pr-4 py-1 border-r-accent border-r-2 flex items-center text-2xl flex-none">
                    Step 1
                  </div>
                  <p className="text-lg pt-1">
                    Place chicken broth in a skillet and heat to medium-high heat.
                  </p>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="h-10 pr-4 py-1 border-r-accent border-r-2 flex items-center text-2xl flex-none">
                    Step 2
                  </div>
                  <p className="text-lg pt-1">
                    Add garlic. Cook for a minute or so, then add shrimp. Cook
                    until shrimp are pink and opaque, about 3-5 minutes.
                  </p>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="h-10 pr-4 py-1 border-r-accent border-r-2 flex items-center text-2xl flex-none">
                    Step 3
                  </div>
                  <p className="text-lg pt-1">
                    Remove shrimp from pan and set aside to cool
                  </p>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="h-10 pr-4 py-1 border-r-accent border-r-2 flex items-center text-2xl flex-none">
                    Step 4
                  </div>
                  <p className="text-lg pt-1">
                    Add vinegar to skillet and let the sauce reduce to about a
                    third.
                  </p>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="h-10 pr-4 py-1 border-r-accent border-r-2 flex items-center text-2xl flex-none">
                    Step 5
                  </div>
                  <p className="text-lg pt-1">
                    When shrimp are cool enough to handle, remove all the tails
                    and chop coarsely. third.
                  </p>
                </div>
                <div className="flex flex-row gap-x-4">
                  <div className="h-10 pr-4 py-1 border-r-accent border-r-2 flex items-center text-2xl flex-none">
                    Step 6
                  </div>
                  <p className="text-lg pt-1">
                    Combine chopped shrimp in a medium bowl with reduced pan
                    juices/garlic, diced cucumber, dill, lemon juice, and a few
                    pinches of salt and pepper. Spoon filling into lettuce leaves,
                    sprinkle with a little cheese, and serve.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/3 flex-none h-full">
              <div className="border-b border-gray-300 relative pb-2 mb-4">
                <p className="text-2xl font-medium">Similiar Recipes</p>
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
        &nbsp; &nbsp; &nbsp;
      </div>
  );
};

export default Recipe;
