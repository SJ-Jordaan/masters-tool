import useAutomatonTutorStore from "../../state/useAutomatonTutorStore.js";
import uuid from "react-uuid";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { TbResize } from "react-icons/tb";

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
