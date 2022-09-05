import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'
import Icon from '@mdi/react'
import { mdiBarleyOff, mdiEggOff, mdiSquareCircle } from '@mdi/js'
import moment from 'moment'
import { fetchData, renderRating } from './Helpers'
import { mealTypesSmall } from './SearchData'

const Recipe = () => {
  const [recipeData, setRecipeData] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [loading, setLoading] = useState(true)
  const { recipeslug } = useParams()

  useEffect(() => {
    if (recipeslug === undefined) return
    fetchData('recipebyslug', { slug: recipeslug }, 'get', (response) => {
      if (
        response.status === 200 &&
        response.data !== null &&
        response.data.length > 0
      ) {
        setRecipeData(response.data[0])
        // The key is _id and not id because of the way mongodb stores data
        // eslint-disable-next-line no-underscore-dangle
        fetchReviews(response.data[0]._id)
        setLoading(false)
      } else {
        console.log('uh oh')
      }
    })
  }, [recipeslug])

  const fetchReviews = async (recipeId) => {
    // Required params for comments api
    const params = {
      siteId: 'bbcgoodfood',
      entityType: 'recipe',
      entityId: recipeId,
      source: 'content-api',
      itemsPerPage: 5,
      page: 1,
      client: 'bbcgoodfood',
    }
    await axios({
      method: 'get',
      url: 'https://reactions.api.immediate.co.uk/api/reactions?',
      params,
    }).then((response) => {
      if (
        response.status === 200 &&
        response.data !== null &&
        response.data['hydra:member'].length > 0
      ) {
        setReviews(response.data['hydra:member'])
      }
    })
  }

  return (
    <div className="flex flex-col gap-y-6 mt-14">
      <div className="flex flex-col gap-y-4 relative justify-center items-center bg-red-500 h-56 md:h-72 text-white font-medium text-center">
        {!loading && (
          <img
            src={recipeData.image.url}
            alt={recipeData.image.alt}
            className="object-cover object-center w-full absolute opacity-10 h-full"
          />
        )}
        <div className="text-3xl md:text-4xl font-helvetica-neue font-semibold px-4">
          {!loading && recipeData.name}
        </div>
        <div className="text-lg md:flex md:flex-row gap-x-2 items-center z-0 text-gray-300 font-regular">
          <Link to="/" className="hover:text-gray-100">
            <i className="fa-solid fa-home"></i>
            &nbsp;Home&nbsp;
            <i className="fa-regular fa-angle-right text-sm"></i>
          </Link>
          {!loading && recipeData.category[0] && (
            <Link
              to={`/search?mealTypes=${recipeData.category[0]}`}
              className="hover:text-gray-100"
            >
              &nbsp;
              {recipeData.category[0]}
              &nbsp;
              <i className="fa-regular fa-angle-right text-sm" />
            </Link>
          )}
          <p className="text-gray-100">{!loading && recipeData.name}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-6 px-4 md:px-20">
        <div className="flex flex-col gap-y-1 ">
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-6 p-2 mb-1">
            {recipeData && recipeData.author && (
              <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1 items-center">
                <i className="text-red-500 font-bold fa-solid fa-user"></i>
                <span className="text-gray-500 dark:text-gray-400">By</span>
                {!loading && recipeData.author}
              </div>
            )}
            {!loading && recipeData.cuisine.length > 0 && (
              <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1">
                <i className="text-red-500 font-bold fa-solid fa-bell-concierge"></i>
                <span className="text-gray-500 dark:text-gray-400">
                  Cuisine:
                </span>
                <span>{recipeData.cuisine}</span>
              </div>
            )}
            {!loading && recipeData.category.length > 0 && (
              <div className="text-gray-500 dark:text-gray-100 flex flex-row gap-x-1">
                <i className="text-red-500 font-bold fa-solid fa-book"></i>
                <span className="text-gray-500 dark:text-gray-400">
                  Category:
                </span>
                {recipeData.category.map((cat) => (
                  <span key={cat.id}>{cat},</span>
                ))}
              </div>
            )}
            {!loading && recipeData.diet.length > 0 && (
              <div className=" flex flex-row gap-x-4">
                {recipeData.diet.map((dietInfo) => (
                  <div
                    key={dietInfo.id}
                    className="flex flex-row gap-x-2 items-center whitespace-normal"
                  >
                    {(dietInfo.slug === 'diary-free' && (
                      <Icon path={mdiEggOff} title="Diary free" />
                    )) ||
                      (dietInfo.slug === 'gluten-free' && (
                        <Icon
                          path={mdiBarleyOff}
                          title="Gluten free"
                          size="19"
                          className="text-red-500"
                        />
                      )) ||
                      (dietInfo.slug === 'vegan' && (
                        <i className="fa-solid fa-circle-check text-red-500"></i>
                      )) ||
                      (dietInfo.slug === 'healthy' && (
                        <i className="fa-solid fa-heart text-red-500"></i>
                      ))}
                    {dietInfo.display !== 'Vegetarian' && dietInfo.display}
                  </div>
                ))}
              </div>
            )}
          </div>
          {!loading && (
            <div className="relative">
              <img
                className="object-cover object-center rounded w-full h-56 md:h-[450px]"
                src={recipeData.image.url}
                alt={recipeData.image.alt}
              />

              <div className="flex flex-row gap-x-6 absolute bottom-3 md:bottom-5 left-3 md:left-5 y-0 bg-white">
                {recipeData.diet.find(
                  (term) =>
                    term.display === 'Vegetarian' || term.display === 'Vegan',
                ) ? (
                  <Icon
                    path={mdiSquareCircle}
                    className="text-[#008100] w-10 md:w-12"
                  />
                ) : (
                  <Icon
                    path={mdiSquareCircle}
                    className="text-[#9d380c] w-10 md:w-12"
                  />
                )}
              </div>
              <div className="absolute top-3 md:top-5 left-3 md:left-5 border border-black bg-white px-2 py-1">
                <div className="flex flex-row gap-x-2 md:text-lg text-black">
                  {renderRating(recipeData.rating.avg)}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-y-4 rounded bg-gray-100 dark:bg-gray-700 px-2 py-4 md:px-16">
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-hat-chef text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Difficulty</span>
                <span className="text-gray-400">
                  {(!loading && recipeData.skillLevel) || 'N/A'}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-family text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Servings</span>
                <span className="text-gray-400">
                  {(!loading && recipeData.yield) || 'N/A'}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-knife-kitchen text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Prep Time</span>
                <span className="text-gray-400">
                  {!loading && recipeData.time.prepTime}m
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 items-center">
              <i className="fa-duotone fa-bowl-rice text-4xl text-red-500"></i>
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Cook Time</span>
                <span className="text-gray-400">
                  {!loading && recipeData.time.cookTime}m
                </span>
              </div>
            </div>
          </div>
          <div className="py-4 text-lg">
            {!loading && recipeData.description}
          </div>
          <div className="grid grid-col-1 md:grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-2xl md:text-3xl font-medium">Ingredients</p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-32 md:w-40">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-2 my-10">
                {!loading &&
                  recipeData.ingredients.map((section) => (
                    <div key={section.id}>
                      {section.heading && (
                        <p className="text-2xl py-4">{section.heading}</p>
                      )}
                      <div className="text-lg flex flex-col px-4 gap-y-4">
                        <ul className="list-disc">
                          {section.ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                              {ingredient.quantityText} {}
                              {ingredient.ingredientText}
                              {ingredient.note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
                <p className="text-2xl md:text-3xl font-medium">Instructions</p>
                <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-32 md:w-40">
                  &nbsp;
                </span>
              </div>
              <div className="flex flex-col gap-y-9 my-10">
                {!loading &&
                  recipeData.instructions.map((instruction, id) => (
                    <div key={instruction.id} className="flex flex-row gap-x-4">
                      <div className="h-10 pr-4 py-1 border-r-red-500 border-r-2 flex items-center text-2xl flex-none">
                        Step {id + 1}
                      </div>
                      <p className="text-lg pt-1 whitespace-pre-wrap">
                        {instruction.text}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
              <p className="text-2xl md:text-3xl font-medium">
                <i className="fa-solid fa-wheat text-red-500 text-xl mr-2"></i>
                Nutrional Info
              </p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-44 md:w-56">
                &nbsp;
              </span>
            </div>
            <div className="grid grid-cols-8 gap-x-32 md:gap-x-32 py-8 overflow-x-scroll md:overflow-visible">
              {!loading &&
                recipeData.nutritionalInfo.map((nutrition) => (
                  <div
                    key={nutrition.id}
                    className="flex flex-col gap-x-4 bg-gray-200 dark:bg-gray-600 items-center px-14 py-6 rounded-full"
                  >
                    <p className="text-lg pt-1 whitespace-pre-wrap">
                      {nutrition.value}
                      {nutrition.suffix}
                    </p>
                    <span className="text-lg capitalize font-semibold dark:text-gray-200">
                      {nutrition.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-4 md:mr-20">
            <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-6">
              <p className="text-2xl md:text-3xl font-medium">
                <i className="fa-solid fa-comments text-red-500 md:text-xl mr-2"></i>
                Comments
              </p>
              <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[4px] w-40 md:w-48">
                &nbsp;
              </span>
            </div>
            <div className="flex flex-col gap-y-8 py-8 md:w-5/6">
              {!loading &&
                reviews != null &&
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex flex-col gap-y-4 p-4 bg-gray-100 dark:bg-gray-600 rounded-lg drop-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-2 justify-between items-start">
                      <div className="flex flex-row gap-x-2 items-center">
                        <i className="fa-solid fa-circle-user text-red-500 text-bg-gray-200 text-5xl mr-2"></i>
                        <div className="flex flex-col md:gap-y-1">
                          <span className="capitalize text-xl dark:text-gray-100 truncate w-64">
                            {review.author.displayName}
                          </span>
                          {review.changed && (
                            <div className="text-lg text-gray-500">
                              {moment(
                                review.changed,
                                'YYYY-MM-DDTh:mm:ss a',
                              ).fromNow()}
                            </div>
                          )}
                        </div>
                      </div>
                      {review.rating && (
                        <div className="flex flex-row gap-x-2 text-red-500">
                          {renderRating(review.rating)}
                        </div>
                      )}
                    </div>
                    {review.body && (
                      <div className="md:text-lg md:px-16">{review.body}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-1/4 flex-none h-full">
          <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mb-6">
            <p className="text-2xl font-medium">Similiar Recipes</p>
            <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-44">
              &nbsp;
            </span>
          </div>
          <div className="flex flex-col gap-y-4 mb-4">
            {!loading &&
              recipeData.similiarRecipes !== null &&
              recipeData.similiarRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  className="flex flex-row gap-x-4 w-full pr-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 hover:drop-shadow"
                  to={recipe.url}
                >
                  <div className="flex-none">
                    <img
                      className="object-cover object-center h-24 rounded-lg"
                      src={recipe.image.url}
                      alt={recipe.image.alt}
                    />
                  </div>
                  <div className="flex flex-col justify-around items-start">
                    <p className="text-lg font-semibold text-clip overflow-hidden w-50">
                      {recipe.title}
                    </p>
                    <div className="flex flex-row gap-x-2 text-red-500 text-sm">
                      {renderRating(recipe.rating.ratingValue)}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="border-b border-gray-300 dark:border-gray-500 relative pb-2 mt-4">
            <p className="text-2xl font-medium">Recipe Categories</p>
            <span className="bg-red-500 text-sm font-light absolute -bottom-0.5 h-[3px] w-48">
              &nbsp;
            </span>
          </div>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col w-16 px-2 pt-4 gap-y-4 text-xl text-gray-600 dark:text-gray-200 mb-4">
              {mealTypesSmall.map((category) => (
                <Link
                  key={category.id}
                  className="flex flex-row gap-x-2"
                  to={`/search?mealTypes=${category}`}
                >
                  <i className="fa-solid fa-circle-arrow-right text-red-500"></i>
                  <p> {category}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe
