import { useRouter } from "next/router";
import { KeyboardEvent, useState } from "react";

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
      <div className="flex items-center rounded-full border-2 pl-4 align-middle outline-harlequin-500 focus-within:text-harlequin-500 focus-within:outline   ">
        <i className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className=" h-4 w-4 fill-current "
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </i>

        <input
          id="search"
          placeholder="search for an album"
          value={value}
          onKeyPress={(e) => handleKeyPress(e)}
          onChange={handleChange}
          className="h-10  w-64 border-0 bg-transparent px-3 text-sm text-black placeholder-gray-600 outline-none dark:text-white md:w-96  "
        />
      </div>
    </div>
  );
}

export default Search;
