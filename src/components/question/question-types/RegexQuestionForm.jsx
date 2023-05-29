import React from "react";
import { RegExpKeyboard } from "../../regex-keyboard/RegExpKeyboard";
import useAnswerHistory from "../../../hooks/useAnswerHistory";
import { displayAlphabet } from "../../../common/helpers/regex";
import useSound from "use-sound";
import correct from "../../../common/sounds/correct.mp3";
import incorrect from "../../../common/sounds/incorrect.mp3";

const RegexQuestionForm = ({ question, onSubmit }) => {
  const [playCorrect] = useSound(correct, { volume: 0.25 });
  const [playIncorrect] = useSound(incorrect, { volume: 0.25 });

  const {
    answer,
    handleInput,
    handleDelete,
    handleUndo,
    handleRedo,
    resetAnswerHistory,
  } = useAnswerHistory();

  const submit = () => {
    const correct = onSubmit(answer);

    if (correct) {
      playCorrect();
      resetAnswerHistory();
      return;
    }

    playIncorrect();
  };

  return (
    <div className="flex flex-col items-center w-full px-2">
      <div className="divider mt-0" />
      <p className="">
        {`Given a language L with Σ = {${displayAlphabet(
          question.alphabet
        ).join(",")}}`}
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
        alphabet={question.alphabet}
        operators={question.operators}
        onInput={handleInput}
        onDelete={handleDelete}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      <button
        onClick={submit}
        disabled={question.isCompleted}
        className="btn btn-success mt-12 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </div>
  );
};

export default RegexQuestionForm;
