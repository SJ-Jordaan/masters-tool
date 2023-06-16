import { useCallback, useRef, useState } from "react";

const useAnswerHistory = () => {
  const [answer, setAnswer] = useState("");
  const history = useRef([answer]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleInput = useCallback(
    (input) => {
      let newAnswer;
      if (typeof input === "string") {
        newAnswer = answer + input;
      } else if (typeof input === "object" && input !== null) {
        newAnswer = { ...answer, ...input };
      } else {
        return;
      }
      history.current = [
        ...history.current.slice(0, historyIndex + 1),
        newAnswer,
      ];
      setHistoryIndex(history.current.length - 1);
      setAnswer(newAnswer);
    },
    [answer, historyIndex]
  );

  const handleDelete = useCallback(() => {
    const newAnswer = typeof answer === "string" ? answer.slice(0, -1) : {};
    history.current = [
      ...history.current.slice(0, historyIndex + 1),
      newAnswer,
    ];
    setHistoryIndex(history.current.length - 1);
    setAnswer(newAnswer);
  }, [answer, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setAnswer(history.current[historyIndex - 1]);
    }
  }, [historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.current.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setAnswer(history.current[historyIndex + 1]);
    }
  }, [historyIndex]);

  const resetAnswerHistory = useCallback(() => {
    setAnswer("");
    history.current = [""];
    setHistoryIndex(0);
  }, []);

  return {
    answer,
    handleInput,
    handleDelete,
    handleUndo,
    handleRedo,
    resetAnswerHistory,
  };
};

export default useAnswerHistory;
