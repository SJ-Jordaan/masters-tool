export class Question {
  constructor({
    questionId,
    questionType,
    questionContent,
    alphabet,
    answer,
    hints,
    score,
    isCompleted = false,
    operators = [],
    isGenerated = false,
    automaton = null,
  }) {
    this.questionId = questionId;
    this.questionType = questionType;
    this.questionContent = questionContent;
    this.answer = answer;
    this.hints = typeof hints === "string" ? [hints] : hints;
    this.score = score;
    this.alphabet =
      typeof alphabet === "string" ? alphabet.split("") : alphabet;
    this.isCompleted = isCompleted;
    this.operators = operators;
    this.isGenerated = isGenerated;
    this.automaton = automaton;
  }

  complete() {
    this.isCompleted = true;
  }
}
