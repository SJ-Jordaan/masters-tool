import React, { useState, useRef, useCallback } from 'react';
import { getVerticalGap } from '../../../common/helpers/collision';
import { GameScene } from '../scenes/GameScene';
import { Coloniser } from './Coloniser';
import { Habitat } from './Habitat';
import { ColoniserService } from '../services/coloniser-service';
import { useStats } from '../contexts';
import { Phases } from '../constants/phases';
import { ScreenFlash } from './ScreenFlash';

const initialState = {
  habitats: [],
  selectedHabitat: 1,
  colonisers: [],
};

export const Game = () => {
  const [gameState, setGameState] = useState(initialState);
  const { stats, statsDispatch, statsActions } = useStats();

  const habitatRef = useRef();
  const coloniserRef = useRef();
  const graphRef = useRef();
  const flashRef = useRef();

  const generateHabitats = useCallback(() => {
    const habitats = [];
    for (let i = 0; i < 3; i++) {
      const habitat = ColoniserService.generateHabitat();
      habitats.push(habitat);
    }

    return habitats;
  }, []);

  const generateColonisers = useCallback((habitats) => {
    const colonisers = [];
    const population = 5;

    for (let i = 0; i < population; i++) {
      let randomIndex = Math.floor(Math.random() * habitats.length);
      let randomHabitat = habitats[randomIndex];
      let coloniser = ColoniserService.generateColonisers(
        randomHabitat.automaton,
      );
      colonisers.push(coloniser[0]);
    }

    return colonisers;
  }, []);

  const calculateSpeed = () => {
    if (!coloniserRef.current || !habitatRef.current) {
      return;
    }

    const distance = getVerticalGap(habitatRef.current, coloniserRef.current);

    const ratio = 0.1 / stats.countdownRate;

    const speed = distance * ratio;

    return speed;
  };

  const setupLevel = () => {
    const habitats = generateHabitats();
    const colonisers = generateColonisers(habitats);
    const speed = !stats.speed ? calculateSpeed() : stats.speed;
    statsDispatch(statsActions.setSpeed(speed));

    setGameState((prevState) => ({
      ...prevState,
      habitats,
      colonisers,
    }));
  };

  const handleGameStep = () => {
    if (!coloniserRef.current || !habitatRef.current || stats.level === 0) {
      return;
    }

    const colonisers = gameState.colonisers;
    const currentColoniser = colonisers[0];
    currentColoniser.y += stats.speed;

    setGameState((prevState) => ({
      ...prevState,
      colonisers: [currentColoniser, ...colonisers.slice(1)],
    }));
  };

  const handleRoundEnd = () => {
    if (
      !coloniserRef.current ||
      !habitatRef.current ||
      gameState.habitats.length === 0
    ) {
      return;
    }
    const isCorrectHabitat = ColoniserService.validateJourney(
      gameState.habitats[gameState.selectedHabitat],
      gameState.colonisers?.[0],
    );

    const colonisers = gameState.colonisers.slice(1);
    if (isCorrectHabitat) {
      statsDispatch(statsActions.addHits());
      if (colonisers?.length !== 0) {
        flashRef.current.className += ' correct-flash';
        setTimeout(() => {
          flashRef.current.className =
            'fixed top-0 left-0 w-full h-full opacity-0 pointer-events-none';
        }, 400);
      }
    } else {
      if (stats.lives === 1) {
        statsDispatch(statsActions.addMisses());
        statsDispatch(statsActions.setPhase(Phases.GAME_OVER));
        return;
      }
      statsDispatch(statsActions.addMisses());
      flashRef.current.className += ' incorrect-flash';
      setTimeout(() => {
        flashRef.current.className =
          'fixed top-0 left-0 w-full h-full opacity-0 pointer-events-none';
      }, 400);
    }

    if (colonisers?.length === 0) {
      if (stats.level === stats.maxLevel) {
        statsDispatch(statsActions.setPhase(Phases.VICTORY));
        return;
      }

      setupLevel();
      statsDispatch(statsActions.levelUp());
      return;
    }
    setGameState((prevState) => ({
      ...prevState,
      colonisers,
    }));

    return;
  };

  const handleHalt = () => {
    setGameState(initialState);
  };

  const handleLeftSwipe = () => {
    if (gameState.selectedHabitat < gameState.habitats.length - 1) {
      setGameState((prevState) => ({
        ...prevState,
        selectedHabitat: prevState.selectedHabitat + 1,
      }));

      return;
    }
  };

  const handleRightSwipe = () => {
    if (gameState.selectedHabitat > 0) {
      setGameState((prevState) => ({
        ...prevState,
        selectedHabitat: prevState.selectedHabitat - 1,
      }));

      return;
    }
  };

  return (
    <GameScene
      onRoundEnd={handleRoundEnd}
      onInit={setupLevel}
      onGameStep={handleGameStep}
      onHalt={handleHalt}
      next={gameState.colonisers?.[1]?.id || '↑'}
    >
      <ScreenFlash _ref={flashRef} />

      <Coloniser
        coloniserRef={coloniserRef}
        yOffset={gameState.colonisers?.[0]?.y}
        label={gameState.colonisers?.[0]?.id}
        sprite={gameState.colonisers?.[0]?.sprite}
      />

      <Habitat
        habitatRef={habitatRef}
        graphRef={graphRef}
        habitat={gameState.habitats?.[gameState.selectedHabitat]}
        onLeftSwipe={handleLeftSwipe}
        onRightSwipe={handleRightSwipe}
      />
    </GameScene>
  );
};
