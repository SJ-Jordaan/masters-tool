import { HiOutlineFastForward } from "react-icons/hi";
import { BsPlay, BsStop, BsPause } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import useSimulationStore from "../../state/useSimulation";
import useAutomatonTutorStore, {
  Context,
} from "../../state/useAutomatonTutorStore";
import React, { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { iconStyleClasses } from "../ContextMenu";

export const SimulationToolbar = () => {
  const {
    setIsSimulating,
    currentInput,
    setCurrentState,
    setCurrentCharIndex,
    reset,
    setIsAccepting,
    currentState,
    isPlaying,
    toggleIsPlaying,
    updateBacktrackingStack,
    backtrackingStack,
  } = useSimulationStore();
  const [localCurrentInput, setLocalCurrentInput] = useState();
  const { initialStateId, graphData, finalStateIds, setActiveContexMenu } =
    useAutomatonTutorStore();

  const handleStartSimulation = () => {
    if (!isPlaying) toggleIsPlaying();
  };

  const handlePauseSimulation = () => {
    if (isPlaying) toggleIsPlaying();
  };

  const handleStopSimulation = () => {
    reset();
    setLocalCurrentInput(currentInput);
    setCurrentState(initialStateId);
    setCurrentCharIndex(0);
  };

  const getLinks = (nodeId, currentChar) => {
    const links = graphData.links.filter(
      (link) => link.source.id === nodeId && link.values.includes(currentChar)
    );
    return links;
  };

  const getNextStates = (links) => {
    const states = links.map((link) => {
      if (link.source.id === currentState) return link.target.id;
      return null;
    });
    return states;
  };

  const setIsAcceptingFunc = () => {
    setIsAccepting(
      localCurrentInput.length === 0 && finalStateIds.includes(currentState)
    );
  };

  const handleNext = () => {
    const [currentChar, ...restOfInput] = localCurrentInput.split("");
    if (!currentChar) {
      setIsAcceptingFunc();
      return;
    }
    const index = currentInput.length - (restOfInput.length + 1);
    setCurrentCharIndex(index);
    const links = getLinks(currentState, currentChar);
    const states = getNextStates(links);
    if (states.length < 1) {
      setIsAcceptingFunc();
      return;
    }

    if (index !== currentInput.length) {
      updateBacktrackingStack(
        [...backtrackingStack.currentCharIndex, index],
        [...backtrackingStack.currentState, currentState]
      );
    }

    setLocalCurrentInput(restOfInput.join(""));
    setCurrentState(states[0]);
  };

  useInterval(handleNext, isPlaying ? 1000 : null);

  useEffect(() => {
    setLocalCurrentInput(currentInput);
    setCurrentState(initialStateId);
    setCurrentCharIndex(0);
  }, [currentInput, initialStateId, setCurrentCharIndex, setCurrentState]);

  const actions = [
    {
      text: isPlaying ? "Pause" : "Play",
      icon: isPlaying ? <BsPause /> : <BsPlay />,
      action: () => {
        if (isPlaying) handlePauseSimulation();
        else handleStartSimulation();
      },
    },
    {
      text: "Next Step",
      icon: <HiOutlineFastForward />,
      action: () => {
        handleNext();
      },
    },
    {
      text: "Previous Step",
      icon: <HiOutlineFastForward className="rotate-180" />,
      action: () => {
        const state = backtrackingStack.currentState.pop();
        const currentIndex = backtrackingStack.currentCharIndex.pop();

        if (state === undefined || currentIndex === undefined) return;

        const cInput = currentInput.slice(currentIndex);
        setLocalCurrentInput(cInput);
        setCurrentState(state);
        setCurrentCharIndex(currentIndex);

        updateBacktrackingStack(
          [...backtrackingStack.currentCharIndex],
          [...backtrackingStack.currentState]
        );
      },
    },
    {
      text: "Stop Simulation",
      icon: <BsStop />,
      action: () => {
        handleStopSimulation();
      },
    },
    {
      text: "Close Simulation",
      icon: <RiCloseLine />,
      action: () => {
        setIsSimulating(false);
        setActiveContexMenu(Context.Canvas);
      },
    },
  ];

  return (
    <>
      {actions.map(({ icon, text, action }, idx) => {
        return (
          <button key={idx} onClick={action} data-tip={text}>
            <span className={iconStyleClasses}>{icon}</span>
          </button>
        );
      })}
    </>
  );
};
