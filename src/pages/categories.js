import Link from "next/link";
import Image from "next/image";
import { mealTypes, mealImages } from "@/SearchData";

const Categories = () => {
  return (
    <div className="body grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-5 pt-24 pb-5 px-4 md:px-24">
      {mealTypes.map((type, id) => {
        return (
          <Link
            key={id}
            href={"/search?mealTypes=" + type}
            className="flex flex-col gap-y-6 hover: relative w-full"
          >
            <Image
              width={384}
              height={384}
              className="drop-shadow-xl filter rounded-lg object-cover object-center h-56 md:h-96"
              src={mealImages[id]}
              alt={type}
            />
            <div className="flex flex-col gap-y-2 px-4 absolute bottom-0 rounded-lg bg-black fade-to-top h-full w-full"></div>
            <p className="text-lg md:text-2xl font-semibold truncate text-white absolute bottom-4 md:bottom-10 left-4 md:left-10 font-inter border-red-500 border-b-2">
              {type}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
