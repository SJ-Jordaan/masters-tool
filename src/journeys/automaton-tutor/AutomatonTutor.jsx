import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import ContextMenu from "./components/ContextMenu";
import useAutomatonTutorStore, {
  Context,
  Modal,
} from "./state/useAutomatonTutorStore";
import useScreenOrientation from "react-hook-screen-orientation";
import ModalManager from "./components/ModalManager";
import SimulationInput from "./components/simulation/SimulationInput";
import useSimulationStore from "./state/useSimulation";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useGraphStore from "./state/useGraphSettings";
import threeSpritetext from "three-spritetext";

export const AutomatonTutor = () => {
  const {
    graphData,
    setActiveContexMenu,
    setSelectedEntity,
    selectedEntity,
    setActiveModal,
    toggleMakeTransition,
    makeTransition,
    initialStateId,
    finalStateIds,
    setTargetState,
    fixStates
  } = useAutomatonTutorStore();
  const { isLocked } = useGraphStore();
  const { currentState, isSimulating } = useSimulationStore();
  const screenOrientation = useScreenOrientation();
  const [defaultOrientation] = useState(screenOrientation);
  const graphRef = useRef();
  const nameTransitionModalToggleRef = useRef();
  const [parentRef] = useAutoAnimate();
  useEffect(() => {
    if (defaultOrientation !== screenOrientation) {
      window.location.reload(false);
    }
  }, [defaultOrientation, screenOrientation, graphData]);

  const handleAddTransition = (node) => {
    setTargetState(node);
    setActiveModal(Modal.EditTransition);
  };

  const colorNodes = (node) => {
    if (isSimulating && currentState === node.id) return "yellow";
    if (node.id === selectedEntity?.id) return "yellow";
    if (node.id === initialStateId && finalStateIds.includes(node.id))
      return "yellow";
    return "grey";
  };

  const onNodeDragEnd = (node) => {
    node.fx = node.x;
    node.fy = node.y;
    node.fz = node.z;
  };

  const onNodeClick = (node) => {
    if (isSimulating) return;

    if (makeTransition) {
      handleAddTransition(node);
      return;
    }

    // If any of nodes in the graph do not have fixed position, then we lock the graph
    const notFixed = graphData.nodes.find((node) => !node.fx);
    if (notFixed) {
      const newGraphNodes = graphData.nodes.map((node) => ({
        ...node,
        fx: node.x,
        fy: node.y,
        fz: node.z,
      }));

      fixStates(newGraphNodes);
    }

    setActiveContexMenu(Context.State);
    setSelectedEntity(node);
  };

  const onLinkClick = (link) => {
    if (isSimulating) return;
    setSelectedEntity(link);
    setActiveContexMenu(Context.Transition);
  };

  const linkCurvature = (link) => {
    if (link.source === link.target) return 0.5;
    const oppositeLink = graphData.links.filter(
      (glink) => glink.source === link.target && glink.target === link.source
    )[0];
    if (oppositeLink) return 0.15;
  };

  const onBackgroundClick = () => {
    if (isSimulating) return;
    setActiveContexMenu(Context.Canvas);
    setSelectedEntity(null);
    if (makeTransition) toggleMakeTransition();
  };

  const linkColor = (link) => {
    if (!selectedEntity?.id && link && selectedEntity?.index === link.index)
      return "yellow";

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return "white";

    return "black";
  };

  function nodePaint(node, color = "black", ctx) {
    // Make a white circle with a black border, with text inside using name
    const {
      name,
      x,
      y
    } = node;

    const nodeSize = 9;
    const fontSize = 4;
    const arrowSize = 4;
    const lineWidth = 0.5;
    ctx.lineWidth = lineWidth;

    if (initialStateId === node.id) {
      const arrowColor = linkColor();
      ctx.fillStyle = arrowColor;
      ctx.strokeStyle = arrowColor;
      // Draw a line from outside the circle to the left circumference
      ctx.beginPath();
      ctx.moveTo(x - nodeSize - arrowSize, y);
      ctx.lineTo(x - nodeSize - arrowSize * 2, y);
      ctx.stroke();
      // Draw an arrowhead at the end of the line touching the circumference
      ctx.beginPath();
      ctx.moveTo(x - nodeSize, y);
      ctx.lineTo(x - nodeSize - arrowSize, y - arrowSize / 2);
      ctx.lineTo(x - nodeSize - arrowSize, y + arrowSize / 2);
      ctx.fill();
    }

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, nodeSize, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    // Add the border
    ctx.strokeStyle = "black";
    ctx.stroke();
    
    if (finalStateIds.includes(node.id)) {
      // Draw a second circle inside the first one
      ctx.beginPath();
      ctx.arc(x, y, nodeSize - (nodeSize / 4), 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();
      // Add the border
      ctx.strokeStyle = "black";
      ctx.stroke();

      
      // Add the text below the circle
      ctx.fillStyle = "black";
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "black";
      ctx.fillText(name, x, y + (nodeSize - nodeSize / 4) - (fontSize / 2) - 1);
      return;
    }

    // Add the text below the circle
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(name, x, y + nodeSize - fontSize / 2 - 1);
  }

  return (
    <div className="relative">
      <div className="absolute w-screen h-screen z-1">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          cooldownTicks={10}
          linkWidth={1}
          onEngineStop={() => graphRef.current.zoomToFit(300, 60)}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          onNodeDragEnd={onNodeDragEnd}
          onNodeDrag={onNodeClick}
          linkColor={linkColor}
          onBackgroundClick={onBackgroundClick}
          onNodeClick={onNodeClick}
          onLinkClick={onLinkClick}
          linkCurvature={linkCurvature}
          nodeLabel=""
          linkLabel={(link) => `${link.values.toString()}`}
          linkThreeObjectExtend={true}
          linkThreeObject={link => {
            // extend link with text sprite
            const sprite = new threeSpritetext(`${link.source} > ${link.target}`);
            sprite.color = 'lightgrey';
            sprite.textHeight = 1.5;
            console.log(sprite)
            return sprite;
          }}
          linkPositionUpdate={(sprite, { start, end }) => {
            const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
              [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
            })));

            // Position sprite
            Object.assign(sprite.position, middlePos);
          }}
          enablePanInteraction={!(isLocked || isSimulating)}
          enableNodeDrag={!(isLocked || isSimulating)}
          nodePointerAreaPaint={nodePaint}
          nodeCanvasObject={(node, ctx) => nodePaint(node, colorNodes(node), ctx)}
        />
        <div>
          <label
            ref={nameTransitionModalToggleRef}
            htmlFor="nameTransitionModal"
            className="hidden btn modal-button"
          />
        </div>
      </div>
      <div className="fixed -z-1">
        <ContextMenu ref={graphRef} />
      </div>
      <div className="fixed bottom-0 -z-1" ref={parentRef}>
        {isSimulating && <SimulationInput />}
      </div>
      <ModalManager />
    </div>
  );
};
