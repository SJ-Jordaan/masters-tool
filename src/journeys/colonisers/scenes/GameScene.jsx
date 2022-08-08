/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ICONS } from '../../../common/constants/icons';
import { StatScreen, MainMenu } from '../components';
import { useCountdown } from '../../../hooks/useCountdown';
import { PhaseConfig, Phases } from '../constants/phases';
import { useStats } from '../contexts';
import { useGameLoop } from '../../../hooks';

export const GameScene = (props) => {
  const { stats, statsDispatch, statsActions } = useStats();
  const { countdown, pause, resume, reset, halt } = useCountdown(
    stats.countdownRate,
    () => {
      if (stats.phase !== Phases.PLAYING) {
        return;
      }

      props.onRoundEnd();
      reset();
    },
  );
  const [showLevel, setShowLevel] = useState(false);

  useGameLoop(props.onInit, props.onGameStep, stats.intervalRate);

  useEffect(() => {
    if (stats.phase !== Phases.PLAYING) {
      return;
    }

    setShowLevel(true);
    // pause();

    setTimeout(() => {
      // resume();
      setShowLevel(false);
    }, 2000);
  }, [stats.level]);

  const handlePause = () => {
    pause();
    statsDispatch(statsActions.setPhase(Phases.PAUSED));
  };

  const handleResume = () => {
    resume();
    statsDispatch(statsActions.setPhase(Phases.PLAYING));
  };

  const handleQuit = () => {
    halt();
    props.onHalt();
    statsDispatch(statsActions.resetStats());
  };

  const handleRestart = () => {
    reset();
    statsDispatch(statsActions.initialise());
    statsDispatch(statsActions.setPhase(Phases.PLAYING));
    props.onInit();
  };

  const RENDER = {
    [Phases.MENU]: <MainMenu />,
    [Phases.PAUSED]: (
      <StatScreen
        onPrimaryClick={handleResume}
        onSecondaryClick={handleQuit}
        {...stats}
        {...PhaseConfig[Phases.PAUSED]}
      />
    ),
    [Phases.GAME_OVER]: (
      <StatScreen
        onPrimaryClick={handleRestart}
        onSecondaryClick={handleQuit}
        {...stats}
        {...PhaseConfig[Phases.GAME_OVER]}
      />
    ),
    [Phases.VICTORY]: (
      <StatScreen
        onPrimaryClick={handleRestart}
        onSecondaryClick={handleQuit}
        {...stats}
        {...PhaseConfig[Phases.VICTORY]}
      />
    ),
    [Phases.PLAYING]: (
      <div
        style={{
          backgroundImage: `url(${ICONS.Colonisers.GameBackground})`,
          backgroundSize: 'cover',
        }}
        className='flex flex-col h-full w-full'
      >
        {showLevel && (
          <div className='flex flex-col justify-center items-center pb-60 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <p className='text-4xl text-white text-bold'>Level {stats.level}</p>
            {stats.level > 1 && (
              <div className='flex flex-col'>
                <p className='text-2xl text-white'>
                  Time {stats.countdownRate + 1} → {stats.countdownRate}
                </p>
                <div className='flex justify-center items-center'>
                  <p className='text-2xl text-center text-white'>+</p>
                  <div className='rating gap-1'>
                    <input
                      type='radio'
                      name='rating-3'
                      className='mask mask-heart bg-red-400'
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className='flex flex-row p-4'>
          <div className='rating gap-1'>
            {Array(stats.lives)
              .fill(0)
              .map((_, i) => (
                <input
                  key={`heart-${i}`}
                  type='radio'
                  name='rating-3'
                  className='mask mask-heart bg-red-400'
                />
              ))}
          </div>

          <div
            className='flex flex-col mx-auto justify-center'
            onClick={handlePause}
          >
            <img src={ICONS.Pause} alt='Pause' />
            <span className='countdown text-xl text-white text-center'>
              <span style={{ '--value': countdown }}></span>
            </span>
          </div>

          <div className='flex flex-col text-center'>
            <p className='text-xl text-white'>Next:</p>
            <p className='text-2xl font-bold'>{props.next}</p>
          </div>
        </div>
        {props.children}
      </div>
    ),
  };

  return (
    <div className='flex flex-col h-screen box-border'>
      {RENDER[stats.phase]}
    </div>
  );
};
