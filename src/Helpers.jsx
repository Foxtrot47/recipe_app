import axios from "axios";

async function fetchData(endPoint, params, method, callback) {
  // Add apiKey to url parameters
  params["apiKey"] = import.meta.env.VITE_API_KEY;
  await axios({
    method,
    url: "https://api.spoonacular.com/recipes/" + endPoint,
    //url: "http://localhost:3000" + endPoint,
    params,
  })
    .then((response) => callback(response))
    .catch((error) => callback(error));
}

const cleanupRecipeData = (recipe) => {
  if (!recipe) {
    return;
  }
  /* Clean up Recipe summary , Spoonacular puts html tags into it and breaks rendering */
  recipe.summary = recipe.summary.replace(/<\/?[^>]+(>|$)/g, "");
  /* 
    Calculate rating from spoonacular api score
    But we need to extract it from summary 
    stupid api doesn't provide it even if they advertise it in docs
    Our aim is to convert the percentage into a numbers like 1,1.5,2 etc. upto 5
    */
  // Group the number after score of
  const Reg = new RegExp(/score of (\d+)/);

  // Get the group and not the match
  let rating = Reg.exec(recipe.summary)[1];
  // Convert percentage into float in range 0-5
  rating = (rating / 100) * 5;

  // Convert into a multiple of .5
  recipe.rating = Math.round(rating / 0.5) * 0.5;

  // Remove score and recommendations from summary
  recipe.summary = recipe.summary.replace(
    /All things considered.*/g,
    ""
  );

  // Set defaut image type if not specified
  if (recipe.imageType === undefined) {
    recipe.imageType = "jpg";
  }
};

// For rendering the stars
const renderRating = (rating) => {
  let out = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      out.push(<i key={i} className="fa-solid fa-star"></i>);
    } else {
      if (i - 0.5 == rating)
        out.push(<i key={i} className="fa-duotone fa-star-half"></i>);
      else out.push(<i key={i} className="fa-duotone fa-star"></i>);
    }
  }
  return out;
};

export { cleanupRecipeData, fetchData, renderRating };
