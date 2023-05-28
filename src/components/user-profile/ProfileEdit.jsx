import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import avatars from "../../data/avatars.json";

const ProfileEdit = ({ setEditing }) => {
  const { user, saveUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser({ username, avatar });
    setEditing?.(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4">
      <h2 className="text-4xl font-bold mb-2">Edit User Profile</h2>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="input input-bordered w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="avatar">
            Avatar
          </label>
          <div className="flex flex-wrap justify-center space-x-2">
            {avatars.map((av) => (
              <img
                key={av}
                className={`w-16 h-16 rounded-full cursor-pointer border-4 ${
                  avatar === av ? "border-blue-500" : "border-transparent"
                }`}
                src={av}
                alt="avatar"
                onClick={() => setAvatar(av)}
              />
            ))}
          </div>
        </div>
        <button className="btn btn-primary mt-4" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
