import React from "react";
import { RegExpKeyboard } from "../../regex-keyboard/RegExpKeyboard";
import { displayAlphabet } from "../../../common/helpers/regex";

const RegexQuestionForm = ({
  question,
  answer,
  handleInput,
  handleDelete,
  handleUndo,
  handleRedo,
  handleReset,
}) => {
  return (
    <div className="flex flex-col items-center w-full px-2">
      <div className="divider mt-0" />
      <p className="">
        {`Given the alphabet Σ = {${displayAlphabet(question.alphabet).join(
          ","
        )}}`}
      </p>
      <div className="divider" />
      <p className="text-xl">{question.questionContent}</p>
      <div className="w-full max-w-sm border rounded-md p-2 text-center my-4 overflow-auto min-h-12 flex justify-center items-center">
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
        showSpecial={question.questionType !== "Regex Accepts String"}
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

export default RegexQuestionForm;
