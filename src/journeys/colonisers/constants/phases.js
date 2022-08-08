import { LogoutIcon, PlayIcon, RefreshIcon } from '@heroicons/react/outline';

export const Phases = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER',
  VICTORY: 'VICTORY',
  PAUSED: 'PAUSED',
};

export const PhaseConfig = {
  [Phases.GAME_OVER]: {
    title: 'Game Over',
    subtitle: 'Humanity has failed.',
    primaryIcon: <RefreshIcon className='h-full w-full' />,
    primaryText: 'Restart',
    secondaryIcon: <LogoutIcon className='h-full w-full' />,
    secondaryText: 'Quit',
  },
  [Phases.VICTORY]: {
    title: 'Victory',
    subtitle: 'Humanity has prevailed.',
    primaryIcon: <RefreshIcon className='h-full w-full' />,
    primaryText: 'Restart',
    secondaryIcon: <LogoutIcon className='h-full w-full' />,
    secondaryText: 'Quit',
  },
  [Phases.PAUSED]: {
    title: 'Paused',
    subtitle: 'The colony awaits your command.',
    primaryIcon: <PlayIcon className='h-full w-full' />,
    primaryText: 'Resume',
    secondaryIcon: <LogoutIcon className='h-full w-full' />,
    secondaryText: 'Quit',
  },
};
