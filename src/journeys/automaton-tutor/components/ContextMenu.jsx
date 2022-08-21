import React from "react";
import useAutomatonTutorStore, { Context } from "../state/zustand";
import {
  StateContext,
  CanvasContext,
  TransitionContext,
} from "./context-menu/ContextItems";
import { AiOutlineMenu } from "react-icons/ai";

const ContextMenu = () => {
  const { activeContexMenu } = useAutomatonTutorStore();
  return (
    <div className="fixed flex items-center justify-center w-full pt-2 gap-x-2 h-fit">
      <div className="flex px-4 h-full py-2  text-black rounded-md dark:text-white jusify-between bg-gray-300 [&>*]:transition-all gap-x-8 [&>*]:tooltip-bottom [&>*]:tooltip">
        {activeContexMenu === Context.State && <StateContext />}
        {activeContexMenu === Context.Canvas && <CanvasContext />}
        {activeContexMenu === Context.Transition && <TransitionContext />}
      </div>
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <AiOutlineMenu
            tabIndex={0}
            className="w-10 h-full px-2 py-2 text-black bg-gray-300 rounded-md cursor-pointer "
          />
          <ul
            tabIndex="0"
            className="p-2 mt-4 text-sm font-semibold shadow-xl bg-slate-200 dropdown-content menu rounded-box w-52"
          >
            <li>
              <a>Save Automata</a>
            </li>
            <li>
              <a>Restart</a>
            </li>
            <li>
              <a href="/">Exit Builder</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
