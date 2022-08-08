import React from 'react';

import { formatAsPercent } from '../../../common/helpers';

export const StatScreen = (props) => {
  return (
    <div className='flex flex-col h-screen p-3.5 bg-gray-800'>
      <p className='text-4xl mt-12 mb-4 text-center'>{props.title}</p>
      <p className='text-xl text-center'>{props.subtitle}</p>
      <div className='flex flex-row justify-center my-auto'>
        <button
          className='btn bg-inherit border-none'
          onClick={props.onPrimaryClick}
        >
          {props.primaryIcon}
          {props.primaryText}
        </button>
        <button
          className='btn bg-inherit border-none'
          onClick={props.onSecondaryClick}
        >
          {props.secondaryIcon}
          {props.secondaryText}
        </button>
      </div>

      <div className='stats mt-auto shadow text-center my-4'>
        <div className='stat'>
          <div className='stat-title'>Points</div>
          <div className='stat-value'>{props.score}</div>
        </div>
      </div>
      <div className='stats shadow text-center my-4'>
        <div className='stat'>
          <div className='stat-title'>Hits</div>
          <div className='stat-value text-accent'>{props.hits}</div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Accuracy</div>
          <div className={`stat-value ${props.accuracy < 0.5 && 'text-error'}`}>
            {formatAsPercent(props.accuracy)}
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Misses</div>
          <div className='stat-value text-error'>{props.misses}</div>
        </div>
      </div>
    </div>
  );
};
