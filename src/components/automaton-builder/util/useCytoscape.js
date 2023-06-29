import { DarkTheme } from "./DarkTheme";
import CytoscapeComponent from "react-cytoscapejs";
import { useMemo, useRef } from "react";

export default function useCytoscape({ automaton, onNodeClick }) {
  const cyInstance = useRef(null);

  const cyComponent = useMemo(
    () => (
      <CytoscapeComponent
        className="h-full"
        elements={[
          ...automaton.states.flatMap((state) => {
            if (state === automaton.initial) {
              const ghostNodeId = `ghost-${state}`;
              return [
                // Add the initial node
                {
                  data: { id: state, label: state },
                  classes: "initial",
                },
                // Add a ghost node
                {
                  data: { id: ghostNodeId },
                  classes: "initial-ghost",
                },
                // Add a ghost edge from the ghost node to the initial node
                {
                  data: {
                    id: `edge-${ghostNodeId}-${state}`,
                    label: "Initial",
                    source: ghostNodeId,
                    target: state,
                  },
                  classes: "initial-ghost",
                },
              ];
            } else if (automaton.finals.includes(state)) {
              const ghostNodeId = `ghost-${state}`;
              return [
                {
                  data: { id: state, label: state },
                  classes: "final",
                },
                // Add a ghost node for final state
                {
                  data: { id: ghostNodeId },
                  classes: "final-ghost",
                },
              ];
            } else {
              return [
                {
                  data: { id: state, label: state },
                  classes: "",
                },
              ];
            }
          }),
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
          name: "preset", // Set initial layout to preset
        }}
        stylesheet={DarkTheme}
        cy={(cy) => {
          cyInstance.current = cy;
          cy.on("tap", "node", (event) => onNodeClick(event.target));

          const initialNode = cy.nodes(".initial");
          const initialGhostNode = cy.nodes(".initial-ghost");

          // Apply a grid layout to non-initial nodes
          const layout = cy
            .elements(":not(.initial):not(.initial-ghost)")
            .layout({
              name: "grid",
              fit: true,
              boundingBox: undefined,
              // padding: 30,
              avoidOverlap: true,
              avoidOverlapPadding: 10,
              nodeDimensionsIncludeLabels: false,
              condense: false,
              rows: undefined,
              cols: undefined,
              sort: undefined,
              animate: false,
              animationDuration: 500,
              ready: undefined,
              stop: undefined,
              transform: function (node, position) {
                return position;
              },
            });

          layout.run();

          layout.one("layoutstop", () => {
            // Find new position for initial node based on the new layout.
            const nonInitialNodes = cy.nodes(":not(.initial,.initial-ghost)");
            const minX = Math.min(
              ...nonInitialNodes.map((node) => node.position("x")).values()
            );
            const minY = Math.min(
              ...nonInitialNodes.map((node) => node.position("y")).values()
            );

            const initialNodePos = { x: minX - 50, y: minY + 50 }; // 50 is just an arbitrary distance

            // Move initial node and ghost node to new position.
            initialNode.position(initialNodePos);
            initialGhostNode.position({
              x: initialNodePos.x - 30,
              y: initialNodePos.y,
            }); // 30 is the distance from the ghost node to the initial node.
          });
        }}
        zoomingEnabled={false}
        userZoomingEnabled={false}
        panningEnabled={false}
        userPanningEnabled={false}
        autoungrabify={true}
      />
    ),
    [
      automaton.finals,
      automaton.initial,
      automaton.states,
      automaton.transitions,
      onNodeClick,
    ]
  );

  return { cyComponent, cyInstance };
}
