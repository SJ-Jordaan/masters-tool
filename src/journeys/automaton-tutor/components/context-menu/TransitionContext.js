import { AiOutlineDelete } from "react-icons/ai";
import { CgRename } from "react-icons/cg";
import useAutomatonTutorStore from "../../state/useAutomatonTutorStore.js";

export const TransitionContext = () => {
  const { removeTransition, selectedEntity } = useAutomatonTutorStore();
  const handleRemoveTransition = () => {
    removeTransition(selectedEntity.index);
  };
  return (
    <>
      <button data-tip="Delete Transition" onClick={handleRemoveTransition}>
        <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        data-tip="Transition Values"
        onClick={() => console.log("Rename Transition Clicked")}
      >
        <CgRename className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};
