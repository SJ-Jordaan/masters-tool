import React from "react";

export const RegExpKeyboard = ({
  alphabet,
  operators,
  onInput,
  onDelete,
  onUndo,
  onRedo,
}) => {
  const handleButtonClick = (char) => {
    onInput(char);
  };

  return (
    <div className="flex flex-wrap justify-center mt-2 space-x-1 space-y-1">
      <div className="flex flex-wrap">
        <button
          onClick={onDelete}
          className="w-16 h-16 m-1 bg-red-500 text-white rounded-md shadow"
        >
          {"<"}
        </button>
        <button
          onClick={onUndo}
          className="w-16 h-16 m-1 bg-yellow-500 text-white rounded-md shadow"
        >
          {"Undo"}
        </button>
        <button
          onClick={onRedo}
          className="w-16 h-16 m-1 bg-yellow-500 text-white rounded-md shadow"
        >
          {"Redo"}
        </button>
      </div>
      <div className="flex flex-wrap">
        {operators.map((operator) => (
          <button
            key={operator}
            onClick={() => handleButtonClick(operator)}
            className="w-16 h-16 m-1 bg-blue-500 text-white rounded-md shadow"
          >
            {operator}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap">
        {alphabet.map((char) => (
          <button
            key={char}
            onClick={() => handleButtonClick(char)}
            className="w-16 h-16 m-1 bg-green-500 text-white rounded-md shadow"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
