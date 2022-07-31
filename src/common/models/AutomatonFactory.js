export class AutomatonFactory {
  constructor() {
    this.schematic = null;
  }

  // Static Factory Methods which are chained to generate the desired construct
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

  // Classes tied to the generated automaton to simplify processes
  generateAcceptedInputs = (length = 4, count = 1) => {
    // Treat this.automaton as a DFA and generate a random accepted input
    const acceptedInput = [];
    let currentNode = this.getStartingNode();
    const queue = [{ node: currentNode, path: [] }];

    while (queue.length > 0 && acceptedInput.length < count) {
      const { node, path } = queue.shift();

      if (node.isAccepting) {
        acceptedInput.push(path);
      }

      for (const symbol of Object.keys(node)) {
        if (
          symbol !== 'id' &&
          symbol !== 'isAccepting' &&
          symbol !== 'isStarting'
        ) {
          const nextNode = this.getNode(node[symbol]);
          const nextPath = [...path, symbol];

          if (!nextNode || nextPath.length > length) {
            continue;
          }

          queue.push({ node: nextNode, path: nextPath });
        }
      }
    }

    return acceptedInput;
  };

  generateRandomAcceptedInputs = (length = 4, count = 1) => {
    // Treat this.automaton as a DFA and generate a random accepted input
    const acceptedInput = this.generateAcceptedInputs(length, count + 100);
    // Generate count random indexes
    const randomIndexes = [];
    for (let i = 0; i < count; i++) {
      // Check if the index is already in the array
      const randomIndex = Math.floor(Math.random() * acceptedInput.length);
      if (randomIndexes.includes(randomIndex)) {
        i--;
        continue;
      }

      randomIndexes.push(randomIndex);
    }
    // Return the random accepted inputs
    return randomIndexes.map((i) => acceptedInput[i]);
  };

  isInputAccepted = (input) => {
    // Treat this.automaton as a DFA and check if the input is accepted
    let currentNode = this.getStartingNode();

    for (const symbol of input) {
      const nextNode = this.getNode(currentNode[symbol]);

      if (!nextNode) {
        return false;
      }

      currentNode = nextNode;
    }

    return currentNode.isAccepting;
  };

  /**
   *
   * @returns @object {id: number, isStarting: boolean, isAccepting: boolean}
   */
  getStartingNode = () => {
    const startingNode = this.schematic.find((n) => n.isStarting);
    return startingNode;
  };

  getNode = (id) => {
    const node = this.schematic.find((n) => n.id === id);
    return node;
  };

  /**
   *
   * @returns @array of accepting nodes
   */
  getAcceptingNodes = () => {
    // Treat this.automaton as a DFA and return the accepting nodes
    const dfa = this.automaton.parse();
    return dfa.nodes.filter((n) => n.isAccepting);
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
