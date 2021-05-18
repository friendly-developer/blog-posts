import React, { useState, useEffect } from "react";

import { API_USER } from "../constants/APIConstants";

const UserContext = React.createContext(() => {});
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [user, setUser] = useState({});
  const fetchUserDetails = async () => {
    try {
      const userRawData = await fetch(API_USER + userId);
      const userData = await userRawData.json();
      return userData;
    } catch (err) {
      return "";
    }
  };
  const getUser = async () => {
    if (!userId) return null;
    if (user[userId]) return user[userId];
    const userData = await fetchUserDetails(userId);
    if (!userData) return;
    const userCopy = { ...user };
    userCopy[userId] = userData;
    setUser(userCopy);
  };
  useEffect(() => {
    getUser(userId);
  }, [userId]);

  return (
    <UserContext.Provider value={{ setUserId, userData: user }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
