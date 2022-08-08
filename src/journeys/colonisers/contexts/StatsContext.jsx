import { createContext, useContext, useReducer } from 'react';
import { Phases } from '../constants/phases';

const StatsContext = createContext();

const defaultStats = {
  phase: Phases.MENU,
  score: 0,
  lives: 0,
  accuracy: 0,
  hits: 0,
  misses: 0,
  level: 0,
  maxLevel: 0,
  speed: null,
  countdownRate: null,
  intervalRate: null,
};

const statsActions = {
  addHits: (hits = 1, score = 100) => {
    return {
      type: 'ADD_HITS',
      hits,
      score,
    };
  },
  addMisses: (misses = 1) => {
    return {
      type: 'ADD_MISSES',
      misses,
    };
  },
  levelUp: (speedPenalty = 1) => {
    return {
      type: 'LEVEL_UP',
      speedPenalty,
    };
  },
  setSpeed: (speed) => {
    return {
      type: 'SET_SPEED',
      speed,
    };
  },
  resetStats: (phase = Phases.MENU) => {
    return {
      type: 'RESET_STATS',
      phase,
    };
  },
  initialise: () => {
    return {
      type: 'INITIALISE',
    };
  },
  setPhase: (phase) => {
    return {
      type: 'SET_PHASE',
      phase,
    };
  },
  lose: () => {
    return {
      type: 'LOSE',
    };
  },
  win: () => {
    return {
      type: 'WIN',
    };
  },
};

const statsReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE':
      return {
        ...state,
        score: 0,
        lives: 3,
        accuracy: 0,
        hits: 0,
        misses: 0,
        level: 1,
        maxLevel: 5,
        speed: 0,
        countdownRate: 15,
        intervalRate: 100,
      };

    case 'ADD_HITS':
      return {
        ...state,
        hits: state.hits + action.hits,
        score: state.score + action.score,
        accuracy:
          (state.hits + action.hits) /
          (state.hits + action.hits + state.misses),
      };

    case 'ADD_MISSES':
      return {
        ...state,
        misses: state.misses + action.misses,
        lives: state.lives - 1,
        accuracy: state.hits / (state.hits + state.misses + action.misses),
      };

    case 'LEVEL_UP':
      return {
        ...state,
        level: state.level + 1,
        lives: state.lives + 1 > 3 ? 3 : state.lives + 1,
        countdownRate: state.countdownRate - action.speedPenalty,
      };

    case 'SET_SPEED':
      return {
        ...state,
        speed: action.speed,
      };

    case 'RESET_STATS':
      return {
        ...defaultStats,
        phase: action.phase,
      };

    case 'SET_PHASE':
      return {
        ...state,
        phase: action.phase,
      };

    case 'LOSE':
      return {
        countdownRate: null,
        intervalRate: null,
        phase: Phases.GAME_OVER,
      };

    default:
      return state;
  }
};

const StatsProvider = ({ children }) => {
  const [stats, statsDispatch] = useReducer(statsReducer, defaultStats);
  return (
    <StatsContext.Provider value={{ stats, statsDispatch, statsActions }}>
      {children}
    </StatsContext.Provider>
  );
};

const useStats = () => {
  const context = useContext(StatsContext);

  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }

  return context;
};

export { StatsProvider, useStats };
