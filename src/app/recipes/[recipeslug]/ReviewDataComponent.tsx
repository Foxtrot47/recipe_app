import moment from "moment";
import { Key } from "react";

import { renderRating } from "../../../Helpers";

async function getData(recipeId: string) {
  // Required params for comments api
  const params = {
    siteId: "bbcgoodfood",
    entityType: "recipe",
    entityId: recipeId,
    source: "content-api",
    itemsPerPage: 5,
    page: 1,
    client: "bbcgoodfood",
  };
  const reviewRequest = await fetch(
    `https://reactions.api.immediate.co.uk/api/reactions?${params}`
  );
  const reviewResponse = await reviewRequest.json();

  return {
    reviewData: reviewResponse["hydra:member"],
  };
}

export default async function ReviewDataComponent({ recipeId }) {
  const { reviewData } = await getData(recipeId);

  return (
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
        {reviewData != null &&
          reviewData.map((review, index: Key) => (
            <div
              key={index}
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
                          "YYYY-MM-DDTh:mm:ss a"
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
  );
}
