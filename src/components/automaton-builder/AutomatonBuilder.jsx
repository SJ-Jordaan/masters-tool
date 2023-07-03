import React from "react";
import AutomatonRenderer from "../automaton-renderer/AutomatonRenderer";
import { AiOutlineClear, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { ArcherContainer, ArcherElement } from "react-archer";

const AutomatonBuilder = ({
  answer,
  isTransitionsProvided,
  handleInput,
  handleUndo,
  handleRedo,
  handleReset,
}) => {
  const currentTransitionIncludesState = (state, isFromState) => {
    return isFromState
      ? answer.current.from === state
      : answer.current.to === state;
  };

  const getIncomingStates = (state) => {
    return answer.transitions
      .filter((t) => t.to === state && t.from === answer.current.from)
      .map((t) => t.from);
  };

  const getOutgoingStates = (state) => {
    return answer.transitions.filter((t) => t.from === state).map((t) => t.to);
  };

  const currentTransitionIncludesSymbol = (symbol) => {
    return answer.current.symbols.includes(symbol);
  };

  const handleStateSelect = (state) => {
    handleInput(state, null, []);
  };

  const handleToStateSelect = (state) => {
    const transitionSymbols = answer.transitions
      .filter((t) => t.to === state && t.from === answer.current.from)
      .map((t) => t.label);
    handleInput(answer.current.from, state, transitionSymbols);
  };

  const handleSymbolSelect = (symbol) => {
    if (!answer.current.from || !answer.current.to) return;

    if (currentTransitionIncludesSymbol(symbol)) {
      handleInput(
        answer.current.from,
        answer.current.to,
        answer.current.symbols.filter((s) => s !== symbol)
      );

      return;
    }

    handleInput(answer.current.from, answer.current.to, [
      ...answer.current.symbols,
      symbol,
    ]);
  };

  const renderState = (state, isFromState = false) => {
    const isActive = currentTransitionIncludesState(state, isFromState);
    return (
      <div
        onClick={
          isFromState
            ? () => handleStateSelect(state)
            : () => handleToStateSelect(state)
        }
        className={`w-12 h-12 flex items-center justify-center border rounded-full ${
          isActive ? "border-[#00ff00] text-[#00ff00]" : ""
        }`}
      >
        {state}
      </div>
    );
  };

  return (
    <div className={"flex flex-col justify-center"}>
      <h5 className={"text-xl my-1 self-center"}>View</h5>
      <AutomatonRenderer
        automaton={answer}
        height={200}
        highlightedState={answer.current.from}
        highlightedTransitions={answer.current.symbols.map((symbol) => ({
          from: answer.current.from,
          label: symbol,
          to: answer.current.to,
        }))}
      />

      <div className={"divider mt-1 mb-0"} />
      <h5 className={"text-xl my-1 self-center"}>Build</h5>
      <ArcherContainer>
        <div id={"transition-table"}>
          <div
            id={"from-states"}
            className="flex flex-wrap gap-3 items-start justify-center mb-8"
          >
            {answer.states
              .filter(
                (state) =>
                  !isTransitionsProvided || getOutgoingStates(state).length > 0
              )
              .map((state) => (
                <ArcherElement
                  id={`from-${state}`}
                  key={`from-${state}`}
                  relations={
                    answer.current.from === state
                      ? answer.transitions
                          .filter((t) => t.from === state)
                          .filter(
                            (t, index, self) =>
                              self.findIndex((s) => s.to === t.to) === index
                          )
                          .map((transition) => ({
                            targetId: `to-${transition.to}`,
                            targetAnchor: "top",
                            sourceAnchor: "bottom",
                            style: {
                              strokeColor:
                                answer.current.to === transition.to
                                  ? "#00ff00"
                                  : "white",
                              strokeWidth: 1,
                            },
                          }))
                      : []
                  }
                >
                  <div id={`from-${state}`} className="flex flex-col">
                    {renderState(state, true)}
                  </div>
                </ArcherElement>
              ))}
          </div>
          <div
            id={"to-states"}
            className="flex flex-wrap gap-3 justify-center items-end mt-4"
          >
            {answer.states
              .filter(
                (state) =>
                  !isTransitionsProvided || getIncomingStates(state).length > 0
              )
              .map((state) => (
                <ArcherElement key={`to-${state}`} id={`to-${state}`}>
                  <div id={`to-${state}`} className="flex flex-col">
                    {renderState(state, false)}
                  </div>
                </ArcherElement>
              ))}
          </div>
          <div
            id={"input-symbol"}
            className="flex flex-wrap justify-center items-center w-max mx-auto mt-4"
          >
            {answer.current.to ? (
              answer.alphabet.map((symbol, index) => (
                <div
                  key={`symbol-${index}`}
                  className={`p-3 border ${
                    currentTransitionIncludesSymbol(symbol)
                      ? "border-[#00ff00] text-[#00ff00]"
                      : ""
                  }`}
                  onClick={() => handleSymbolSelect(symbol)}
                >
                  {symbol}
                </div>
              ))
            ) : (
              <div
                className="p-3 border border-transparent"
                key={`symbols-hidden`}
              />
            )}
          </div>
        </div>
      </ArcherContainer>
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
  );
};

export default AutomatonBuilder;
