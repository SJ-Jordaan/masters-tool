import React from 'react';
import { StatsProvider } from './contexts';
import { Game } from './components';

export const Colonisers = () => {
  return (
    <StatsProvider>
      <Game />
    </StatsProvider>
  );
};
