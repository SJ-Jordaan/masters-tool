import React from "react";
import categories from "../../../data/library.json";
import OverallProgress from "./OverallProgress";
import RecentLevels from "./RecentLevels";

const RecentActivity = ({ levels }) => {
  return (
    <div>
      <h2 className="text-2xl mb-2">Overall Progress</h2>
      <OverallProgress levels={levels} categories={categories} />
      <div className="divider" />
      <RecentLevels levels={levels} />
    </div>
  );
};
export default RecentActivity;
