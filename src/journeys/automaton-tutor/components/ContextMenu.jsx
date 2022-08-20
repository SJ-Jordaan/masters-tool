import React from "react";
import useAutomatonTutorStore, { Context } from "../state/zustand";
import { StateContext, CanvasContext } from "./context-menu/ContextItems";

const ContextMenu = () => {
  const { activeContexMenu } = useAutomatonTutorStore();
  return (
    <div className="fixed flex justify-center w-full text-white">
      <div className="flex px-4 py-2 mt-2 text-black rounded-md jusify-between bg-black/20 gap-x-8">
        {activeContexMenu === Context.State && <StateContext />}
        {activeContexMenu === Context.Canvas && <CanvasContext />}
      </div>
    </div>
  );
};

export default ContextMenu;
