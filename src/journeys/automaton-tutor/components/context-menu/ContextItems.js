import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { TbResize } from "react-icons/tb";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { CgRename } from "react-icons/cg";
import { FiCheckCircle } from "react-icons/fi";
import { BsArrowRight, BsArrowLeftRight } from "react-icons/bs";
import useAutomatonTutorStore from "../../state/zustand.js";
import uuid from "react-uuid";

export const CanvasContext = () => {
  const { addState, graphData } = useAutomatonTutorStore();
  const handleAddState = () => {
    const stateId = uuid();
    const newState = {
      id: stateId,
      name: `s${graphData.nodes.length + 1}`,
      val: 5,
    };
    addState(newState);
  };

  return (
    <>
      <button data-tip="Add State" onClick={handleAddState}>
        <AiOutlinePlus className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Toggle Background"
        onClick={() => console.log("Toggle Background Color Clicked")}
      >
        <HiOutlineColorSwatch className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Resize States"
        onClick={() => console.log("Resize states Clicked")}
      >
        <TbResize className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};

export const StateContext = () => {
  const { removeState, selectedEntity } = useAutomatonTutorStore();
  return (
    <>
      <button
        data-tip="Initial State"
        onClick={() => console.log("Toggle Initial State Clicked")}
      >
        <BsArrowRight className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Final State"
        onClick={() => console.log("Toggle Final State Clicked")}
      >
        <FiCheckCircle className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Add Transition"
        onClick={() => console.log("Add Transition Clicked")}
      >
        <BsArrowLeftRight className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Remane"
        onClick={() => console.log("Rename State Clicked")}
      >
        <CgRename className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Delete State"
        onClick={() => removeState(selectedEntity)}
      >
        <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};

export const TransitionContext = () => {
  const { removeTransition, selectedEntity } = useAutomatonTutorStore();
  return (
    <>
      <button
        data-tip="Delete Transition"
        onClick={() => removeTransition(selectedEntity)}
      >
        <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Rename Transition"
        onClick={() => console.log("Rename Transition Clicked")}
      >
        <CgRename className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};
