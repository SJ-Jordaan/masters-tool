import React, {useContext, useState} from "react";
import {LevelContext} from "../../../context/LevelContext";
import {QuestionContext} from "../../../context/QuestionContext";

// Mock question types array. Replace this with your actual data source.
const QUESTION_TYPES = ["Regex", "Regex Equivalence", "Regex Accepts String"];
const QUESTION_TYPES_MAP = {
  Regex: "Regular expression recognises string",
  "Regex Equivalence": "Equivalent regular expressions",
  "Regex Accepts String": "String recognised by regular expression",
};

const CreateLevel = ({ onCreate }) => {
  const { addLevel } = useContext(LevelContext);
  const { generateQuestions } = useContext(QuestionContext);
  const [levelName, setLevelName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [numQuestions, setNumQuestions] = useState(1);
  const [questionTypes, setQuestionTypes] = useState([]);

  const handleCreateLevel = () => {
    const newQuestions = generateQuestions(
      questionTypes,
      difficulty,
      numQuestions
    );
    const questionIds = newQuestions.map((question) => question.questionId);

    const newLevel = {
      levelId: Date.now().toString(),
      categoryId: "3",
      levelName,
      description,
      questionIds,
      isGenerated: true,
      totalScore: newQuestions.reduce(
        (acc, question) => acc + question.score,
        0
      ),
    };

    addLevel(newLevel);
    onCreate();
  };

  return (
    <div className="collapse collapse-plus">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-xl font-medium">
        Build new exercise
      </div>
      <div className="collapse-content">
        <div className="max-w-sm flex space-x-4">
          <div className="flex-1">
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="levelName"
              >
                Level Name:
              </label>
              <input
                className="input input-bordered w-full"
                id="levelName"
                type="text"
                value={levelName}
                onChange={(e) => setLevelName(e.target.value.slice(0, 10))}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              <input
                className="input input-bordered w-full"
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 30))}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="difficulty"
              >
                Difficulty:
              </label>
              <input
                className="range"
                id="difficulty"
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="numQuestions"
              >
                Number of Questions:
              </label>
              <input
                className="range"
                id="numQuestions"
                type="range"
                min="1"
                max="10"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col mb-4">
              <span className="block text-sm font-bold mb-2">
                Question Types:
              </span>
              {QUESTION_TYPES.map((type) => (
                <label
                  key={type}
                  className="inline-flex items-center mt-3 gap-1.5"
                >
                  <input
                    id={type}
                    type="checkbox"
                    className="checkbox"
                    checked={questionTypes.includes(type)}
                    onChange={() =>
                      setQuestionTypes((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      )
                    }
                  />
                  <span className="label-text">{QUESTION_TYPES_MAP[type]}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="btn w-full"
                type="button"
                onClick={handleCreateLevel}
              >
                Create Level
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLevel;
