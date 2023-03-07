import useAutomatonTutorStore from "../../state/useAutomatonTutorStore.js";
import uuid from "react-uuid";
import { AiOutlinePlus, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { MdOutlineCenterFocusWeak } from "react-icons/md";
import useGraphStore from "../../state/useGraphSettings.js";
import { iconStyleClasses } from "../ContextMenu.jsx";
import { forwardRef } from "react";

export const CanvasContext = forwardRef((props, ref) => {
  const { isLocked, setIsLocked } = useGraphStore();
  const { addState, graphData, initialStateId, setInitialState } = useAutomatonTutorStore();

  const actions = [
    {
      text: "Add State",
      icon: <AiOutlinePlus />,
      action: () => {
        const stateId = uuid();

        if (!initialStateId) {
          setInitialState(stateId);
        }

        const newState = {
          id: stateId,
          name: `q${graphData.nodes.length + 1}`,
          val: 5,
        };
        addState(newState);
      },
    },
    {
      text: isLocked ? "Unlock" : "Lock",
      icon: isLocked ? <AiOutlineLock /> : <AiOutlineUnlock />,
      action: () => {
        if (isLocked) {
          setIsLocked(false);
          return;
        }
        setIsLocked(true);
      },
    },
    {
      text: "Scroll To Content",
      icon: <MdOutlineCenterFocusWeak />,
      action: () => {
        ref.current.zoomToFit(300, 60);
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
});
