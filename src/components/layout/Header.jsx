import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { Build } from "../../common/constants/build";

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="navbar justify-between">
      <Link to={"/library/4"} className="btn btn-ghost normal-case text-xl">
        AutomaTutor <sub className="text-xs ml-1">v{Build.version}</sub>
      </Link>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user.avatar} alt="avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact bg-accent dropdown-content p-4 shadow text-white rounded-box"
          >
            <Link to={"/user/view"}>Profile</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
