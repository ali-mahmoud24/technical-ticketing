// import { createContext, useState, useCallback, useEffect } from 'react';

// export const AuthContext = createContext({
//   token: null,
//   isLoggedIn: false,
//   userId: null,
//   login: (userId, token, isAdmin, expirationDate) => {},
//   logout: () => {},
//   isAdmin: false,
//   isEngineer: false,
// });

// let logoutTimer;

// const getUserData = () => {
//   let userData = {
//     token: null,
//     tokenExpirationDate: null,
//     userId: null,
//     isAdmin: false,
//     isEngineer: false,
//   };

//   try {
//     const localStorageResult = JSON.parse(localStorage.getItem('userData'));

//     if (localStorageResult) {
//       userData = localStorageResult;
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   return userData;
// };

// const AuthContextProvider = ({ children }) => {
//   const [userSession, setUserSession] = useState(getUserData());
//   const { token, tokenExpirationDate, userId, isAdmin, isEngineer } =
//     userSession;

//   const login = useCallback(
//     (userId, token, isAdmin, isEngineer, expirationDate) => {
//       const tokenExpirationDate =
//         expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
//       setUserSession({
//         token,
//         userId,
//         tokenExpirationDate,
//         isAdmin,
//         isEngineer,
//       });
//       localStorage.setItem(
//         'userData',
//         JSON.stringify({
//           userId,
//           token,
//           expiration: tokenExpirationDate.toISOString(),
//           isAdmin,
//           isEngineer,
//         })
//       );
//     },
//     []
//   );

//   const logout = useCallback(() => {
//     setUserSession({
//       token: null,
//       userId: null,
//       tokenExpirationDate: null,
//       isAdmin: null,
//       isEngineer: null,
//     });
//     localStorage.removeItem('userData');
//   }, []);

//   useEffect(() => {
//     if (token && tokenExpirationDate) {
//       const remainingTime =
//         tokenExpirationDate.getTime() - new Date().getTime();
//       logoutTimer = setTimeout(logout, remainingTime);
//     } else {
//       clearTimeout(logoutTimer);
//     }
//   }, [token, logout, tokenExpirationDate]);

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem('userData'));
//     if (
//       storedData &&
//       storedData.token &&
//       new Date(storedData.expiration) > new Date()
//     ) {
//       login(
//         storedData.userId,
//         storedData.token,
//         storedData.isAdmin,
//         storedData.isEngineer,
//         new Date(storedData.expiration)
//       );
//     }
//   }, [login]);

//   const value = {
//     isLoggedIn: !!token,
//     token,
//     userId,
//     login,
//     logout,
//     isAdmin,
//     isEngineer,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContextProvider;

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

// let logoutTimer;

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

  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime =
  //       tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);

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
