import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

export const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export const SignedInProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);

  if (!isAdmin) {
    return <Navigate to="/ticket-form" replace />;
  }
  return children;
};
