import React from 'react';

export const Coloniser = (props) => {
  return (
    <div className='flex flex-col self-center items-center h-fill'>
      <div
        ref={props.coloniserRef}
        className='flex flex-col items-center h-fill'
        style={{ marginTop: props.yOffset }}
      >
        <p className='text-center'>{props.label}</p>
        <div
          className={`transform rotate-180`}
          style={{
            backgroundImage: `url(${props.sprite})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 85,
            height: 50,
          }}
        />
      </div>
    </div>
  );
};
