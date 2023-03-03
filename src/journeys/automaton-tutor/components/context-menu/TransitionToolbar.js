import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import useAutomatonTutorStore, {
  Modal,
  Context,
} from "../../state/useAutomatonTutorStore.js";
import { iconStyleClasses } from "../ContextMenu.jsx";

export const TransitionToolbar = () => {
  const {
    removeTransition,
    selectedEntity,
    setActiveModal,
    setSelectedEntity,
    setTargetState,
    setActiveContexMenu,
  } = useAutomatonTutorStore();

  const actions = [
    {
      text: "Edit Transition",
      icon: <MdOutlineEditNote />,
      action: () => {
        setTargetState(selectedEntity?.target);
        setSelectedEntity(selectedEntity?.source);
        setActiveModal(Modal?.EditTransition);
      },
    },
    {
      text: "Delete Transition",
      icon: <AiOutlineDelete />,
      action: () => {
        removeTransition(selectedEntity.index);
        setActiveContexMenu(Context.Canvas);
      },
    },
  ];

  return (
    <>
      {actions.map(({ text, icon, action }, index) => {
        return (
          <button data-tip={text} key={index} onClick={action}>
            <span className={iconStyleClasses}>{icon}</span>
          </button>
        );
      })}
    </>
  );
};
