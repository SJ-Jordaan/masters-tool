import React from "react";
import AutomatonRenderer from "../automaton-renderer/AutomatonRenderer";
import { AiOutlineClear, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";

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
    <>
      <AutomatonRenderer
        automaton={answer}
        height={200}
        highlightedState={answer.current.state}
        highlightedTransition={answer.current.transition}
      />
      <div className="p-4 space-y-4">
        <div className="tabs tabs-boxed flex flex-wrap">
          {answer.states.map((state, index) => (
            <div
              className={`tab ${
                answer.current.state === state && "tab-active"
              } flex-1`}
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
            >
              {state}
              {isMissingTransition(state) && "*"}
            </div>
          ))}
        </div>
        <div className="tabs tabs-boxed flex flex-wrap">
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
        <div className="tabs tabs-boxed flex flex-wrap">
          {answer.states.map((state, index) => {
            const isActive = answer.current.transition.to === state;
            return (
              <div
                className={`tab ${isActive && "tab-active"} flex-1`}
                onClick={() =>
                  handleStateSelect(
                    answer.current.state,
                    answer.current.symbol,
                    state
                  )
                }
                key={`end-${index}`}
              >
                {state}
              </div>
            );
          })}
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-3">
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
    </>
  );
};

export default AutomatonBuilder;
