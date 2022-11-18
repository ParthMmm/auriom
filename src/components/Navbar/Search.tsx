import { useRouter } from "next/router";
import type { KeyboardEvent } from "react";
import { useState } from "react";

function Search({}) {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValue(event.target.value);

  const searchSubmit = () => {
    router.push({
      pathname: "/search",
      query: { input: value },
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13 && value) {
      searchSubmit();
    }
  };

  return (
    <div>
      <div className="group flex items-center rounded-full bg-gray-800 p-4  align-middle  transition-all  focus-within:bg-transparent focus-within:text-harlequin-500 focus-within:outline-none  focus-within:ring focus-within:ring-harlequin-500  ">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" mr-1 mb-1  h-4 w-4 group-hover:stroke-harlequin-500 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <div>
          <input
            id="search"
            placeholder="search for an album"
            value={value}
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={handleChange}
            className="text-md  w-64 bg-transparent text-black placeholder-gray-500 focus:outline-none dark:text-white md:w-96  "
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
