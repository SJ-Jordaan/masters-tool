import React from "react";
import {
  AcademicCapIcon,
  HomeIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";

const NavItems = [
  {
    label: "Tutor",
    Icon: AcademicCapIcon,
    to: "/tutor",
  },
  {
    label: "Home",
    Icon: HomeIcon,
    to: "/",
  },
  {
    label: "Library",
    Icon: ViewGridIcon,
    to: "/library",
  },
];

export const BottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="btm-nav">
      {NavItems.map(({ label, Icon, to }, i) => (
        <Link key={`link-${label}-${to}`} to={to}>
          <div
            key={`${label}-${i}-${to}`}
            className={`${location.pathname === to ? "text-info active" : ""}`}
          >
            <Icon className="h-6 w-6" />
          </div>
        </Link>
      ))}
    </div>
  );
};
