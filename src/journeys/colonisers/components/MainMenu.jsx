import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../../common/constants/icons';
import { useStats } from '../contexts';

export const MainMenu = () => {
  const { statsDispatch, statsActions } = useStats();
  const navigate = useNavigate();

  return (
    <div className='card w-full h-full flex flex-col image-full'>
      <figure>
        <img
          src={ICONS.Colonisers.MenuBackground}
          className='object-cover'
          alt='Colonisers'
        />
      </figure>
      <div className='card-body'>
        <p></p>
        <p className='text-5xl font-bold text-white text-center'>Colonisers</p>
        <button
          className='btn btn-outline btn-success m-4'
          onClick={() => {
            statsDispatch(statsActions.initialise());
            statsDispatch(statsActions.setPhase('PLAYING'));
          }}
        >
          Start Game
        </button>
        <label htmlFor='infoModal' className='btn btn-outline btn-warning m-4'>
          How to play
        </label>
        <div
          className='btn btn-outline btn-error m-4'
          onClick={() => navigate('/library', { replace: true })}
        >
          Quit
        </div>

        {/* MODAL */}
        <input type={'checkbox'} id='infoModal' className='modal-toggle' />
        <div className='modal'>
          <div className='modal-box'>
            <h3>How to play</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              praesentium? Exercitationem hic quod quo atque error dolore? Quis
              illo repellat aliquam laborum? Deserunt officiis blanditiis
              laborum explicabo temporibus! Tenetur, voluptate.
            </p>
            <div className='modal-action'>
              <label htmlFor='infoModal' className='btn btn-outline'>
                Got it
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
