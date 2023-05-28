import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="navbar">
      <Link to={"/"} className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">AutomaTutor</a>
      </Link>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user.avatar} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content p-2 shadow bg-gray-600 rounded-box w-52"
          >
            <Link to={"/user/view"}>Profile</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
