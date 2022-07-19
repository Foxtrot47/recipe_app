import axios from "axios";

async function fetchData(endPoint, params, method, callback) {
  // Add apiKey to url parameters
  params["apiKey"] = import.meta.env.VITE_API_KEY;
  await axios({
    method,
    url: "https://api.spoonacular.com/recipes/" + endPoint,
    //url: "hhttp://localhost:3000/recipes"
    params,
  })
    .then((response) => callback(response))
    .catch((error) => callback(error));
}
export default fetchData;
