import React, { useContext, useState } from "react";
import { BottomNavbar } from "../../components";
import { Header } from "../../components/layout/Header";
import { LevelContext } from "../../context/LevelContext";
import { HiOutlineAcademicCap, HiOutlineClipboardList } from "react-icons/hi";
import RecentActivity from "./components/RecentActivity";
import QuickstartGuide from "./components/QuickstartGuide";
import steps from "../../data/quickstart.json";

export const Homepage = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const { levels } = useContext(LevelContext);

  return (
    <div className="flex flex-col mb-20">
      <Header />
      <div className="tabs">
        <button
          className={`tab tab-bordered flex-1 ${
            activeTab === "recent" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("recent")}
        >
          <HiOutlineAcademicCap className="mr-2" />
          Recent Activity
        </button>
        <button
          className={`tab tab-bordered flex-1 ${
            activeTab === "quickstart" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("quickstart")}
        >
          <HiOutlineClipboardList className="mr-2" />
          Quickstart
        </button>
      </div>
      <div className="p-4">
        {activeTab === "recent" ? (
          <RecentActivity levels={levels} />
        ) : (
          <QuickstartGuide steps={steps} />
        )}
      </div>
      <BottomNavbar />
    </div>
  );
};
