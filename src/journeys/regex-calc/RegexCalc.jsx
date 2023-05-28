import { useState } from "react";

export function RegexCalc() {
  const [regex, setRegex] = useState("");

  const handleRegexChange = (e) => {
    setRegex(e.target.value);
  };

  const handleButtonClick = (buttonValue) => {
    setRegex((prevValue) => prevValue + buttonValue);
  };

  const handleRegexSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-end h-screen w-screen p-8">
      <form
        onSubmit={handleRegexSubmit}
        className="shadow-md w-full rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-white font-bold mb-2" htmlFor="regex">
            Regular Expression
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="regex"
            type="text"
            placeholder="Enter regular expression"
            value={regex}
            onChange={handleRegexChange}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleButtonClick("(")}
          >
            (
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleButtonClick(")")}
          >
            )
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleButtonClick("*")}
          >
            *
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleButtonClick("|")}
          >
            |
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleButtonClick("1")}
          >
            1
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleButtonClick("0")}
          >
            0
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Test
          </button>
        </div>
      </form>
    </div>
  );
}
