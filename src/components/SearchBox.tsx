"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const [searchResult, setSearchResults] = useState(null);
  const router = useRouter();

  const doAutoComplete = async () => {
    const query = (document.getElementById("searchfield") as HTMLInputElement)
      .value;
    let response = await fetch(`/api/autocomplete?q=${query}`);
    let result = await response.json();
    if (response.status === 200 && result !== null) {
      setSearchResults(result);
    } else {
      throw "api failure";
    }
  };

  const gotoSearch = (event) => {
    if (event.key === "Enter") router.push("/search?q=" + event.target.value);
  };

  return (
    <>
      <span className="w-10/12 md:w-2/5 bg-white dark:bg-gray-800 flex flex-row items-center text-xl opacity-80 drop-shadow-xl filter rounded-lg">
        <i className="fa-solid fa-magnifying-glass px-4 text-red-500 absolute"></i>
        <input
          id="searchfield"
          className="pl-11 py-4 w-full dark:bg-[#1d1e26] border-0 focus:border-gray-700 focus:ring-gray-900 caret-red-500 rounded-lg dark:placeholder:text-white dark:text-white text-lg"
          type="text"
          placeholder="Search for recipes"
          onInput={doAutoComplete.bind(this)}
          onKeyDown={gotoSearch}
          autoComplete="off"
        />
      </span>
      {searchResult !== null && searchResult.length > 0 && (
        <div className="absolute top-[135px] md:top-36 bg-white dark:bg-gray-800 rounded z-10 flex flex-col gap-y-2 p-2 opacity-95 drop-shadow-xl filter w-10/12 md:w-2/5 text-lg">
          {searchResult.map((recipe, id) => {
            return (
              <Link
                key={id}
                href={`/recipes/${recipe.slug}`}
                className="flex flex-row gap-x-4 items-center hover:bg-red-500 drop-shadow rounded"
              >
                <Image
                  width={64}
                  height={64}
                  src={recipe.images.url}
                  className="rounded"
                  alt={recipe.name + "image"}
                />
                <p key={id}>{recipe.name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
