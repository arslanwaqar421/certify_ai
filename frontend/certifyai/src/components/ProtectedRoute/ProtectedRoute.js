import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { myContext } from '../../Context';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(myContext);

  if (!user || user.length === 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
