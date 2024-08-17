// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(() => {
    // Lấy UserID từ localStorage nếu có
    return localStorage.getItem('UserID') || null;
  });

  useEffect(() => {
    // Nếu userID thay đổi, lưu vào localStorage
    if (userID) {
      localStorage.setItem('UserID', userID);
    }
  }, [userID]);
  
  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
