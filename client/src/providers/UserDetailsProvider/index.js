import * as React from 'react';
import { useLocalStorage } from '../../customHooks/useLocalStorage';

export const UserDetailsContext = React.createContext({
  userDetails: {},
  setUserDetails: () => {
    throw new Error('ho shit renderd outside of a provider');
  },
});

export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useLocalStorage('LAF-user-details', {});

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
