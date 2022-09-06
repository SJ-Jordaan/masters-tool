import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowLeftRight, BsArrowRight } from "react-icons/bs";
import { CgRename } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import useAutomatonTutorStore from "../../state/useAutomatonTutorStore.js";
import { useState } from "react";

const TransitionContextMenuItem = () => {
  const { toggleMakeTransition } = useAutomatonTutorStore();
  const [itemState, setItemState] = useState("Add Transition");
  const handleMouseLeave = () => setItemState("Add Transition");
  const handleClick = () => {
    setItemState("Select target state");
    toggleMakeTransition();
  };

  return (
    <button
      data-tip={itemState}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <BsArrowLeftRight className="w-6 h-6 md:w-7 md:h-7" />
    </button>
  );
};

export const StateContext = () => {
  const {
    removeState,
    selectedEntity,
    graphData,
    removeTransition,
    initialStateId,
    finalStateIds,
    setInitialState,
    addFinalState,
  } = useAutomatonTutorStore();
  const handleRemoveState = () => {
    removeState(selectedEntity.id);
    if (selectedEntity.id === initialStateId) setInitialState(null);
    if (finalStateIds.includes(selectedEntity.id))
      addFinalState(selectedEntity.id);
    graphData.links.forEach((link) => {
      if (
        link.source.id === selectedEntity.id ||
        link.target.id === selectedEntity.id
      ) {
        removeTransition(link.index);
      }
    });
  };
  const handleSetIsInitial = () => setInitialState(selectedEntity.id);
  const handleAddToFinalStates = () => addFinalState(selectedEntity.id);

  return (
    <>
      <button data-tip="Initial State" onClick={handleSetIsInitial}>
        <BsArrowRight
          className={`w-6 h-6 md:w-7 md:h-7 ${
            selectedEntity.id === initialStateId && "text-primary"
          }`}
        />
      </button>
      <button data-tip="Final State" onClick={handleAddToFinalStates}>
        <FiCheckCircle
          className={`w-6 h-6 md:w-7 md:h-7 ${
            finalStateIds.includes(selectedEntity.id) && "text-primary"
          }`}
        />
      </button>
      <TransitionContextMenuItem />
      <button
        data-tip="Rename"
        onClick={() => console.log("Rename State Clicked")}
      >
        <CgRename className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button data-tip="Delete State" onClick={handleRemoveState}>
        <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};
