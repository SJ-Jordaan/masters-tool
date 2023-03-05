import React, { forwardRef } from "react";
import useAutomatonTutorStore, {
  Context,
  Modal,
} from "../state/useAutomatonTutorStore";
import {
  StateContext,
  TransitionContext,
  CanvasContext,
  SimulationContext,
} from "./context-menu";
import { AiOutlineMenu } from "react-icons/ai";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const iconStyleClasses =
  "[&>*]:w-5 [&>*]:h-5 dark:text-white/80 text-black/80";

const ContextMenu = forwardRef((props, ref) => {
  const { activeContexMenu, setActiveModal, setSelectedEntity, setActiveContexMenu } = useAutomatonTutorStore();
  const [parent] = useAutoAnimate();
  return (
    <div className="fixed flex items-center justify-center w-full p-2 text-black dark:text-white gap-x-2">
      <div className="flex justify-between h-full px-4 py-2 transition-all bg-gray-300 divide-x rounded-md divide-black/40 dark:divide-white/40 gap-x-4 dark:bg-gray-700">
        <div
          ref={parent}
          className="flex items-center [&>*]:transition-all gap-x-6 [&>*]:tooltip-bottom [&>*]:tooltip"
        >
          {activeContexMenu === Context.State && <StateContext />}
          {activeContexMenu === Context.Canvas && <CanvasContext ref={ref} />}
          {activeContexMenu === Context.Transition && <TransitionContext />}
          {activeContexMenu === Context.Simulation && <SimulationContext />}
        </div>

        <div className="pl-4 dropdown dropdown-end">
          <AiOutlineMenu
            tabIndex={0}
            className="w-5 h-5 cursor-pointer dark:text-white/80 text-black/80"
          />
          <ul
            tabIndex="0"
            className="p-2 mt-4 -mr-5 text-xs font-semibold shadow-xl bg-slate-200 dropdown-content menu rounded-box w-52 dark:bg-gray-800"
          >
            <li>
              <a href="/masters-tool">Save Automata</a>
            </li>
            <li>
              <button onClick={() => {
                setActiveModal(Modal.TestInput);
                setSelectedEntity(null);
                setActiveContexMenu(Context.Canvas)
              }}>
                Test Input
              </button>
            </li>
            <li>
              <button onClick={() => setActiveModal(Modal.SelectAlphabet)}>
                Select Alphabet
              </button>
            </li>
            <li>
              <a href="/">Restart</a>
            </li>
            <li>
              <a href="/">Exit Builder</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ContextMenu;
