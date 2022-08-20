/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import ContextMenu from "./components/ContextMenu";
import useAutomatonTutorStore, { Context } from "./state/zustand";

export const AutomatonTutor = () => {
  const { graphData, setActiveContexMenu } = useAutomatonTutorStore();
  return (
    <div className="relative">
      <div className="absolute -z-1">
        <ForceGraph2D
          graphData={graphData}
          onBackgroundClick={() => setActiveContexMenu(Context.Canvas)}
          onNodeClick={() => setActiveContexMenu(Context.State)}
        />
      </div>
      <div className="absolute z-50">
        <ContextMenu />
      </div>
    </div>
  );
};
