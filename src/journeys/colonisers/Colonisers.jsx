import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { COLONISERS } from '../../common/constants/sprites';
import ForceGraph2D from 'react-force-graph-2d';
import { GameScene } from '../../scenes/GameScene';
import { ColoniserService } from './services/coloniser-service';
import { useCallback } from 'react';

export const Colonisers = () => {
  const [gameState, setGameState] = React.useState({
    gameOver: false,
    score: 0,
    speed: 1,
    habitats: [],
    selectedHabitat: 1,
    currentColoniser: null,
    nextColoniser: null,
  });
  const habitatRef = useRef();
  const coloniserRef = useRef();
  const graphRef = useRef();

  const renderColoniser = () => {
    if (!gameState.currentColoniser) {
      return;
    }
    return (
      <div
        ref={coloniserRef}
        className='flex flex-col items-center h-fill'
        style={{ paddingTop: gameState.currentColoniser.y }}
      >
        <p className='text-center'>{gameState.currentColoniser?.id}</p>
        <div
          className={`transform rotate-180`}
          style={{
            backgroundImage: `url(${COLONISERS[0]})`,
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
    setGameState((prevState) => ({ ...prevState, habitats }));
  }, []);

  useEffect(() => {
    generateHabitats();
    setGameState((prevState) => ({
      ...prevState,
      colonisers: ['coloniser1', 'coloniser2', 'coloniser3'],
      currentColoniser: {
        x: 0,
        y: 0,
        id: 'coloniser1',
        icon: COLONISERS[0],
      },
    }));
  }, [generateHabitats]);

  // useEffect(() => {
  //   if (!coloniserRef.current || !habitatRef.current) {
  //     return;
  //   }

  //   if (elementsOverlap(coloniserRef.current, habitatRef.current)) {
  //     setGameState((prevState) => ({
  //       ...prevState,
  //       gameOver: true,
  //     }));

  //     return;
  //   }
  //   const interval = setInterval(() => {
  //     console.log('fire');

  //     setGameState((prevState) => ({
  //       ...prevState,
  //       currentColoniser: {
  //         ...prevState.currentColoniser,
  //         y: prevState.currentColoniser.y + 1,
  //       },
  //     }));
  //   }, gameState.speed * 100);

  //   return () => clearInterval(interval);
  // }, [gameState.currentColoniser?.y, gameState.speed]);

  // const paintNode = ({ icon, x, y }, ctx) => {
  //   const image = new Image();
  //   image.src = icon;

  //   // Draw the image to fit the node and keep the resolution of the image
  //   ctx.drawImage(
  //     image,
  //     0,
  //     0,
  //     image.width,
  //     image.height,
  //     0,
  //     0,
  //     ctx.canvas.width,
  //     ctx.canvas.height,
  //   );
  // };
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (
      isLeftSwipe &&
      gameState.selectedHabitat < gameState.habitats.length - 1
    ) {
      setGameState((prevState) => ({
        ...prevState,
        selectedHabitat: prevState.selectedHabitat + 1,
      }));
      return;
    }

    if (isRightSwipe && gameState.selectedHabitat > 0) {
      setGameState((prevState) => ({
        ...prevState,
        selectedHabitat: prevState.selectedHabitat - 1,
      }));
      return;
    }
  };
  return (
    <GameScene score={gameState.score} next={gameState.nextColoniser}>
      <div className='flex flex-col z-10 items-center h-fill'>
        {renderColoniser()}
      </div>

      <div
        ref={habitatRef}
        className='flex mt-auto justify-center items-center h-fill'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className='pointer-events-none'>
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
                  x:
                    (1 - t) * (1 - t) * sx +
                    2 * (1 - t) * t * cp1x +
                    t * t * ex,
                  y:
                    (1 - t) * (1 - t) * sy +
                    2 * (1 - t) * t * cp1y +
                    t * t * ey,
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
        </div>
      </div>
    </GameScene>
  );
};
