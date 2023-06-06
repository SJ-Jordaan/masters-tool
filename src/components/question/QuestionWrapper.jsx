import React, { useContext } from "react";
import { QuestionContext } from "../../context/QuestionContext";
import RegexQuestionForm from "./question-types/RegexQuestionForm";
import { toast } from "react-toastify";
import {
  AiOutlineBulb,
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import CircularMenu from "../circular-menu/CircularMenu";
import useAnswerHistory from "../../hooks/useAnswerHistory";
import useSound from "use-sound";
import correct from "../../common/sounds/correct.mp3";
import incorrect from "../../common/sounds/incorrect.mp3";
import ToRegexQuestionForm from "./question-types/ToRegexQuestionForm";
import AutomataQuestionForm from "./question-types/AutomataQuestionForm";

const QuestionWrapper = ({
  questionId,
  currentQuestion,
  nextQuestion,
  prevQuestion,
  quitLevel,
  onHintRequest,
  onSubmit,
  levelProgress,
}) => {
  const { questions, completeQuestion } = useContext(QuestionContext);
  const question = questions.find((q) => q.questionId === questionId);
  const [playCorrect] = useSound(correct, { volume: 0.25 });
  const [playIncorrect] = useSound(incorrect, { volume: 0.25 });
  const [hintIndex, setHintIndex] = React.useState(0);

  const {
    answer,
    handleInput,
    handleDelete,
    handleUndo,
    handleRedo,
    resetAnswerHistory,
  } = useAnswerHistory();

  const requestHint = () => {
    onHintRequest();
    toast(question.hints[hintIndex], {
      type: "info",
      toastId: "hint",
      autoClose: 5000,
      position: "bottom-center",
      style: {
        fontSize: "1.2rem",
      },
    });
    setHintIndex((p) => (p + 1 < question.hints.length ? p + 1 : 0));
  };

  const handleAnswerSubmission = () => {
    if (question.isCompleted) {
      handleNextQuestion();
      return;
    }

    const result = onSubmit(answer);
    if (result.equal) {
      playCorrect();
      resetAnswerHistory();
      completeQuestion(questionId);
      nextQuestion();
      return;
    }

    playIncorrect();

    if (result.counterExamples) {
      const [submission, memo] = result.counterExamples;

      if (submission) {
        toast(`Your regex incorrectly recognised ${submission}`, {
          type: "error",
          toastId: "counter-example",
          autoClose: 5000,
          position: "bottom-center",
          style: {
            fontSize: "1.2rem",
          },
        });
      } else {
        toast(`Your regex incorrectly rejected ${memo}`, {
          type: "error",
          toastId: "counter-example",
          autoClose: 5000,
          position: "bottom-center",
          style: {
            fontSize: "1.2rem",
          },
        });
      }
    } else if (result.message) {
      toast(result.message, {
        type: "error",
        toastId: "counter-example",
        autoClose: 5000,
        position: "bottom-center",
        style: {
          fontSize: "1.2rem",
        },
      });
    }
  };

  const renderQuestionTypeComponent = () => {
    switch (question.questionType) {
      case "Regex":
      case "Regex Equivalence":
      case "Regex Accepts String":
        return (
          <RegexQuestionForm
            question={question}
            answer={answer}
            handleInput={handleInput}
            handleDelete={handleDelete}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleReset={resetAnswerHistory}
          />
        );
      case "Automaton to Regex":
        return (
          <ToRegexQuestionForm
            question={question}
            answer={answer}
            handleInput={handleInput}
            handleDelete={handleDelete}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleReset={resetAnswerHistory}
          />
        );
      case "Construct Automaton":
        return (
          <AutomataQuestionForm
            question={question}
            answer={answer}
            handleInput={handleInput}
            handleDelete={handleDelete}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleReset={resetAnswerHistory}
          />
        );
      default:
        return null;
    }
  };

  const handleNextQuestion = () => {
    nextQuestion();
    resetAnswerHistory();
  };

  const handlePrevQuestion = () => {
    prevQuestion();
    resetAnswerHistory();
  };

  return (
    <div className="">
      <div className="flex w-full items-center">
        <ul className="steps m-2 w-full">
          {levelProgress.map((completed, index) => (
            <li
              key={`${index}-step`}
              className={`step ${completed ? "step-success" : ""} ${
                index === currentQuestion ? "step-primary" : ""
              }`}
            ></li>
          ))}
        </ul>
      </div>
      <div className={`w-full h-full p-2`}>{renderQuestionTypeComponent()}</div>
      <CircularMenu
        items={[
          <button
            key="quit"
            className="menu-item btn btn-error btn-circle"
            onClick={quitLevel}
          >
            <AiOutlineClose className="h-6 w-6" />
          </button>,
          <button
            key="prev"
            className="menu-item btn btn-circle border-0 bg-transparent"
            onClick={handlePrevQuestion}
          >
            <AiOutlineLeft className="h-6 w-6" />
            <span className="text-xs">Prev</span>
          </button>,
          <button
            key="next"
            className="menu-item btn btn-circle border-0 bg-transparent"
            onClick={handleNextQuestion}
          >
            <AiOutlineRight className="h-6 w-6" />
            <span className="text-xs">Next</span>
          </button>,
          <button
            key="hint"
            className="menu-item btn btn-warning btn-circle"
            onClick={requestHint}
          >
            <AiOutlineBulb className="h-6 w-6" />
          </button>,
        ]}
      />
      <button
        onClick={handleAnswerSubmission}
        className="h-16 w-16 btn btn-success btn-circle fixed bottom-4 right-4"
      >
        {question.isCompleted ? (
          <span className={`text-xs`}>Next</span>
        ) : (
          <span className={`text-xs`}>Submit</span>
        )}
      </button>
    </div>
  );
};

export default QuestionWrapper;
