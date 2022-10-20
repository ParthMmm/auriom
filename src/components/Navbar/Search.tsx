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
      <div className="flex justify-center align-middle">
        <input
          id="search"
          placeholder="search for an album"
          value={value}
          onKeyPress={(e) => handleKeyPress(e)}
          onChange={handleChange}
          className="h-10 w-96 rounded-full border-2 border-harlequin-800 bg-transparent px-5 text-sm outline-harlequin-500 focus:outline"
        />
      </div>
    </div>
  );
}

export default Search;
