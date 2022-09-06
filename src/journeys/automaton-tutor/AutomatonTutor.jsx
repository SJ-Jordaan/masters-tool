import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (defaultOrientation !== screenOrientation) {
      window.location.reload(false);
    }
  }, [defaultOrientation, screenOrientation]);

  const handleAddTransition = (node) => {
    addTransition({ source: selectedEntity.id, target: node.id });
    toggleMakeTransition();
  };

  return (
    <div className="relative">
      <div className="absolute w-screen h-screen -z-1">
        <ForceGraph2D
          graphData={graphData}
          linkWidth={1}
          nodeColor={(node) => {
            if (node.id === initialStateId && finalStateIds.includes(node.id))
              return "yellow";
            if (node.id === initialStateId) return "lightpink";
            if (finalStateIds.includes(node.id)) return "lightgreen";
            return "lightblue";
          }}
          linkDirectionalArrowLength={6}
          linkDirectionalArrowRelPos={1}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
          linkColor={() => "black"}
          onBackgroundClick={() => {
            setActiveContexMenu(Context.Canvas);
            if (makeTransition) toggleMakeTransition();
          }}
          onNodeClick={(node) => {
            if (makeTransition) {
              handleAddTransition(node);
              return;
            }
            setActiveContexMenu(Context.State);
            setSelectedEntity(node);
          }}
          onLinkClick={(link) => {
            setSelectedEntity(link);
            setActiveContexMenu(Context.Transition);
          }}
          linkCurvature={(link) => {
            if (link.source === link.target) return 1;
          }}
        />
      </div>
      <div className="absolute z-1">
        <ContextMenu />
      </div>
    </div>
  );
};
