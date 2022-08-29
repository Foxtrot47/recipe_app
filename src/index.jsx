import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Recipe from "./Recipe.jsx";
import Search from "./Search.jsx";
import Categories from "./Categories.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="recipes/:recipeslug" element={<Recipe />} />
      <Route path="/search" element={<Search />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  </BrowserRouter>
);
