/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { RadialContextMenu } from '../../components/context-menus/RadialContextMenu';

export const AutomatonTutor = () => {
  const [contextMenuState, setContextMenuState] = useState({
    isOpen: false,
    x: 0,
    y: 0,
    items: [],
  });

  return (
    <div>
      <div>AutomatonTutor</div>
      <RadialContextMenu {...contextMenuState} />
    </div>
  );
};
