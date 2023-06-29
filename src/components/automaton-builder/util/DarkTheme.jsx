export const DarkTheme = [
  {
    selector: "node",
    style: {
      "background-color": "#ffffff",
      label: "data(id)",
      color: "black",
      "text-valign": "center",
      "text-halign": "center",
      "border-color": "#000000",
      "border-width": 1,
    },
  },
  {
    selector: "node.initial",
    style: {
      shape: "ellipse",
    },
  },
  {
    selector: "node.final",
    style: {
      "border-width": 1,
    },
  },
  {
    selector: "node.final-ghost",
    style: {
      "background-color": "#000000",
      "border-color": "#000000",
      "border-width": 3,
      width: 40,
      height: 40,
    },
  },
  {
    selector: "edge",
    style: {
      width: 1,
      "line-color": "#000000",
      "target-arrow-color": "#000000",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      "edge-text-rotation": "autorotate",
      color: "black",
      label: "data(label)",
      "text-margin-y": -10,
    },
  },
  {
    selector: "node.initial-ghost",
    style: {
      visibility: "hidden",
    },
  },
  {
    selector: "edge.initial-ghost",
    style: {
      "line-color": "#000000",
      "target-arrow-color": "#000000",
      "target-arrow-shape": "triangle",
    },
  },
];
