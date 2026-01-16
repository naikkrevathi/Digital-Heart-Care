import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, userRole, isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
