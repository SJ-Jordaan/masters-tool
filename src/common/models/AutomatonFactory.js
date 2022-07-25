export class AutomatonFactory {
  automaton;

  static generateSchematic = (nodes, alphabet) => {
    return nodes.map((n) => {
      const state = {
        id: n,
        isAccepting: false,
        isStarting: false,
      };

      for (const a of alphabet) {
        state[a] = null;
      }

      return state;
    });
  };

  static generateDFA = (nodeCount = 1, alphabet = [], finalCount = 1) => {
    const af = new AutomatonFactory();
    let unusedNodes = [...Array(nodeCount)?.keys()];
    const schematic = AutomatonFactory.generateSchematic(unusedNodes, alphabet);
    schematic[0].isStarting = true;

    const startingNode = unusedNodes.shift();
    let currentNode = startingNode;

    while (unusedNodes.length > 0) {
      // Generate a random state and symbol
      const randomStateIndex = Math.floor(Math.random() * unusedNodes.length);
      const randomSymbolIndex = Math.floor(Math.random() * alphabet.length);
      const endState = unusedNodes.splice(randomStateIndex, 1)[0];
      const transitionSymbol = alphabet[randomSymbolIndex];
      // Retrieve the state and update its transition
      const currentStateIndex = schematic.findIndex(
        // eslint-disable-next-line no-loop-func
        (s) => s.id === currentNode,
      );
      schematic[currentStateIndex][transitionSymbol] = endState;

      // Update the current node
      currentNode = endState;
    }

    // Now every state has a path to it
    // Now randomly assign transitions to the remaining symbols for each state
    const allNodes = [...Array(nodeCount)?.keys()];

    for (let i = 0; i < schematic.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        const symbol = alphabet[j];

        if (schematic[i][symbol] === null) {
          const randomStateIndex = Math.floor(Math.random() * allNodes.length);
          schematic[i][symbol] = allNodes[randomStateIndex];
        }
      }
    }

    // Now all states are fully accounted for, define the final states
    for (let i = 0; i < finalCount; i++) {
      const randomStateIndex = Math.floor(Math.random() * allNodes.length);
      schematic[randomStateIndex].isAccepting = true;
    }

    af.schematic = schematic;
    return af;
  };

  parse = () => {
    const nodes = [];
    let transitions = [];
    const excludedKeys = ['id', 'isAccepting', 'isStarting'];

    for (let i = 0; i < this.schematic.length; i++) {
      const node = this.schematic[i];

      nodes.push({
        id: node.id,
        isStarting: node.isStarting,
        isAccepting: node.isAccepting,
      });

      for (const key in node) {
        if (
          Object.hasOwnProperty.call(node, key) &&
          !excludedKeys.includes(key)
        ) {
          const source = node.id;
          const target = node[key];

          let transExistsWithOtherSymbol = false;

          const updatedTransitions = transitions.flatMap((t) => {
            if (t.source === source && t.target === target) {
              transExistsWithOtherSymbol = true;

              return {
                ...t,
                symbols: [...t.symbols, key],
              };
            }

            return t;
          });

          if (transExistsWithOtherSymbol) {
            transitions = updatedTransitions;
            continue;
          }

          transitions.push({
            source,
            target,
            symbols: [key],
          });
        }
      }
    }

    return { nodes, transitions };
  };
}
