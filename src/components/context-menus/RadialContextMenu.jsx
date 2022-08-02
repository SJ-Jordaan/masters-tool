import React from "react";
import { CircleMenu, CircleMenuItem } from "react-circular-menu";

const menuItemStyle = {
  border: "1px solid",
  fontSize: "12px",
};

export const RadialContextMenu = ({ x, y, toggleButton, items }) => {
  const contextMenuStyle = {
    position: "absolute",
    left: x,
    top: y,
    right: x,
    bottom: y,
  };

  return (
    <div style={contextMenuStyle}>
      <CircleMenu
        menuToggleElement={toggleButton}
        startAngle={180}
        rotationAngle={180}
        rotationAngleInclusive
        itemSize={2}
        radius={items.length <= 3 ? 3 : 5}
        className={` absolute w-fit  bg-sky-500`}
      >
        {items.map(({ label, icon, action }, idx) => {
          return (
            <CircleMenuItem
              key={label + idx}
              style={menuItemStyle}
              onClick={action}
            >
              <span className="[&>*]:w-5 [&>*]:h-5">{icon}</span>
            </CircleMenuItem>
          );
        })}
      </CircleMenu>
    </div>
  );
};
