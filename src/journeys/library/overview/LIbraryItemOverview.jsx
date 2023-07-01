import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineAcademicCap, HiOutlineClipboardList } from "react-icons/hi";
import LevelSelector from "../../../components/level/LevelSelector";
import { Header } from "../../../components/layout/Header";
// import { BottomNavbar } from "../../../components";
import categories from "../../../data/library.json";
import CreateLevel from "../../../components/question/question-types/CreateLevel";

export const LibraryItemOverview = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);

  const renderOverview = () => (
    <>
      <div className="hero">
        <div className="hero-content">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">{category.title}</h1>
            <p className="py-6">{category.description}</p>
          </div>
        </div>
      </div>
      {category.isCustom && (
        <CreateLevel onCreate={() => setActiveTab("exercises")} />
      )}
    </>
  );

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <div className="tabs">
        <button
          className={`tab tab-bordered flex-1 ${
            activeTab === "overview" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          <HiOutlineAcademicCap className="mr-2" />
          Overview
        </button>
        <button
          className={`tab tab-bordered flex-1 ${
            activeTab === "exercises" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("exercises")}
        >
          <HiOutlineClipboardList className="mr-2" />
          Exercises
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "overview" ? (
          renderOverview()
        ) : (
          <LevelSelector categoryId={id} />
        )}
      </div>
      {/*<BottomNavbar />*/}
    </div>
  );
};
