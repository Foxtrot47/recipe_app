import axios from "axios";

async function fetchData(callback) {
  await axios
    .get("http://localhost:3000/recipes/")
    .then((response) => callback(response))
    .catch((error) => callback(error));
}
export default fetchData;
