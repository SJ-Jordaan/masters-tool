import React from 'react';
import { DefeatScreen } from '../components/DefeatScreen';
import { useToggle } from '../hooks/useToggle';
import { PauseScreen } from '../components/PauseScreen';
export const GameScene = (props) => {
  const [pause, togglePause] = useToggle();

  return (
    <div className='flex flex-col h-screen box-border'>
      {props.defeat ? (
        <DefeatScreen />
      ) : pause ? (
        <PauseScreen onResume={togglePause} />
      ) : (
        <>
          <div className='flex flex-row p-4'>
            <div className='flex flex-col'>
              <p className='text-xl text-white'>Score:</p>
              <p className='text-xl text-white'>{props.score}</p>
            </div>

            <div className='flex flex-col ml-auto' onClick={togglePause}></div>

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
