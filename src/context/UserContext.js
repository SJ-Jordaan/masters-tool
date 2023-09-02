import React, { createContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../services/LocalStorageService";
import { User } from "../common/models/User";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getFromLocalStorage("user") || {
      username: "Anon",
      avatar: "/masters-tool/avatars/avataaars(1).svg",
    };
    if (userData) {
      setUser(
        new User(
          userData.username,
          userData.avatar,
          userData.totalScore,
          userData.currentLevel,
          userData.completedLevels,
          userData.currentLevels,
          userData.currentQuestions,
          userData.achievements
        )
      );
    }
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    // Save to local storage using service
    saveToLocalStorage("user", userData);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
