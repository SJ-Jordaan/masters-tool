import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { SwipeScene } from '../../../scenes';

export const Habitat = (props) => {
  return (
    <SwipeScene
      _ref={props.habitatRef}
      css={'flex fixed bottom-0 justify-center w-full items-center'}
      onLeftSwipe={props.onLeftSwipe}
      onRightSwipe={props.onRightSwipe}
    >
      <ForceGraph2D
        ref={props.graphRef}
        width={window.innerWidth - 40}
        height={400}
        enableZoomInteraction={false}
        enablePanInteraction={false}
        enableNodeDrag={false}
        enablePointerInteraction={false}
        graphData={props.habitat}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        cooldownTicks={10}
        onEngineStop={() => props.graphRef.current.zoomToFit(0, 64)}
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
          return '#777';
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

          const label = `${link.symbols.join(',')}`;

          ctx.font = `${MAX_FONT_SIZE}px Sans-Serif`;

          ctx.save();
          ctx.translate(textPos.x, textPos.y);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'white';
          ctx.fillText(label, 0, 0);
          ctx.restore();
        }}
      />
    </SwipeScene>
  );
};
