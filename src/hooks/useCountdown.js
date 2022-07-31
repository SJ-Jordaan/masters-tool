import { useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { useToggle } from './useToggle';

export const useCountdown = (initialCountdown, onEnd, onPause) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isPaused, toggleIsPaused] = useToggle(false);
  const [delay, setDelay] = useState(1000);

  useEffect(() => {
    if (countdown <= 0) {
      setDelay(null);
      onEnd?.();
    }
  }, [countdown, onEnd]);

  const pause = () => {
    toggleIsPaused();
    onPause?.();
  };

  const resume = () => {
    toggleIsPaused();
  };

  const reset = (newCountdown = initialCountdown) => {
    setCountdown(newCountdown);
    setDelay(1000);
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
  };
};
