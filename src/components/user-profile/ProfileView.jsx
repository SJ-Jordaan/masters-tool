import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileEdit from "./ProfileEdit";

const ProfileView = () => {
  const { user } = useContext(UserContext);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  if (editing) {
    return <ProfileEdit setEditing={setEditing} />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">
          No user profile found. Please create one.
        </p>
        <button className="btn btn-primary" onClick={handleEditClick}>
          Create Profile
        </button>
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
      <button className="btn btn-primary" onClick={handleEditClick}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileView;
