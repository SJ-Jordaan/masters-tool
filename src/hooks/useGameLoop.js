/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useInterval } from './useInterval';

export const useGameLoop = (onInit, onGameStep, delay) => {
  useEffect(() => {
    if (delay === null) {
      return;
    }

    onInit();
  }, [delay]);

  useInterval(() => {
    onGameStep();
  }, delay);
};
