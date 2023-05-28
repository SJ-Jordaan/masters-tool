import React from "react";
import { AiOutlineDelete, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";

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
    <div className="flex flex-wrap flex-col justify-center mt-2 space-y-4">
      <div className="flex flex-1 flex-wrap items-center justify-center gap-3">
        <button onClick={onUndo} className="btn btn-square">
          <AiOutlineUndo className="w-6 h-6" />
        </button>
        <button onClick={onDelete} className="btn btn-square">
          <AiOutlineDelete className="w-6 h-6" />
        </button>
        <button onClick={onRedo} className="btn btn-square">
          <AiOutlineRedo className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-3">
        {operators.map((operator) => (
          <button
            key={operator}
            onClick={() => handleButtonClick(operator)}
            className="btn btn-square"
          >
            {operator}
          </button>
        ))}
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-3">
        {alphabet.map((char) => (
          <button
            key={char}
            onClick={() => handleButtonClick(char)}
            className="btn btn-square"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};
