import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import { renderRating } from "./Helpers.jsx";

const carouselProps = () => ({
  showArrows: true,
  showStatus: false,
  showIndicators: false,
  showThumbs: false,
  infiniteLoop: true,
  autoPlay: false,
  stopOnHover: false,
  swipeable: true,
  dynamicHeight: false,
  useKeyboardArrows: true,
});

const carouselClasses =
  "bg-white dark:bg-gray-600 rounded-full md:py-4 md:px-6 py-2 px-4 font-bold drop-shadow-xl filter absolute z-10 text-red-500 top-28 md:top-1/2";
const CarouselComponent = ({ recipes }) => {
  return (
    <Carousel
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className={`left-5 ${carouselClasses}`}
          >
            &lt;
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className={`right-5 ${carouselClasses}`}
          >
            &gt;
          </button>
        )
      }
      {...carouselProps()}
    >
      {recipes &&
        // eslint-disable-next-line react/prop-types
        recipes.map((recipe, index) => {
          return (
            <Link
              to={`/recipes/${recipe.slug}`}
              key={index}
              className="block w-full relative group overflow-visible"
            >
              <img
                className="filter object-cover object-center w-full rounded-xl shadow-xl h-72 md:h-[35rem]"
                src={recipe.image.url}
              />
              <div className="bottom-0 md:absolute md:top-auto inset-x-0 h-full flex flex-col w-full md:w-auto gap-y-4 justify-end items-center">
                <div className="md:bg-white md:dark:bg-gray-700 px-4 md:px-10 py-6 flex flex-col gap-y-2 md:gap-y-4 items-center w-full md:w-auto transition duration-300 ease-in-out md:translate-y-24 md:group-hover:translate-y-0">
                  <p className="text-red-500 font-semibold">
                    {recipe.category[0]}
                  </p>
                  <p className="text-lg md:text-3xl font-semibold">
                    {recipe.name}
                  </p>
                  <div className="flex flex-row gap-x-2 text-sm text-red-500">
                    {renderRating(recipe.rating.avg)}
                  </div>
                  <p className="whitespace-normal md:w-[500px] text-center">
                    {recipe.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
    </Carousel>
  );
};

CarouselComponent.propTypes = {
  recipes: PropTypes.object.isRequired,
};

export default CarouselComponent;
