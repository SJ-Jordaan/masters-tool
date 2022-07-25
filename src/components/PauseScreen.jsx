import React from 'react';

export const PauseScreen = (props) => {
  return (
    <div className='flex flex-col h-screen'>
      <p className='text-xl text-center text-white'>{props.title}</p>
      <p className='text-xl text-center text-white'>{props.subtitle}</p>
      <div className='flex flex-row justify-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={props.onResume}
        >
          Resume
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'
          onClick={props.onReturn}
        >
          Home
        </button>
      </div>
    </div>
  );
};

PauseScreen.defaultProps = {
  title: 'Paused',
  subtitle: '',
};
