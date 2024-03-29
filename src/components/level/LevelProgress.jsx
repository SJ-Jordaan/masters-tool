import React, { useContext, useEffect } from "react";
import { QuestionContext } from "../../context/QuestionContext";
import QuestionWrapper from "../question/QuestionWrapper";
import LevelEnd from "./LevelEnd";
import { LevelContext } from "../../context/LevelContext";
import { useNavigate, useParams } from "react-router-dom";

const LevelProgress = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const { questions, evaluateAnswer } = useContext(QuestionContext);
  const {
    levels,
    completeQuestion,
    setCurrentQuestionIndex,
    completeLevel,
    quitLevel,
    startLevel,
    trackHintsUsed,
    trackIncorrectAttempts,
    trackTimeTaken,
  } = useContext(LevelContext);
  const level = levels.find((l) => l.levelId === levelId);

  useEffect(() => {
    if (level && !level.isStarted) {
      startLevel(level.levelId);
    }

    const interval = setInterval(() => {
      trackTimeTaken(level.levelId, level.timeTaken + 1);
    }, 1000);

    if (level && level.isCompleted) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const navigateToNextQuestion = () => {
    if (level.currentQuestionIndex < level.questionIds.length - 1) {
      setCurrentQuestionIndex(level.levelId, level.currentQuestionIndex + 1);
    } else {
      completeLevel(level.levelId);
    }
  };

  const navigateToPrevQuestion = () => {
    if (level.currentQuestionIndex > 0) {
      setCurrentQuestionIndex(level.levelId, level.currentQuestionIndex - 1);
    }
  };

  const quitAndNavigateHome = () => {
    quitLevel(level.levelId);
    navigate("/", { replace: true });
  };

  const submitAndEvaluateAnswer = (answer) => {
    const result = evaluateAnswer(level.currentQuestion, answer);

    if (result.equal) {
      completeQuestion(level.levelId, result.score);
      navigateToNextQuestion();
    } else {
      trackIncorrectAttempts(level.levelId, level.incorrectAttempts + 1);
    }

    return result;
  };

  const requestHint = () => {
    trackHintsUsed(level.levelId, level.hintsUsed + 1);
  };

  if (level && level.isCompleted) {
    return (
      <LevelEnd
        {...level}
        levels={levels.filter((l) => l.categoryId === level.categoryId)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <QuestionWrapper
        questionId={level.currentQuestion}
        showTutorial={level.levelId === 'experiment'}
        onSubmit={submitAndEvaluateAnswer}
        totalQuestions={level.questionIds.length}
        currentQuestion={level.currentQuestionIndex}
        nextQuestion={navigateToNextQuestion}
        prevQuestion={navigateToPrevQuestion}
        quitLevel={quitAndNavigateHome}
        onHintRequest={requestHint}
        levelProgress={level.questionIds.map(
          (id) => questions.find((q) => q.questionId === id).isCompleted
        )}
      />
    </div>
  );
};

export default LevelProgress;
