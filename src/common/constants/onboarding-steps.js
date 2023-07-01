export const ONBOARDING_STEPS = {
  "Construct Automaton": [
    {
      target: "#question-content",
      content: "You will be building an automaton now.",
      disableBeacon: true,
    },
    {
      target: "#automaton-view",
      content:
        "The visualisation will change as you update the transitions. Take note of the highlights.",
    },
    {
      target: "#transition-table",
      content: "You will update the transition table with a 3 step process.",
    },
    {
      target: "#from-states",
      content: "First select the state you want to transition from.",
    },
    {
      target: "#to-states",
      content: "Secondly pick the state you want to transition to.",
    },
    {
      target: "#input-symbol",
      content:
        "Finally you will be presented with symbols to add. You may add or remove as you wish.",
    },
    {
      target: "#from-0",
      content: "State 0 is the initial state and is selected by default.",
    },
    {
      target: "#to-1",
      content:
        "To start off, select state 1 and add a transition with symbol a. The rest is up to you!",
    },
  ],
  "Automaton to Regex": [
    {
      target: "#automaton-view",
      content:
        "This question introduces an automaton visualisation. Everything else remains the same.",
      disableBeacon: true,
    },
  ],
  "Regex Accepts String": [
    {
      target: "#initial-greeting",
      content: "Welcome to the experiment!",
      disableBeacon: true,
    },
    {
      target: "#initial-greeting",
      content:
        "I will guide you through these questions using popups like this one.",
    },
    {
      target: "#question-content",
      content: "For this task and all others, your question will appear here.",
    },
    {
      target: "#regex-solution",
      content: "As you build your string, it will appear here.",
    },
    {
      target: "#regex-keyboard",
      content: "Build up your string using these buttons.",
    },
    {
      target: "#regex-utility",
      content:
        "If you make a mistake, you can clear all, undo, redo, or delete the last symbol.",
    },
    {
      target: "#regex-alphabet",
      content: "Symbols in your alphabet will appear here",
    },
    {
      target: "#circularMenu",
      content:
        "If you get stuck, you can press this button to get hints, or move to another question.",
    },
    {
      target: "#submit-button",
      content: "When you are ready, click here to submit and get feedback.",
    },
  ],
  "Regex Equivalence": [
    {
      target: "#question-content",
      content:
        "The previous question asked for a string, but now you need to provide a regular expression.",
      disableBeacon: true,
    },
    {
      target: "#regex-solution",
      content: "As you build your regular expression, it will appear here.",
    },
    {
      target: "#regex-keyboard",
      content:
        "You are now provided with a richer set of features to solve the problem.",
    },
    {
      target: "#regex-utility",
      content: "These buttons remain the same as in the previous question.",
    },
    {
      target: "#regex-operators",
      content: "You may use any of these regular operators in your solution.",
    },
    {
      target: "#regex-special",
      content:
        "These are shortcuts for common regex patterns. Play around with them to see what they do!",
    },
  ],
  Regex: [
    {
      target: "#circularMenu",
      content:
        "Don't forget you can request hints or move to another question if you get stuck.",
      disableBeacon: true,
    },
  ],
};
