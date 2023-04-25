import mongoose from "mongoose";

// Intialize connection to database
mongoose.connect(process.env.DB_CONNECTION_STRING).catch((err) => {
  console.log(err);
  process.exit(1);
});

const recipeSchema = new mongoose.Schema(
  {
    _id: "number",
    name: "string",
    author: "string",
    slug: "string",
    description: "string",
    date: "date",
    rating: "object",
    keywords: "array",
    nutritionalInfo: "array",
    category: "array",
    diet: "array",
    cuisine: "array",
    ingredients: "array",
    instructions: "array",
    yield: "number",
    image: "object",
    skillLevel: "string",
    time: "object",
    similarRecipes: "array",
  },
  { collection: "recipedata" }
);

export const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
