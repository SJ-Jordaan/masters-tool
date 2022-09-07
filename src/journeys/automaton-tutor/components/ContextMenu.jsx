import React from "react";
import useAutomatonTutorStore, {
  Context,
} from "../state/useAutomatonTutorStore";
import { StateContext, TransitionContext, CanvasContext } from "./context-menu";
import { AiOutlineMenu } from "react-icons/ai";

const ContextMenu = () => {
  const { activeContexMenu } = useAutomatonTutorStore();
  return (
    <div className="fixed dark:text-white text-black flex items-center justify-center w-full p-2 gap-x-2">
      <div className="flex px-4 h-full py-2  rounded-md transition-all jusify-between bg-gray-300 dark:bg-gray-700 [&>*]:transition-all gap-x-8 [&>*]:tooltip-bottom [&>*]:tooltip">
        {activeContexMenu === Context.State && <StateContext />}
        {activeContexMenu === Context.Canvas && <CanvasContext />}
        {activeContexMenu === Context.Transition && <TransitionContext />}
      </div>
      <div className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded-md">
        <div className="dropdown dropdown-end ">
          <AiOutlineMenu
            tabIndex={0}
            className="text-black dark:text-white w-6 h-6 md:w-7 md:h-7  rounded-md cursor-pointer "
          />
          <ul
            tabIndex="0"
            className="p-2 mt-4  text-sm font-semibold shadow-xl bg-slate-200 dropdown-content menu rounded-box w-52 dark:bg-gray-800"
          >
            <li>
              <a href="/masters-tool">Save Automata</a>
            </li>
            <li>
              <a href="/masters-tool">Restart</a>
            </li>
            <li>
              <a href="/masters-tool">Exit Builder</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
