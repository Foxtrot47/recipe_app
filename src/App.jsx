import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Recipe from "./Recipe.jsx";
import Search from "./Search.jsx";
import Categories from "./Categories.jsx";
import Navbar from "./Navbar.jsx";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipes/:recipeslug" element={<Recipe />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
