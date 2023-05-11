import { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: (userId, token, isAdmin, isEngineer) => {},
  logout: () => {},
  isAdmin: false,
  isEngineer: false,
});

const getUserData = () => {
  let userData = {
    token: null,
    userId: null,
    isAdmin: false,
    isEngineer: false,
  };

  try {
    const localStorageResult = JSON.parse(localStorage.getItem('userData'));

    if (localStorageResult) {
      userData = localStorageResult;
    }
  } catch (error) {
    console.log(error);
  }

  return userData;
};

const AuthContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(getUserData());
  const { token, userId, isAdmin, isEngineer } = userSession;

  const login = useCallback((userId, token, isAdmin, isEngineer) => {
    setUserSession({
      token,
      userId,
      isAdmin,
      isEngineer,
    });
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
        isAdmin,
        isEngineer,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserSession({
      token: null,
      userId: null,
      isAdmin: null,
      isEngineer: null,
    });
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(
        storedData.userId,
        storedData.token,
        storedData.isAdmin,
        storedData.isEngineer
      );
    }
  }, [login]);

  const value = {
    isLoggedIn: !!token,
    token,
    userId,
    login,
    logout,
    isAdmin,
    isEngineer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
