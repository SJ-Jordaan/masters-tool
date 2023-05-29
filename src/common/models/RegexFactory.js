export class RegexFactory {
  constructor(alphabet) {
    this.alphabet = alphabet;
    this.alphabetString = alphabet.join("|");
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

  randomRE(length, mode) {
    let re;
    switch (mode) {
      case "begin":
      case "end":
      case "contain":
        re = this.randomTheoreticalRE(length, mode);
        break;
      case "exact":
      case "at least":
      case "divisible":
        re = this.randomLengthConstraintRE(length, mode);
        break;
      default:
        throw new Error("Invalid mode");
    }
    return re;
  }

  randomTheoreticalRE(length, mode) {
    const str = this.getRandomSubstring(length);
    let re;
    switch (mode) {
      case "begin":
        re = `${str}${this.alphabetStar}`;
        break;
      case "end":
        re = `${this.alphabetStar}${str}`;
        break;
      case "contain":
        re = `${this.alphabetStar}${str}${this.alphabetStar}`;
        break;
      default:
        throw new Error("Invalid mode");
    }
    return re;
  }

  randomLengthConstraintRE(length, mode) {
    let re;
    const substring = `(${this.alphabetString})`;
    const repeatedSubstring = this.repeatSubstring(substring, length);
    switch (mode) {
      case "exact":
        re = repeatedSubstring;
        break;
      case "at least":
        re = `${repeatedSubstring}${this.alphabetStar}`;
        break;
      case "divisible":
        re = `(${repeatedSubstring})*`;
        break;
      default:
        throw new Error("Invalid mode");
    }
    return re;
  }
}
