import React from 'react';
import { ICONS } from '../common/constants/icons';
import { DefeatScreen } from '../components/DefeatScreen';
import { PauseScreen } from '../components/PauseScreen';

export const GameScene = (props) => {
  return (
    <div className='flex flex-col h-screen box-border'>
      {props.gameOver ? (
        <DefeatScreen />
      ) : props.isPaused ? (
        <PauseScreen onResume={props.onResume} />
      ) : (
        <>
          <div className='flex flex-row p-4'>
            <div className='flex flex-col'>
              <p className='text-xl text-white'>Score:</p>
              <p className='text-xl text-white'>{props.score}</p>
            </div>

            <div
              className='flex flex-col ml-auto justify-center'
              onClick={props.pause}
            >
              <img src={ICONS.Pause} alt='Pause' />
              <p className='text-xl text-white text-center'>
                {props.countdown}
              </p>
            </div>

            <div className='flex flex-col ml-auto'>
              <p className='text-xl text-white'>Next:</p>
              <p className='text-xl text-white'>{props.next}</p>
            </div>
          </div>
          {props.children}
        </>
      )}
    </div>
  );
};
