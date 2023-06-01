import to_NFA from "dfa-lib/regex";
import { normaliseAlphabet } from "../helpers/regex";

export class RegexFactory {
  constructor(alphabet) {
    this.alphabet = alphabet;
    this.alphabetString = alphabet.join("∪");
    this.alphabetStar = `(${this.alphabetString})*`;
  }

  getRandomSubstring(length) {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
    }
    return str;
  }

  repeatSubstring(substring, times) {
    let result = "";
    for (let i = 0; i < times; i++) {
      result += substring;
    }
    return result;
  }

  generateQuestionConfig(length, mode, questionType) {
    const config = this.randomRE(length, mode);
    const hints = this.generateHints(mode, config.string, questionType, length);
    const questionText = this.generateQuestionText(
      mode,
      questionType,
      config.string,
      config.re,
      length
    );

    return {
      ...config,
      hints,
      questionText,
    };
  }

  generateQuestionText(mode, questionType, string, re, length) {
    let question = "";

    switch (questionType) {
      case "Regex":
        switch (mode) {
          case "begin":
            question = `Provide a regular expression that recognises strings that begin with ${string}`;
            break;
          case "contain":
            question = `Provide a regular expression that recognises strings that contain ${string}`;
            break;
          case "end":
            question = `Provide a regular expression that recognises strings that end with ${string}`;
            break;
          case "exact":
            question = `Provide a regular expression that recognises strings that are exactly ${length} character${
              length === 1 ? "" : "s"
            } long`;
            break;
          case "at least":
            question = `Provide a regular expression that recognises strings that contain at least ${length} character${
              length === 1 ? "" : "s"
            }`;
            break;
          case "divisible":
            question = `Provide a regular expression that recognises strings with a length divisible by ${length}`;
            break;
          default:
            throw new Error("Invalid mode");
        }
        break;
      case "Regex Equivalence":
        question = `Provide a regular expression that is equivalent to ${re}`;
        break;
      case "Regex Accepts String":
        question = `Provide a string that is accepted by ${re}`;
        break;
      default:
        throw new Error("Invalid question type");
    }

    return question;
  }

  generateHints(mode, string, questionType, length) {
    let hints = [];

    switch (mode) {
      case "begin":
        switch (questionType) {
          case "Regex":
            hints = [
              `The regular expression should match strings that start with "${string}".`,
            ];
            break;
          case "Regex Equivalence":
            hints = [
              `The regular expression should be equivalent to one that matches strings starting with "${string}".`,
              `Think about how to construct a regex that has the same behavior, but may look different.`,
            ];
            break;
          case "Regex Accepts String":
            hints = [
              `Find a string that starts with "${string}" and is accepted by the given regular expression.`,
              `The string should start with "${string}".`,
            ];
            break;
          default:
            throw new Error("Invalid question type");
        }
        break;
      case "contain":
        switch (questionType) {
          case "Regex":
            hints = [
              `The regular expression should match strings that contain "${string}".`,
            ];
            break;
          case "Regex Equivalence":
            hints = [
              `The regular expression should be equivalent to one that matches strings containing "${string}".`,
              `Think about how to construct a regex that has the same behavior, but may look different.`,
            ];
            break;
          case "Regex Accepts String":
            hints = [
              `Find a string that contains "${string}" and is accepted by the given regular expression.`,
              `The string should contain "${string}".`,
            ];
            break;
          default:
            throw new Error("Invalid question type");
        }
        break;
      case "end":
        switch (questionType) {
          case "Regex":
            hints = [
              `The regular expression should match strings that end with "${string}".`,
            ];
            break;
          case "Regex Equivalence":
            hints = [
              `The regular expression should be equivalent to one that matches strings ending with "${string}".`,
              `Think about how to construct a regex that has the same behavior, but may look different.`,
            ];
            break;
          case "Regex Accepts String":
            hints = [
              `Find a string that ends with "${string}" and is accepted by the given regular expression.`,
              `The string should end with "${string}".`,
            ];
            break;
          default:
            throw new Error("Invalid question type");
        }
        break;
      case "exact":
        switch (questionType) {
          case "Regex":
            hints = [
              `The regular expression should match strings that are exactly ${length} characters long.`,
            ];
            break;
          case "Regex Equivalence":
            hints = [
              `The regular expression should be equivalent to one that matches strings that are exactly ${length} characters long.`,
              `Think about how to construct a regex that has the same behavior, but may look different.`,
            ];
            break;
          case "Regex Accepts String":
            hints = [
              `Find a string that is exactly ${length} characters long and is accepted by the given regular expression.`,
              `The string should be exactly ${length} characters long.`,
            ];
            break;
          default:
            throw new Error("Invalid question type");
        }
        break;
      case "at least":
        switch (questionType) {
          case "Regex":
            hints = [
              `The regular expression should match strings that are at least ${length} characters long.`,
            ];
            break;
          case "Regex Equivalence":
            hints = [
              `The regular expression should be equivalent to one that matches strings that are at least ${length} characters long.`,
              `Think about how to construct a regex that has the same behavior, but may look different.`,
            ];
            break;
          case "Regex Accepts String":
            hints = [
              `Find a string that is at least ${length} characters long and is accepted by the given regular expression.`,
              `The string should be at least ${length} characters long.`,
            ];
            break;
          default:
            throw new Error("Invalid question type");
        }
        break;
      case "divisible":
        switch (questionType) {
          case "Regex":
            hints = [
              `The regular expression should match strings where the length is divisible by ${length}.`,
              `For example, it should accept "${string}" where the length of ${string} is divisible by ${length}.`,
            ];
            break;
          case "Regex Equivalence":
            hints = [
              `The regular expression should be equivalent to one that matches strings where the length is divisible by ${length}.`,
              `Think about how to construct a regex that has the same behavior, but may look different.`,
            ];
            break;
          case "Regex Accepts String":
            hints = [
              `Find a string where the length is divisible by ${length} and is accepted by the given regular expression.`,
              `The string length should be divisible by ${length}.`,
            ];
            break;
          default:
            throw new Error("Invalid question type");
        }
        break;
      default:
        throw new Error("Invalid mode");
    }

    return hints;
  }

  randomRE(length, mode) {
    const substring = this.getRandomSubstring(length);
    const preppedAlphabetString = `(${this.alphabetString})`;
    let re = "";
    let string = "";

    switch (mode) {
      case "begin":
        re = `${substring}${this.alphabetStar}`;
        string = to_NFA(normaliseAlphabet(re), normaliseAlphabet(this.alphabet))
          .to_DFA()
          .find_passing();
        break;
      case "end":
        re = `${this.alphabetStar}${substring}`;
        string = to_NFA(normaliseAlphabet(re), normaliseAlphabet(this.alphabet))
          .to_DFA()
          .find_passing();
        break;
      case "contain":
        re = `${this.alphabetStar}${substring}${this.alphabetStar}`;
        string = to_NFA(normaliseAlphabet(re), normaliseAlphabet(this.alphabet))
          .to_DFA()
          .find_passing();
        break;
      case "exact":
        const repeatedAlphabetString = this.repeatSubstring(
          preppedAlphabetString,
          length
        );
        re = repeatedAlphabetString;
        string = repeatedAlphabetString;
        break;
      case "at least":
        re = `${this.repeatSubstring(preppedAlphabetString, length)}${
          this.alphabetStar
        }`;
        string = to_NFA(normaliseAlphabet(re), normaliseAlphabet(this.alphabet))
          .to_DFA()
          .find_passing();
        break;
      case "divisible":
        re = `(${this.repeatSubstring(preppedAlphabetString, length)})*`;
        break;
      default:
        throw new Error("Invalid mode");
    }

    return { re, string };
  }
}
