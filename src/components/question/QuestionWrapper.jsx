import React, { useContext, useState } from "react";
import { QuestionContext } from "../../context/QuestionContext";
import RegexQuestionForm from "./question-types/RegexQuestionForm";

const QuestionWrapper = ({
  questionId,
  totalQuestions,
  currentQuestion,
  nextQuestion,
  prevQuestion,
  quitLevel,
  onHintRequest,
  onSubmit,
}) => {
  const { questions, completeQuestion } = useContext(QuestionContext);
  const question = questions.find((q) => q.questionId === questionId);
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  // consolidate counter example states
  const [counterExampleState, setCounterExampleState] = useState({
    show: false,
    examples: null,
  });

  const requestHint = () => {
    onHintRequest();
    setCounterExampleState({
      show: true,
      examples: question.hint,
    });
  };

  const handleDismissCounterExamples = () => {
    setCounterExampleState({
      show: false,
      examples: null,
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
      setCounterExampleState({
        show: true,
        examples: result.counterExamples,
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
    handleDismissCounterExamples();
    nextQuestion();
  };

  const handlePrevQuestion = () => {
    handleDismissCounterExamples();
    prevQuestion();
  };

  const buildCounterExamples = (counterexamples) => {
    if (typeof counterexamples === "string") {
      return <h2 className="font-bold">{counterexamples}</h2>;
    }

    if (question.questionType === "Regex Accepts String") {
      return (
        <>
          <h2 className="font-bold">Incorrect answer:</h2>
          <ul className="list-disc pl-5">
            <li>{counterexamples[0]}</li>
          </ul>
        </>
      );
    }

    const firstCounterExample = counterexamples[0];
    const secondCounterExample = counterexamples[1];

    return (
      <>
        <h2 className="font-bold">Incorrect answer:</h2>
        <ul className="list-disc pl-5">
          {firstCounterExample && (
            <li>Your solution accepts {firstCounterExample}</li>
          )}
          {secondCounterExample && (
            <li>The given regex accepts {secondCounterExample}</li>
          )}
        </ul>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div className="w-full bg-slate-600 shadow-md rounded-t-md p-4 space-y-2">
        <div className="flex justify-between ">
          <button
            disabled={currentQuestion === 0}
            onClick={handlePrevQuestion}
            className="disabled:text-black"
          >
            &lt; Prev
          </button>
          <button onClick={quitLevel}>Quit</button>
          <button onClick={handleNextQuestion} className="disabled:text-black">
            Next &gt;
          </button>
        </div>
        {counterExampleState.show && (
          <div className="w-full bg-red-200 p-4 rounded-md">
            {buildCounterExamples(counterExampleState.examples)}
            <button
              onClick={handleNextQuestion}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-2"
            >
              Continue to Next Question
            </button>
            <button
              onClick={handleDismissCounterExamples}
              className="self-end text-center w-full mt-2 bg-transparent text-blue-500 text-m hover:text-blue-700 transition-colors duration-300"
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            style={{ width: `${progressPercent}%` }}
            className={`h-full bg-green-500 rounded`}
          ></div>
        </div>
        <p className="text-right text-sm text-white">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        {!counterExampleState.show && !question.isCompleted && (
          <button
            onClick={requestHint}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Hint
          </button>
        )}
        {question.isCompleted && (
          <p className="text-green-500 w-full text-center">
            Points earned: {question.score}
          </p>
        )}
      </div>
      <div className="w-full p-4">{renderQuestionTypeComponent()}</div>
    </div>
  );
};

export default QuestionWrapper;
