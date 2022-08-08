import React from 'react';

export const ScreenFlash = (props) => {
  return (
    <div
      ref={props._ref}
      className={`bg-red-500 fixed top-0 left-0 w-full h-full opacity-0 pointer-events-none`}
    ></div>
  );
};
