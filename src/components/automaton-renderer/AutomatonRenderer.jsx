import React from "react";
import { Graphviz } from "graphviz-react";

const AutomatonRenderer = ({ automaton }) => {
  const automatonToDOT = (automaton) => {
    const color =
      document.documentElement.dataset.theme === "dark" ? "white" : "black";

    let dot = `digraph finite_state_machine {\n`;
    dot += `  bgcolor="transparent";\n`;
    dot += `  fontname="Helvetica,Arial,sans-serif"\n`;
    dot += `  node [fontname="Helvetica,Arial,sans-serif" fontcolor="${color}" color="${color}"]\n`;
    dot += `  edge [fontname="Helvetica,Arial,sans-serif"  color="${color}"]\n`;
    dot += `  rankdir=LR;\n`;

    dot += `  node [shape = doublecircle]; ${automaton.finals.join(" ")};\n`;
    dot += `  node [shape = circle];\n`;

    dot += `  ini [shape=point, label=""];\n`;
    dot += `  ini -> ${automaton.initial};\n`;

    // group transitions by 'from' and 'to', join labels with comma
    const groupedTransitions = automaton.transitions.reduce(
      (acc, transition) => {
        const existingTransition = acc.find(
          (t) => t.from === transition.from && t.to === transition.to
        );
        if (existingTransition) {
          existingTransition.label.push(...transition.label);
        } else {
          acc.push({ ...transition, label: [...transition.label] });
        }
        return acc;
      },
      []
    );

    for (let transition of groupedTransitions) {
      dot += `  ${transition.from} -> ${
        transition.to
      } [label = "${transition.label.join(",")}" fontcolor="${color}"];\n`;
    }

    dot += `}\n`;

    return dot;
  };

  return (
    <div className="bg-transparent">
      <Graphviz
        dot={automatonToDOT(automaton)}
        options={{
          height: null,
          width: window.innerWidth,
        }}
      />
    </div>
  );
};

export default AutomatonRenderer;
