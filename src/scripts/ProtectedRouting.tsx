import React from "react";
import { Route, Redirect } from "react-router-dom";

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    allowedRoles: string[]; // Roles allowed to access the route
    userRole: string; // User's role
    redirectPath: string; // Path to redirect if user doesn't have the required role
    path: string;
    exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           component: Component,
                                                           allowedRoles,
                                                           userRole,
                                                           redirectPath,
                                                           ...rest
                                                       }) => {
    const isAuthorized = allowedRoles.includes(userRole);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectPath} />
                )
            }
        />
    );
};

export default ProtectedRoute;