import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";

cytoscape.use(cxtmenu);

const DarkTheme = [
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
  // The initial state should have an arrow pointing to it
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

const SymbolSelector = ({ alphabet, onSelect, selectedSymbol }) => {
  const handleSelect = (symbol) => {
    if (symbol.count > 0) {
      onSelect(symbol.char);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      {alphabet.map((symbol, index) => (
        <button
          key={`alphabet-button-${index}`}
          className={`flex items-center m-1 border rounded-lg ${
            selectedSymbol === symbol.char
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleSelect(symbol)}
          disabled={symbol.count === 0}
        >
          <span className="p-1 px-4 border-r">{symbol.char}</span>
          <span className="p-1">{symbol.count}</span>
        </button>
      ))}
    </div>
  );
};
const AutomatonBuilder = ({
  automaton,
  handleInput,
  handleUndo,
  handleRedo,
  handleReset,
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [alphabet, setAlphabet] = useState(automaton.alphabet);
  const cyRef = useRef(null);

  const handleCountDecrement = (char) => {
    setAlphabet((prevAlphabet) =>
      prevAlphabet.map((symbol) =>
        symbol.char === char ? { ...symbol, count: symbol.count - 1 } : symbol
      )
    );
  };

  const generateAutomatonFromCy = (cy) => {
    const nodes = cy.nodes().map((node) => node.id());
    const edges = cy.edges().map((edge) => ({
      source: edge.source().id(),
      target: edge.target().id(),
      label: edge.data("label"),
    }));
    return { nodes, edges };
  };

  useEffect(() => {
    const newCy = cytoscape({
      container: document.getElementById("cy"),
      elements: {
        nodes: automaton.states.map((state) => ({
          data: { id: state },
          classes:
            state === automaton.initial
              ? "initial"
              : automaton.finals.includes(state)
              ? "final"
              : "",
        })),
      },
      style: DarkTheme,
      layout: {
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
      },
      zoomingEnabled: false,
      userZoomingEnabled: false,
      panningEnabled: false,
      userPanningEnabled: false,
      autoungrabify: true,
    });

    newCy.on("tap", "node", function (evt) {
      const nodeId = evt.target.id();
      const startNode = newCy.$(".startNode");
      const endNode = newCy.$(".endNode");

      if (startNode.nonempty()) {
        if (endNode.nonempty()) {
          // Both start and end nodes already set. Clear them.
          startNode.removeClass("startNode");
          endNode.removeClass("endNode");
        } else {
          // Only start node is set. Set the end node.
          evt.target.addClass("endNode");
          // Create the temporary edge.
          newCy.add({
            group: "edges",
            data: {
              id: `temp_${startNode.id()}_${nodeId}`,
              source: startNode.id(),
              target: nodeId,
              label: "Select a symbol",
            },
            classes: "temporary",
          });
        }
      } else {
        // Neither start nor end nodes are set. Set the start node.
        evt.target.addClass("startNode");
      }
    });

    cyRef.current = newCy;
  }, []);

  useEffect(() => {
    if (selectedSymbol && cyRef.current) {
      const cy = cyRef.current;
      const startNode = cy.$(".startNode");
      const endNode = cy.$(".endNode");

      if (startNode.nonempty() && endNode.nonempty()) {
        // Remove the temporary edge.
        cy.$(".temporary").remove();
        // Add the new edge.
        cy.add({
          group: "edges",
          data: {
            id: `${startNode.id()}_${endNode.id()}_${selectedSymbol}_${Date.now()}`,
            source: startNode.id(),
            target: endNode.id(),
            label: selectedSymbol,
          },
        });
        // Update answer and handle input here.
        handleCountDecrement(selectedSymbol);
        setSelectedSymbol(null);
        // Clear the start and end nodes.
        startNode.removeClass("startNode");
        endNode.removeClass("endNode");
        const newAutomatonState = generateAutomatonFromCy(cy);
        console.log(newAutomatonState);
        handleInput(newAutomatonState);
      }
    }
  }, [selectedSymbol, handleInput]);

  return (
    <div className="h-full">
      <div id="cy" className="h-3/4 w-full border-gray-500 border" />
      <div className={"min-h-16 border border-amber-400"}>
        {cyRef?.current &&
          (alphabet.filter((symbol) => symbol.count > 0).length === 0 ? (
            <p>Alphabet is empty.</p>
          ) : (
            <>
              {cyRef?.current?.$(".startNode").empty() ? (
                <p>Tap on the first node</p>
              ) : cyRef?.current?.$(".endNode").empty() ? (
                <p>Tap on the second node.</p>
              ) : (
                <>
                  <p>Select a symbol from the alphabet below.</p>
                  <SymbolSelector
                    alphabet={alphabet}
                    onSelect={setSelectedSymbol}
                    selectedSymbol={selectedSymbol}
                  />
                </>
              )}
            </>
          ))}
      </div>
      <div>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleReset}>Clear</button>
      </div>
    </div>
  );
};

export default AutomatonBuilder;
