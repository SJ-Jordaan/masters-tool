import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowLeftRight, BsArrowRight } from "react-icons/bs";
import { CgRename } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import useAutomatonTutorStore from "../../state/useAutomatonTutorStore.js";

const TransitionContextMenuItem = () => {
  const { toggleMakeTransition, makeTransition } = useAutomatonTutorStore();
  const handleClick = () => toggleMakeTransition();
  return (
    <button
      data-tip={makeTransition ? "Select target state" : "Add Transition"}
      onClick={handleClick}
      className={`tooltip ${makeTransition && "tooltip-open"}`}
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
        // onClick={() => setActiveModal(Modal?.EditState)}
      >
        <CgRename className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button data-tip="Delete State" onClick={handleRemoveState}>
        <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};
