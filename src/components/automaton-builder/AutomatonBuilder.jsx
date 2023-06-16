import React, { useCallback, useEffect, useState } from "react";
import { SymbolSelector } from "./util/SymbolSelector";
import useCytoscape from "./util/useCytoscape";

const AutomatonBuilder = ({
  automaton,
  handleInput,
  handleUndo,
  handleRedo,
  handleReset,
}) => {
  const [alphabet, setAlphabet] = useState(automaton.alphabet);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  const updateAlphabetCount = useCallback(
    (char) => {
      setAlphabet((prevAlphabet) =>
        prevAlphabet.map((symbol) =>
          symbol.char === char ? { ...symbol, count: symbol.count - 1 } : symbol
        )
      );
    },
    [setAlphabet]
  );
  const onNodeClick = (node) => {
    console.log(node.id());
    if (startNode === null) {
      console.log("startNode", startNode);
      setStartNode(node);

      return;
    }

    console.log("endNode", endNode);

    setEndNode(node);
  };

  const { cyComponent, cyInstance } = useCytoscape({
    automaton,
    onNodeClick,
  });

  const addEdge = useCallback(
    (id, source, target, label) => {
      cyInstance.current.add({
        group: "edges",
        data: { id, source, target, label },
      });
    },
    [cyInstance]
  );

  useEffect(() => {
    if (startNode && endNode && selectedSymbol) {
      const edgeId = `${startNode.id()}-${endNode.id()}-${selectedSymbol}-${Date.now()}`;
      const newAutomaton = {
        ...automaton,
        transitions: [
          ...automaton.transitions,
          {
            id: edgeId,
            from: startNode.id(),
            to: endNode.id(),
            label: selectedSymbol,
          },
        ],
      };
      addEdge(edgeId, startNode.id(), endNode.id(), selectedSymbol);
      handleInput(newAutomaton);
      updateAlphabetCount(selectedSymbol);
      setSelectedSymbol(null);
      setEndNode(null);
      setStartNode(null);
    }
  }, [
    startNode,
    endNode,
    selectedSymbol,
    addEdge,
    handleInput,
    automaton,
    updateAlphabetCount,
  ]);

  const shouldSelectFirst = startNode === null;
  const shouldSelectSecond = startNode && endNode === null;
  const shouldSelectSymbol = !(shouldSelectFirst || shouldSelectSecond);

  return (
    <div className="h-full">
      <div className="h-3/4 w-full border-gray-500 border">{cyComponent}</div>
      <div className={"min-h-16 border border-amber-400"}>
        {alphabet.some((symbol) => symbol.count > 0) ? (
          <>
            {(shouldSelectFirst && <p>Tap on the first node</p>) ||
              (shouldSelectSecond && <p>Tap on the second node.</p>) ||
              (shouldSelectSymbol && (
                <>
                  <p>Select a symbol from the alphabet below.</p>
                  <SymbolSelector
                    alphabet={alphabet}
                    onSelect={setSelectedSymbol}
                    selectedSymbol={selectedSymbol}
                  />
                </>
              ))}
          </>
        ) : (
          <p>Alphabet is empty.</p>
        )}
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
