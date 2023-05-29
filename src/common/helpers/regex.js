export const normaliseAlphabet = (alphabet) => {
  if (Array.isArray(alphabet)) {
    return alphabet.map((char) => normaliseAlphabet(char));
  }

  if (typeof alphabet === "string" && alphabet.length > 1) {
    return normaliseAlphabet(alphabet.split("")).join("");
  }

  switch (alphabet) {
    case "∅":
      return "∅";
    case "ε":
      return "";
    case "∪":
      return "|";
    default:
      return alphabet;
  }
};

export const displayAlphabet = (alphabet) => {
  if (Array.isArray(alphabet)) {
    return alphabet.map((char) => displayAlphabet(char));
  }

  if (typeof alphabet === "string" && alphabet.length > 1) {
    return displayAlphabet(alphabet.split("")).join("");
  }

  switch (alphabet) {
    case "∅":
      return "∅";
    case "":
      return "ε";
    case "|":
      return "∪";
    default:
      return alphabet;
  }
};
