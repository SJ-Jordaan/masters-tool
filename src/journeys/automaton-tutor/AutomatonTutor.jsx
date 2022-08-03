import React, { useState, useRef } from "react";
import { RadialContextMenu } from "../../components/context-menus/RadialContextMenu";
import { AiOutlinePlus, AiOutlineBgColors } from "react-icons/ai";
import { IoResize } from "react-icons/io5";
import useMouse from "@react-hook/mouse-position";
import { useLongPress } from "use-long-press";

const menuItems = [
  {
    label: "Add State",
    icon: <AiOutlinePlus />,
    action: () => console.log("Add State"),
  },
  {
    label: "Change Background",
    icon: <AiOutlineBgColors />,
    action: () => console.log("Change Background"),
  },
  {
    label: "Resize States",
    icon: <IoResize />,
    action: () => console.log("Resize State"),
  },
];

export const AutomatonTutor = () => {
  const containerRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const mouse = useMouse(containerRef);

  const [contextMenuState, setContextMenuState] = useState({
    x: 0,
    y: 0,
  });

  const bind = useLongPress(() => {
    toggleButtonRef.current.click();
    setContextMenuState({
      x: mouse.x - 25,
      y: mouse.y,
    });
  });
  return (
    <div
      {...bind()}
      ref={containerRef}
      className="relative w-full h-screen bg-slate-300 "
    >
      <RadialContextMenu
        position={contextMenuState}
        toggleButton={<button hidden ref={toggleButtonRef}></button>}
        mouse={mouse}
        items={menuItems}
        {...contextMenuState}
      />
    </div>
  );
};
