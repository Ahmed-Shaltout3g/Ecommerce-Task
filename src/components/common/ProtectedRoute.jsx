import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const getUserRole = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return null;
    return currentUser.role;
};

const ProtectedRoute = ({ allowedRoles }) => {
    const userRole = getUserRole();

    if (!userRole) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
