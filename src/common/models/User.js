export class User {
  constructor(
    username,
    avatar,
    totalScore = 0,
    currentLevel = 1,
    completedLevels = [],
    currentLevels = [],
    currentQuestions = [],
    achievements = []
  ) {
    this.username = username;
    this.avatar = avatar;
    this.totalScore = totalScore;
    this.currentLevel = currentLevel;
    this.completedLevels = completedLevels;
    this.currentLevels = currentLevels;
    this.currentQuestions = currentQuestions;
    this.achievements = achievements;
  }

  incrementScore(score) {
    this.totalScore += score;
  }

  advanceLevel() {
    this.currentLevel++;
  }

  completeLevel(levelId) {
    this.completedLevels.push(levelId);
  }

  startLevel(levelId) {
    if (!this.currentLevels.includes(levelId)) {
      this.currentLevels.push(levelId);
    }
  }

  addCurrentQuestion(questionId) {
    if (!this.currentQuestions.includes(questionId)) {
      this.currentQuestions.push(questionId);
    }
  }

  addAchievement(achievement) {
    this.achievements.push(achievement);
  }
}
