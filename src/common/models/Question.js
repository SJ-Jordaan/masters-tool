export class Question {
  constructor(
    questionId,
    questionType,
    questionContent,
    alphabet,
    answer,
    hint,
    score,
    isCompleted = false,
    operators = []
  ) {
    this.questionId = questionId;
    this.questionType = questionType;
    this.questionContent = questionContent;
    this.answer = answer;
    this.hint = hint;
    this.score = score;
    this.alphabet =
      typeof alphabet === "string" ? alphabet.split("") : alphabet;
    this.isCompleted = isCompleted;
    this.operators = operators;
  }

  complete() {
    this.isCompleted = true;
  }
}
