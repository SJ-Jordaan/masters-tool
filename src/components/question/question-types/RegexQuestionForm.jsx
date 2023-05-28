import React, { useCallback, useRef, useState } from "react";
import { RegExpKeyboard } from "../../regex-keyboard/RegExpKeyboard";

const RegexQuestionForm = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState("");
  const history = useRef([answer]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleInput = useCallback(
    (char) => {
      const newAnswer = answer + char;
      history.current = [
        ...history.current.slice(0, historyIndex + 1),
        newAnswer,
      ];
      setHistoryIndex(history.current.length - 1);
      setAnswer(newAnswer);
    },
    [answer, historyIndex]
  );

  const handleDelete = () => {
    const newAnswer = answer.slice(0, -1);
    history.current = [
      ...history.current.slice(0, historyIndex + 1),
      newAnswer,
    ];
    setHistoryIndex(history.current.length - 1);
    setAnswer(newAnswer);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setAnswer(history.current[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.current.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setAnswer(history.current[historyIndex + 1]);
    }
  };

  const submit = () => {
    const correct = onSubmit(answer);
    if (correct) {
      setAnswer(""); // reset answer after submission
      history.current = [""];
      setHistoryIndex(0);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-2">
      <h2 className="text-2xl font-bold mb-2">{question.questionType}</h2>
      <p>{question.questionContent}</p>
      <div className="w-full max-w-sm border rounded-md p-2 text-center my-2 overflow-auto min-h-12 flex justify-center items-center">
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
        className="bg-green-500 text-white p-4 w-full rounded-md shadow mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </div>
  );
};

export default RegexQuestionForm;
