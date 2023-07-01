import React from "react";
import { Link } from "react-router-dom";
// import { BottomNavbar } from "../../components";
import { Header } from "../../components/layout/Header";
import categories from "../../data/library.json";

export const Library = () => {
  return (
    <div className="min-h-screen pb-12">
      <Header />
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Library</h1>
            <p className="py-6">Select a category to learn and practice</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {categories.map((category) => (
          <Link to={category.route} key={category.id}>
            <div className="card card-compact bordered shadow bg-grey-800">
              <div className="card-body">
                <h2 className="card-title mt-4">{category.title}</h2>
                <p>{category.shortDescription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/*<BottomNavbar />*/}
    </div>
  );
};
