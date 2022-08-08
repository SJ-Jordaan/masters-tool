import { useEffect, useState } from 'react';
import { useInterval } from './useInterval';

export const useCountdown = (initialCountdown, onEnd, onPause) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isPaused, toggleIsPaused] = useState(false);
  const [delay, setDelay] = useState(1000);

  useEffect(() => {
    if (countdown <= 0) {
      setDelay(null);
      onEnd?.();
    }
  }, [countdown, onEnd]);

  const pause = () => {
    toggleIsPaused(true);
    onPause?.();
  };

  const resume = () => {
    toggleIsPaused(false);
  };

  const reset = (newCountdown = initialCountdown) => {
    setCountdown(newCountdown);
    toggleIsPaused(false);
    setDelay(1000);
  };

  const halt = () => {
    setDelay(null);
    setCountdown(null);
  };

  const tick = () => {
    if (!isPaused) {
      setCountdown(countdown - 1);
    }
  };

  useInterval(tick, delay);

  return {
    countdown,
    isPaused,
    pause,
    resume,
    reset,
    halt,
  };
};
