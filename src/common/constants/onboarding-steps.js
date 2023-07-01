export const ONBOARDING_STEPS = {
  "Construct Automaton": [
    {
      target: "#question-content",
      content: "Your question will appear here.",
      disableBeacon: true,
    },
    {
      target: "#automaton-view",
      content:
        "This is the automaton you are constructing, it will change as you add or update transitions",
    },
    {
      target: "#transition-table",
      content:
        "This is the transition table, you can add or update transitions here.",
    },
    {
      target: "#from-states",
      content: "Select the state you want to transition from.",
    },
    {
      target: "#to-states",
      content: "Select the state you want to transition to.",
    },
    {
      target: "#input-symbol",
      content:
        "Select the input symbols that you want to have transitions for.",
    },
    {
      target: "#submit-button",
      content: "When you are ready, click here to submit and get feedback.",
    },
  ],
};
