import React from 'react';
import { RadialContextMenuItem } from './RadialContextMenuItem';

export const RadialContextMenu = (props) => {
  return (
    <div>
      <div>RadialContextMenu</div>
      {props.items.map((item, index) => (
        <RadialContextMenuItem
          key={index}
          onClick={item.onClick}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </div>
  );
};
