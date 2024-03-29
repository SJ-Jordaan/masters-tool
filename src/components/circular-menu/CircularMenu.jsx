import React, { useState, cloneElement } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const CircularMenu = ({ items }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleItemClick = (originalOnClick) => {
    return (...args) => {
      args[0].preventDefault();

      if (originalOnClick) {
        originalOnClick(...args);
      }
      toggleMenu();
    };
  };

  return (
    <div
      id="circularMenu"
      className={`circular-menu circular-menu-left ${isActive ? "active" : ""}`}
    >
      <button className="floating-btn" onClick={toggleMenu}>
        <AiOutlineMenu className="w-6 h-6 text-white" />
      </button>
      <menu className="items-wrapper">
        {items.map((item) =>
          cloneElement(item, {
            onMouseUp: handleItemClick(item.props.onClick),
            onTouchEnd: handleItemClick(item.props.onClick),
            onClick: undefined,
          })
        )}
      </menu>
    </div>
  );
};

export default CircularMenu;
