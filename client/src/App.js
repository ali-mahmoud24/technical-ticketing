import { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Topbar from './components/Layout/Topbar';
import Sidebar from './components/Layout/Sidebar';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

// PROTECTED PAGES
import AddTicketPage from './pages/AddTicketPage';
import TicketPage from './pages/TicketPage';

// ADMIN PAGES
import AddUserPage from './pages/Admin/AddUserPage';
import UpdateUserPage from './pages/Admin/UpdateUserPage';
import UsersPage from './pages/Admin/UsersPage';
import AdminRepairsPage from './pages/Admin/AdminRepairsPage';
import PieChart from './components/Admin/Charts/PieChart/PieChart';

// ENGINEER PAGES
import EngineerRepairsPage from './pages/Engineer/EngineerRepairsPage';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';

import {
  ProtectedRoute,
  AdminProtectedRoute,
  SignedInProtectedRoute,
} from './shared/utils/auth-routes';

import { AuthContext } from './shared/context/auth-context';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const cacheRtl = createCache({
    key: 'muirtl',
    // prefixer is the only stylis plugin by default, so when
    // overriding the plugins you need to include it explicitly
    // if you want to retain the auto-prefixing behavior.
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const { isAdmin, isEngineer } = useContext(AuthContext);

  const showSidebar = isAdmin || isEngineer;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {showSidebar && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                {/* <Route path="/" element={<Navigate to="/auth" replace />} /> */}

                <Route path="/" element={<HomePage />} />

                <Route
                  path="/auth"
                  element={
                    <SignedInProtectedRoute>
                      <AuthPage />
                    </SignedInProtectedRoute>
                  }
                />

                <Route
                  path="/ticket-form"
                  element={
                    <ProtectedRoute>
                      <AddTicketPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/ticket"
                  element={
                    <ProtectedRoute>
                      <TicketPage />
                    </ProtectedRoute>
                  }
                />

                {/* ADMIN */}
                <Route
                  path="/repairs"
                  element={
                    <AdminProtectedRoute>
                      <AdminRepairsPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/add-user"
                  element={
                    <AdminProtectedRoute>
                      <AddUserPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <AdminProtectedRoute>
                      <UsersPage />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/users/:userId"
                  element={
                    <AdminProtectedRoute>
                      <UpdateUserPage />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/pie-chart"
                  element={
                    <AdminProtectedRoute>
                      <PieChart />
                    </AdminProtectedRoute>
                  }
                />

                {/* ENGINEER */}
                <Route
                  path="/my-repairs"
                  element={
                    <ProtectedRoute>
                      <EngineerRepairsPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
