import { DarkTheme } from "./DarkTheme";
import CytoscapeComponent from "react-cytoscapejs";
import { useMemo, useRef } from "react";

export default function useCytoscape({ automaton, onNodeClick }) {
  const cyInstance = useRef(null);
  const handleNodeClick = (event) => {
    onNodeClick(event.target);
  };

  const cyComponent = useMemo(
    () => (
      <CytoscapeComponent
        className="h-full"
        elements={[
          ...automaton.states.flatMap((state) => ({
            data: { id: state, label: state },
            classes:
              state === automaton.initial
                ? "initial"
                : automaton.finals.includes(state)
                ? "final"
                : "",
          })),
          ...automaton.transitions.map((transition) => ({
            data: {
              id: `${transition.from}-${transition.to}-${
                transition.label
              }-${Date.now()}`,
              source: transition.from,
              target: transition.to,
              label: transition.label,
            },
          })),
        ]}
        layout={{
          name: "grid",
          fit: true, // whether to fit the viewport to the graph
          padding: 30, // padding used on fit
          boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
          avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
          avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
          nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
          spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
          condense: false, // uses all available space on false, uses minimal space on true
          rows: undefined, // force num of rows in the grid
          cols: undefined, // force num of columns in the grid
          position: function (node) {}, // returns { row, col } for element
          sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
          animate: false, // whether to transition the node positions
          animationDuration: 500, // duration of animation in ms if enabled
          animationEasing: undefined, // easing of animation if enabled
          animateFilter: function (node, i) {
            return true;
          }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
          ready: undefined, // callback on layoutready
          stop: undefined, // callback on layoutstop
          transform: function (node, position) {
            return position;
          }, // transform a given node position. Useful for changing flow direction in discrete layouts
          zoomingEnabled: false,
          userZoomingEnabled: false,
          panningEnabled: false,
          userPanningEnabled: false,
          autoungrabify: true,
        }}
        stylesheet={DarkTheme}
        cy={(cy) => {
          cyInstance.current = cy;
          cy.on("tap", "node", handleNodeClick);
        }}
      />
    ),
    [
      ...automaton.finals,
      ...automaton.initial,
      ...automaton.states,
      ...automaton.transitions,
      onNodeClick,
    ]
  );

  return { cyComponent, cyInstance };
}
