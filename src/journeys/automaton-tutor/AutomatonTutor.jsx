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
    if (isSimulating && currentState === node.id) return "red";
    if (node.id === selectedEntity?.id) return "purple";
    if (node.id === initialStateId && finalStateIds.includes(node.id))
      return "yellow";
    if (node.id === initialStateId) return "lightpink";
    if (finalStateIds.includes(node.id)) return "lightgreen";
    return "lightblue";
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
    if (!selectedEntity?.id && selectedEntity?.index === link?.index)
      return "purple";

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return "white";

    return "black";
  };

  return (
    <div className="relative">
      <div className="absolute w-screen h-screen z-1">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          cooldownTicks={10}
          linkWidth={1}
          onEngineStop={() => graphRef.current.zoomToFit(300, 60)}
          nodeColor={colorNodes}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          onNodeDragEnd={onNodeDragEnd}
          linkColor={linkColor}
          onBackgroundClick={onBackgroundClick}
          onNodeClick={onNodeClick}
          onLinkClick={onLinkClick}
          linkCurvature={linkCurvature}
          linkLabel={(link) => `${link.values.toString()}`}
          enableZoomInteraction={!(isLocked || isSimulating)}
          enablePanInteraction={!(isLocked || isSimulating)}
          enableNodeDrag={!(isLocked || isSimulating)}
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
        <ContextMenu />
      </div>
      <div className="fixed bottom-0 -z-1" ref={parentRef}>
        {isSimulating && <SimulationInput />}
      </div>
      <ModalManager />
    </div>
  );
};
