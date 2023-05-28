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

const QuestionWrapper = ({
  questionId,
  totalQuestions,
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

  const requestHint = () => {
    onHintRequest();
    toast(question.hint, {
      type: "info",
      autoClose: 10000,
    });
  };

  const handleAnswerSubmission = (answer) => {
    const result = onSubmit(answer);
    if (result.equal) {
      completeQuestion(questionId);
      nextQuestion();
      return true;
    }

    if (result.counterExamples) {
      const [submission, memo] = result.counterExamples;

      if (submission) {
        toast(`Your regex incorrectly recognised ${submission}`, {
          type: "error",
          autoClose: 10000,
        });
      } else {
        toast(`Your regex incorrectly rejected ${memo}`, {
          type: "error",
          autoClose: 10000,
        });
      }
    } else if (result.message) {
      toast(result.message, {
        type: "error",
        autoClose: 10000,
      });
    }

    return false;
  };

  const renderQuestionTypeComponent = () => {
    switch (question.questionType) {
      case "Regex":
      case "Regex Equivalence":
      case "Regex Accepts String":
        return (
          <RegexQuestionForm
            question={question}
            onSubmit={handleAnswerSubmission}
          />
        );
      default:
        return null;
    }
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  const handlePrevQuestion = () => {
    prevQuestion();
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center px-2">
        <AiOutlineLeft
          disabled={currentQuestion === 0}
          onClick={handlePrevQuestion}
          className="w-6 h-6"
        />
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
        <AiOutlineRight onClick={handleNextQuestion} className="w-6 h-6" />
      </div>
      <div className="w-full p-4">{renderQuestionTypeComponent()}</div>
      <button
        className="h-16 w-16 btn btn-error btn-circle fixed bottom-4 left-4"
        onClick={quitLevel}
      >
        <AiOutlineClose className="h-8 w-8" />
      </button>
      <button
        className="h-16 w-16 btn btn-warning btn-circle fixed bottom-4 right-4"
        onClick={requestHint}
      >
        <AiOutlineBulb className="h-8 w-8" />
      </button>
    </div>
  );
};

export default QuestionWrapper;
