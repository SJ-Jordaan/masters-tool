export const DarkTheme = [
  {
    selector: "node",
    style: {
      "background-color": "#ffffff",
      label: "data(id)",
      color: "black",
      "text-valign": "center",
      "text-halign": "center",
    },
  },
  {
    selector: "edge",
    style: {
      width: 3,
      "line-color": "#ffffff",
      "target-arrow-color": "#ffffff",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      "edge-text-rotation": "autorotate",
      color: "black",
      label: "data(label)",
    },
  },
  {
    selector: "node.initial",
    style: {
      "background-color": "green",
    },
  },
  {
    selector: "node.final",
    style: {
      "background-color": "red",
    },
  },
];
