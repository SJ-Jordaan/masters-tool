export class Level {
  constructor({
    levelId,
    levelName,
    categoryId,
    description,
    questionIds,
    currentQuestionIndex = 0,
    totalScore = 0,
    score = 0,
    isStarted = false,
    isCompleted = false,
    hintsUsed = 0,
    timeTaken = 0,
    incorrectAttempts = 0,
    isGenerated = false,
    lastAccessed,
  }) {
    this.levelId = levelId;
    this.levelName = levelName;
    this.categoryId = categoryId;
    this.description = description;
    this.questionIds = questionIds;
    this.currentQuestionIndex = currentQuestionIndex;
    this.totalScore = totalScore;
    this.isStarted = isStarted;
    this.isCompleted = isCompleted;
    this.score = score;
    this.hintsUsed = hintsUsed;
    this.timeTaken = timeTaken;
    this.incorrectAttempts = incorrectAttempts;
    this.lastAccessed = lastAccessed;
    this.isGenerated = isGenerated;
  }

  get currentQuestion() {
    return this.questionIds[this.currentQuestionIndex];
  }

  updateTimestamp() {
    this.lastAccessed = Date.now();
  }
}
