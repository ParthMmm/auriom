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
    <div className="group flex w-full flex-row items-center rounded-sm align-middle transition-all focus-within:bg-transparent focus-within:text-harlequin-500 focus-within:outline-none  focus-within:ring focus-within:ring-harlequin-500  ">
      {/* show an x icon to clear search input when value */}

      {value ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" mx-1   h-6 w-6 group-hover:stroke-harlequin-500 "
          onClick={() => setValue("")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" mx-1  h-6 w-6 group-hover:stroke-harlequin-500 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      )}

      <input
        id="search"
        type="search"
        placeholder="Search for an album, artist, or song"
        value={value}
        onKeyPress={(e) => handleKeyPress(e)}
        onChange={handleChange}
        className="text-md w-full  overflow-visible bg-transparent py-5 text-black placeholder-gray-500 focus:outline-none dark:text-white   "
      />
    </div>
  );
}

export default Search;
