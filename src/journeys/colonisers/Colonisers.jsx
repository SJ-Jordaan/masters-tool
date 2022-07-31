import React, { useState, useRef, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {
  elementsOverlap,
  getVerticalGap,
} from '../../common/helpers/collision';
import { useCountdown } from '../../hooks/useCountdown';
import { useInterval } from '../../hooks/useInterval';
import { GameScene } from '../../scenes/GameScene';
import { SwipeScene } from '../../scenes/SwipeScene';
import { ColoniserService } from './services/coloniser-service';

export const Colonisers = () => {
  // TODO: Move this state into context
  const [gameState, setGameState] = useState({
    gameOver: false,
    score: 0,
    speed: 0,
    intervalRate: 100,
    countdownRate: 5,
    habitats: [],
    selectedHabitat: 1,
    colonisers: [],
  });
  // TODO: Move this state into context
  const { countdown, isPaused, pause, resume, reset } = useCountdown(
    gameState.countdownRate,
  );
  const habitatRef = useRef();
  const coloniserRef = useRef();
  const graphRef = useRef();

  const renderColoniser = () => {
    if (!gameState.colonisers?.[0]) {
      return;
    }
    return (
      <div
        ref={coloniserRef}
        className='flex flex-col items-center h-fill'
        style={{ paddingTop: gameState.colonisers?.[0].y }}
      >
        <p className='text-center'>{gameState.colonisers?.[0]?.id}</p>
        <div
          className={`transform rotate-180`}
          style={{
            backgroundImage: `url(${gameState.colonisers?.[0]?.sprite})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: 85,
            height: 50,
          }}
        />
      </div>
    );
  };

  const generateHabitats = useCallback(() => {
    const habitats = [];
    for (let i = 0; i < 3; i++) {
      const habitat = ColoniserService.generateHabitat();
      habitats.push(habitat);
    }

    return habitats;
  }, []);

  const generateColonisers = useCallback((habitats) => {
    // Select a random index from the habitats array
    const colonisers = [];
    const population = 1;

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

  const calculateSpeed = useCallback(() => {
    if (!coloniserRef.current || !habitatRef.current) {
      return;
    }

    const distance = getVerticalGap(habitatRef.current, coloniserRef.current);

    const ratio = 0.1 / gameState.countdownRate;

    const speed = distance * ratio;

    return speed;
  }, [gameState.countdownRate]);

  useEffect(() => {
    const habitats = generateHabitats();
    const colonisers = generateColonisers(habitats);

    setGameState((prevState) => ({
      ...prevState,
      habitats,
      colonisers,
    }));
  }, [generateHabitats, generateColonisers]);

  // Game loop, all game lifecycle logic goes here
  useInterval(() => {
    if (!coloniserRef.current || !habitatRef.current) {
      return;
    }

    if (elementsOverlap(coloniserRef.current, habitatRef.current)) {
      // Check if the coloniser reached the correct habitat
      const successfulJourney = ColoniserService.validateJourney(
        gameState.habitats[gameState.selectedHabitat],
        gameState.colonisers?.[0],
      );
      // If yes then get points
      if (successfulJourney) {
        const [, colonisers] = gameState.colonisers;

        if (colonisers.length === 0) {
          setGameState((prevState) => ({
            ...prevState,
            gameOver: true,
          }));
        }

        reset(gameState.countdownRate);

        setGameState((prevState) => ({
          ...prevState,
          score: prevState.score + 100,
          colonisers,
        }));

        return;
      }
      // If no then game over
      setGameState((prevState) => ({
        ...prevState,
        gameOver: true,
        intervalRate: null,
      }));

      return;
    }

    const colonisers = gameState.colonisers;
    const currentColoniser = colonisers[0];
    currentColoniser.y += gameState.speed;

    setGameState((prevState) => ({
      ...prevState,
      colonisers: [currentColoniser, ...colonisers.slice(1)],
    }));
  }, gameState.intervalRate);

  useEffect(() => {
    const speed = !gameState.speed ? calculateSpeed() : gameState.speed;

    setGameState((prevState) => ({
      ...prevState,
      speed,
    }));
  }, [calculateSpeed, gameState.speed]);

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
      score={gameState.score}
      next={gameState.colonisers?.[1]?.id || 'END'}
      countdown={countdown}
      isPaused={isPaused}
      pause={pause}
      resume={resume}
      reset={reset}
      gameOver={false}
    >
      <div className='flex flex-col z-10 items-center h-fill'>
        {renderColoniser()}
      </div>

      <SwipeScene
        _ref={habitatRef}
        css={'flex mt-auto justify-center items-center h-fill'}
        onLeftSwipe={handleLeftSwipe}
        onRightSwipe={handleRightSwipe}
      >
        <ForceGraph2D
          ref={graphRef}
          width={window.innerWidth - 40}
          height={400}
          enableZoomInteraction={false}
          enablePanInteraction={false}
          enableNodeDrag={false}
          enablePointerInteraction={false}
          graphData={gameState.habitats[gameState.selectedHabitat]}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          cooldownTicks={5}
          onEngineStop={() => graphRef.current.zoomToFit(0, 64)}
          nodeCanvasObject={(node, ctx) => {
            const size = 12;
            ctx.drawImage(
              node.icon,
              node.x - size / 2,
              node.y - size / 2,
              size,
              size,
            );
          }}
          nodePointerAreaPaint={(node, colour, ctx) => {
            const size = 12;
            ctx.fillStyle = colour;
            ctx.fillRect(node.x - size / 2, node.y - size / 2, size, size); // Draw square as pointer trap
          }}
          linkColor={(link) => {
            return '#000';
          }}
          linkCurvature={0.5}
          // linkDirectionalParticles={1}
          linkCanvasObjectMode={() => 'after'}
          linkCanvasObject={(link, ctx) => {
            const MAX_FONT_SIZE = 3;
            // const LABEL_NODE_MARGIN = 18 * 1.5;

            const start = link.source;
            const end = link.target;

            // ignore unbound links
            if (typeof start !== 'object' || typeof end !== 'object') return;

            // calculate label positioning for straight line
            let textPos;

            function getQuadraticXY(t, sx, sy, cp1x, cp1y, ex, ey) {
              return {
                x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
                y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey,
              };
            }

            // function to calculate the middle of a bezier curve's control point and the end point

            if (start.x === end.x && start.y === end.y) {
              // self loop
              textPos = getQuadraticXY(
                0.2,
                start.x,
                start.y,
                link.__controlPoints[0],
                link.__controlPoints[1],
                end.x,
                end.y,
              );
            } else {
              // start and end are different nodes
              textPos = getQuadraticXY(
                0.25,
                start.x,
                start.y,
                link.__controlPoints[0],
                link.__controlPoints[1],
                end.x,
                end.y,
              );
            }

            // const relLink = { x: end.x - start.x, y: end.y - start.y };

            // const maxTextLength =
            //   Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) -
            //   LABEL_NODE_MARGIN * 2;

            // let textAngle = Math.atan2(relLink.y, relLink.x);
            // // maintain label vertical orientation for legibility
            // if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
            // if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

            const label = `${link.symbols.join(',')}`;

            // estimate fontSize to fit in link length
            // const fontSize = Math.min(
            //   MAX_FONT_SIZE,
            //   maxTextLength / ctx.measureText(label).width,
            // );
            ctx.font = `${MAX_FONT_SIZE}px Sans-Serif`;

            // draw text label (with background rect)
            ctx.save();
            ctx.translate(textPos.x, textPos.y);
            // ctx.rotate(textAngle);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'darkgrey';
            ctx.fillText(label, 0, 0);
            ctx.restore();
          }}
        />
      </SwipeScene>
    </GameScene>
  );
};
