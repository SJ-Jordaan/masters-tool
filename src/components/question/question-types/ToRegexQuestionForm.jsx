import React from "react";
import { RegExpKeyboard } from "../../regex-keyboard/RegExpKeyboard";
import AutomatonRenderer from "../../automaton-renderer/AutomatonRenderer";
import to_NFA from "dfa-lib/regex";
import { normaliseAlphabet } from "../../../common/helpers/regex";

const ToRegexQuestionForm = ({
  question,
  answer,
  handleInput,
  handleDelete,
  handleUndo,
  handleRedo,
  handleReset,
}) => {
  const generateAutomaton = (regex, alphabet) => {
    const dfa = to_NFA(
      normaliseAlphabet(regex),
      normaliseAlphabet(alphabet)
    ).minimized();
    const stateMap = new Map();
    stateMap.set(dfa.initial, "0");

    let i = 1;
    for (const state of dfa.states) {
      if (state !== dfa.initial) {
        stateMap.set(state, String(i++));
      }
    }

    return {
      states: Array.from(stateMap.values()),
      transitions: dfa.states.flatMap((state) => {
        return dfa.alphabet.flatMap((char) => {
          return {
            from: stateMap.get(state),
            to: stateMap.get(dfa.delta[state][char]),
            label: char,
          };
        });
      }),
      initial: stateMap.get(dfa.initial),
      finals: dfa.final.map((state) => stateMap.get(state)),
    };
  };

  return (
    <div className="flex flex-col items-center w-full px-2">
      <p className="text-xl">{question.questionContent}</p>
      <div className="h-full">
        <AutomatonRenderer
          automaton={generateAutomaton(question.answer, question.alphabet)}
        />
      </div>
      <div className="w-full max-w-sm border border-accent rounded-md p-2 text-center my-4 overflow-auto min-h-12 flex justify-center items-center">
        {answer.split("").map((char, index) => (
          <span
            key={index}
            className={
              question.alphabet.includes(char)
                ? "text-green-500"
                : "text-blue-500"
            }
          >
            {char}
          </span>
        ))}
      </div>
      <RegExpKeyboard
        showSpecial={true}
        alphabet={question.alphabet}
        operators={question.operators}
        onInput={handleInput}
        onDelete={handleDelete}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
      />
    </div>
  );
};

export default ToRegexQuestionForm;
