import React, { useEffect, useState, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import ContextMenu from "./components/ContextMenu";
import useAutomatonTutorStore, {
  Context,
} from "./state/useAutomatonTutorStore";
import useScreenOrientation from "react-hook-screen-orientation";

export const AutomatonTutor = () => {
  const {
    graphData,
    setActiveContexMenu,
    setSelectedEntity,
    selectedEntity,
    toggleMakeTransition,
    makeTransition,
    addTransition,
    initialStateId,
    finalStateIds,
  } = useAutomatonTutorStore();
  const screenOrientation = useScreenOrientation();
  const [defaultOrientation] = useState(screenOrientation);
  const graphRef = useRef();

  useEffect(() => {
    if (defaultOrientation !== screenOrientation) {
      window.location.reload(false);
    }
  }, [defaultOrientation, screenOrientation, graphData]);

  const handleAddTransition = (node) => {
    addTransition({ source: selectedEntity.id, target: node.id });
    toggleMakeTransition();
  };

  const colorNodes = (node) => {
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
    if (makeTransition) {
      handleAddTransition(node);
      return;
    }
    setActiveContexMenu(Context.State);
    setSelectedEntity(node);
  };

  const onLinkClick = (link) => {
    setSelectedEntity(link);
    setActiveContexMenu(Context.Transition);
  };

  const linkCurvature = (link) => {
    if (link.source === link.target) return 0.7;
  };

  const onBackgroundClick = () => {
    setActiveContexMenu(Context.Canvas);
    setSelectedEntity(null);
    if (makeTransition) toggleMakeTransition();
  };

  const linkColor = (link) =>
    !selectedEntity?.id && selectedEntity?.index === link?.index
      ? "purple"
      : "black";

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
          linkDirectionalArrowLength={7}
          linkDirectionalArrowRelPos={1}
          onNodeDragEnd={onNodeDragEnd}
          linkColor={linkColor}
          onBackgroundClick={onBackgroundClick}
          onNodeClick={onNodeClick}
          onLinkClick={onLinkClick}
          linkCurvature={linkCurvature}
        />
      </div>
      <div className="fixed -z-1">
        <ContextMenu />
      </div>
    </div>
  );
};
