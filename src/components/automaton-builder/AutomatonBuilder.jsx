import React from "react";
import AutomatonRenderer from "../automaton-renderer/AutomatonRenderer";
import { AiOutlineClear, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { ArrowDownIcon } from "@heroicons/react/solid";

const AutomatonBuilder = ({
  answer,
  handleInput,
  handleUndo,
  handleRedo,
  handleReset,
}) => {
  const isMissingTransition = (state, symbol = null) => {
    if (symbol === null) {
      // Check if a state is missing any transition
      return !answer.transitions
        .filter((transition) => transition.from === state)
        .every((transition) => transition.to !== "");
    } else {
      // Check if a state-symbol pair is missing a transition
      return !answer.transitions.some(
        (transition) =>
          transition.from === state &&
          transition.label === symbol &&
          transition.to !== ""
      );
    }
  };

  const handleStateSelect = (from, symbol, to) => {
    handleInput(from, symbol, to);
  };

  return (
    <div className={"flex flex-col justify-center"}>
      <h5 className={"text-xl my-1 self-center"}>View</h5>
      <AutomatonRenderer
        automaton={answer}
        height={200}
        highlightedState={answer.current.state}
        highlightedTransition={answer.current.transition}
      />
      <div className={"divider mt-1 mb-0"} />
      <div className="flex flex-col justify-center">
        <h5 className={"text-xl my-1 self-center"}>Build</h5>
        <div className="flex flex-wrap gap-3 items-start justify-center">
          {answer.states.map((state, index) => (
            <div className={"flex flex-col"}>
              <div
                onClick={() => {
                  handleStateSelect(
                    state,
                    answer.alphabet[0],
                    answer.transitions.find(
                      (transition) =>
                        transition.from === state &&
                        transition.label === answer.alphabet[0]
                    ).to
                  );
                }}
                key={`state-${index}`}
                className={`w-12 h-12 flex items-center justify-center border rounded-full ${
                  answer.current.state === state
                    ? "border-[#00ff00] text-[#00ff00]"
                    : isMissingTransition(state) &&
                      "border-red-400 text-red-400"
                }`}
              >
                {state}
              </div>
              {answer.current.state === state && (
                <ArrowDownIcon className="w-6 h-6 self-center text-[#00ff00]" />
              )}
            </div>
          ))}
        </div>
        <div className="tabs tabs-boxed flex flex-wrap justify-center">
          {answer.alphabet.map((symbol, index) => (
            <div
              className={`tab ${
                answer.current.symbol === symbol && "tab-active"
              } flex-1`}
              onClick={() => {
                handleStateSelect(
                  answer.current.state,
                  symbol,
                  answer.transitions.find(
                    (transition) =>
                      transition.from === answer.current.state &&
                      transition.label === symbol
                  ).to
                );
              }}
              key={`symbol-${index}`}
            >
              {symbol}
              {isMissingTransition(answer.current.state, symbol) && "*"}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center items-end">
          {answer.states.map((state, index) => (
            <div className={"flex flex-col"}>
              {answer.current.transition.to === state ? (
                <ArrowDownIcon className="w-6 h-6 self-center text-[#00ff00]" />
              ) : (
                <div className="w-6 h-6 self-center" />
              )}
              <div
                onClick={() =>
                  handleStateSelect(
                    answer.current.state,
                    answer.current.symbol,
                    state
                  )
                }
                key={`to-state-${index}`}
                className={`w-12 h-12 flex items-center justify-center border rounded-full ${
                  answer.current.transition.to === state &&
                  "border-[#00ff00] text-[#00ff00]"
                }`}
              >
                {state}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-3 my-4">
          <button onClick={handleReset} className="btn btn-square w-14 h-14">
            <AiOutlineClear className="w-6 h-6" />
          </button>
          <button onClick={handleUndo} className="btn btn-square w-14 h-14">
            <AiOutlineUndo className="w-6 h-6" />
          </button>
          <button onClick={handleRedo} className="btn btn-square w-14 h-14">
            <AiOutlineRedo className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomatonBuilder;
