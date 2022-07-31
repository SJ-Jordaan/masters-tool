import React, { useState } from 'react';

export const SwipeScene = (props) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > props.minSwipeDistance;
    const isRightSwipe = distance < -props.minSwipeDistance;

    if (isLeftSwipe) {
      props.onLeftSwipe();
      return;
    }

    if (isRightSwipe) {
      props.onRightSwipe();
      return;
    }
  };

  return (
    <div
      ref={props._ref}
      className={props.css}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='pointer-events-none'>{props.children}</div>
    </div>
  );
};

SwipeScene.defaultProps = {
  minSwipeDistance: 50,
};
