import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import { BsLink, BsArrowRight } from "react-icons/bs";
import { CgRename } from "react-icons/cg";
import useAutomatonTutorStore, {
  Context,
  Modal,
} from "../../state/useAutomatonTutorStore.js";

const TransitionContextMenuItem = () => {
  const { toggleMakeTransition, makeTransition } = useAutomatonTutorStore();
  const handleClick = () => toggleMakeTransition();
  return (
    <button
      data-tip={makeTransition ? "Select target state" : "Add Transition"}
      onClick={handleClick}
      className={`tooltip ${makeTransition && "tooltip-open"}`}
    >
      <BsLink className="w-5 h-5 dark:text-white/50 text-black/50" />
    </button>
  );
};

export const StateToolbar = () => {
  const {
    removeState,
    selectedEntity,
    graphData,
    removeTransition,
    initialStateId,
    finalStateIds,
    setInitialState,
    addFinalState,
    setActiveModal,
    setActiveContexMenu,
  } = useAutomatonTutorStore();

  const actions = [
    {
      text: "Set as Initial State",
      icon: (
        <BsArrowRight
          className={`${
            selectedEntity.id === initialStateId && "text-primary"
          }`}
        />
      ),
      action: () => {
        setInitialState(selectedEntity.id);
      },
    },
    {
      text: "Final State",
      icon: (
        <AiOutlineCheckCircle
          className={` ${
            finalStateIds.includes(selectedEntity.id) && "text-primary"
          }`}
        />
      ),
      action: () => {
        addFinalState(selectedEntity.id);
      },
    },
    {
      text: " Rename State",
      icon: <CgRename />,
      action: () => {
        setActiveModal(Modal?.EditState);
      },
    },
    {
      text: "Delete State",
      icon: <AiOutlineDelete />,
      action: () => {
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
        setActiveContexMenu(Context.Canvas);
      },
    },
  ];

  return (
    <>
      <TransitionContextMenuItem />
      {actions.map(({ text, icon, action }, index) => {
        return (
          <button data-tip={text} key={index} onClick={action}>
            <span className="[&>*]:w-5 [&>*]:h-5 dark:text-white/70 text-black/50">
              {icon}
            </span>
          </button>
        );
      })}
    </>
  );
};
