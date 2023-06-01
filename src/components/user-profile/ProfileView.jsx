import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileEdit from "./ProfileEdit";
import { Link, useNavigate } from "react-router-dom";

const ProfileView = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const clearProgress = () => {
    localStorage.removeItem("levels");
    localStorage.removeItem("questions");
    navigate("/", { replace: true });
    window.location.reload();
  };

  if (editing) {
    return <ProfileEdit setEditing={setEditing} />;
  }

  if (!user) {
    return (
      <div className="hero min-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hey there!</h1>
            <p className="mb-5">
              Thank you for trying our research tool! Please choose your
              username and avatar. None of this leaves your device, but it makes
              the app feel more personal.
            </p>
            <button className="btn btn-primary" onClick={handleEditClick}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h2 className="text-4xl font-bold mb-2">User Profile</h2>
      <div className="w-24 h-24">
        <img
          className="object-cover rounded-full"
          src={user.avatar}
          alt="User avatar"
        />
      </div>
      <p className="text-xl">
        <strong>{user.username}</strong>
      </p>
      <div className="flex items-center gap-4">
        <button className="btn btn-primary" onClick={handleEditClick}>
          Edit Profile
        </button>
        <button className="btn btn-error" onClick={clearProgress}>
          Clear Progress
        </button>
      </div>
      <Link to={"/"} className="btn btn-outline fixed bottom-4 w-80 mx-4">
        Home
      </Link>
    </div>
  );
};

export default ProfileView;
