import React from "react";

export const SymbolSelector = ({ alphabet, onSelect, selectedSymbol }) => {
  const handleSelect = (symbol) => {
    if (symbol.count > 0) {
      onSelect(symbol.char);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      {alphabet.map((symbol, index) => (
        <button
          key={`alphabet-button-${index}`}
          className={`flex items-center m-1 border rounded-lg ${
            selectedSymbol === symbol.char
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleSelect(symbol)}
          disabled={symbol.count === 0}
        >
          <span className="p-1 px-4 border-r">{symbol.char}</span>
          <span className="p-1">{symbol.count}</span>
        </button>
      ))}
    </div>
  );
};
