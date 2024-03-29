// For rendering the stars
const renderRating = (rating) => {
  // if rating is in percentage convert
  if (rating > 5) {
    rating = (rating / 100) * 5;
  }
  let out = [];
  const floorRating = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    if (
      i <= floorRating ||
      (rating - floorRating >= 0.6 && i - 1 === floorRating)
    )
      out.push(<i key={i} className="fa-solid fa-star"></i>);
    else if (rating - floorRating > 0 && i - 1 === floorRating)
      out.push(<i key={i} className="fa-duotone fa-star-half"></i>);
    else out.push(<i key={i} className="fa-duotone fa-star"></i>);
  }
  return out;
};

const isValidStringParam = (param) =>
  typeof param === "string" &&
  param !== undefined &&
  param !== null &&
  param.trim() !== "";

export { isValidStringParam,renderRating  };
