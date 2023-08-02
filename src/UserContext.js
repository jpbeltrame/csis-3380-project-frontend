import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  const contextValue = {
    userId,
    setUserId,
    username,
    setUsername,
    clearUserData: () => {
      setUserId('');
      setUsername('');
    },
  };

  console.log('UserContext value:', contextValue); // Add this line to check the context value

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
