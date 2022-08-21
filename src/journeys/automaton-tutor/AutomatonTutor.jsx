import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import ContextMenu from "./components/ContextMenu";
import useAutomatonTutorStore, { Context } from "./state/zustand";
import useScreenOrientation from "react-hook-screen-orientation";

export const AutomatonTutor = () => {
  const { graphData, setActiveContexMenu, setSelectedEntity } =
    useAutomatonTutorStore();
  const screenOrientation = useScreenOrientation();
  const [defaultOrientation] = useState(screenOrientation);

  useEffect(() => {
    if (defaultOrientation !== screenOrientation) {
      window.location.reload(false);
    }
  }, [defaultOrientation, screenOrientation]);

  return (
    <div className="relative">
      <div className="absolute w-screen h-screen -z-1">
        <ForceGraph2D
          graphData={graphData}
          linkWidth={2}
          nodeColor={(node) => {
            if (node.isFinal) return "lightgreen";
            if (node.isInitial) return "lightpink";
            return "lightblue";
          }}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={2}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
          linkColor={() => "black"}
          onBackgroundClick={() => setActiveContexMenu(Context.Canvas)}
          onNodeClick={(node) => {
            setActiveContexMenu(Context.State);
            setSelectedEntity(node.id);
          }}
          onLinkClick={() => setActiveContexMenu(Context.Transition)}
        />
      </div>
      <div className="absolute z-1">
        <ContextMenu />
      </div>
    </div>
  );
};
