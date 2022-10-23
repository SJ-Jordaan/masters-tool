import { AiOutlineDelete } from "react-icons/ai";
import { CgRename } from "react-icons/cg";
import useAutomatonTutorStore, {
  Modal,
} from "../../state/useAutomatonTutorStore.js";
export const TransitionContext = () => {
  const {
    removeTransition,
    selectedEntity,
    setActiveModal,
    setSelectedEntity,
    setTargetState,
  } = useAutomatonTutorStore();
  const handleRemoveTransition = () => {
    removeTransition(selectedEntity.index);
  };

  const handleEditTransition = () => {
    setTargetState(selectedEntity?.target);
    setSelectedEntity(selectedEntity?.source);
    setActiveModal(Modal?.EditTransition);
  };

  return (
    <>
      <button data-tip="Transition Values" onClick={handleEditTransition}>
        <CgRename className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button data-tip="Delete Transition" onClick={handleRemoveTransition}>
        <AiOutlineDelete className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </>
  );
};
