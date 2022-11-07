import useAutomatonTutorStore from "../../state/useAutomatonTutorStore.js";
import uuid from "react-uuid";
import { AiOutlinePlus, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { MdOutlineCenterFocusWeak } from "react-icons/md";
import useGraphStore from "../../state/useGraphSettings.js";
import { iconStyleClasses } from "../ContextMenu.jsx";

export const CanvasContext = () => {
  const { isLocked, setIsLocked } = useGraphStore();
  const actions = [
    {
      text: "Add State",
      icon: <AiOutlinePlus />,
      action: () => {
        const stateId = uuid();
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
      text: "Fit Canvas",
      icon: <MdOutlineCenterFocusWeak />,
      action: () => {
        console.log("Fit to canvas clicked");
      },
    },
  ];

  const { addState, graphData } = useAutomatonTutorStore();

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
