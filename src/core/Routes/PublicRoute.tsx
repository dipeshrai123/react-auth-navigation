import * as React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AuthContext, NavigationContext } from '../Context';
import { PrivatePathParams } from '../Types';
import { getParsedUserRole, canUserAccess } from '../Utilities';

// Public and Restricted Routes
const PublicRoute = (props: {
  path: string;
  component: React.ComponentType;
  restricted: boolean;
  exact: boolean;
}) => {
  const { component: Component, restricted, ...rest } = props;
  const { userRoles: USER_ROLES, origPrivatePaths } =
    React.useContext(NavigationContext);

  const { isLoggedIn, userRole } = React.useContext(AuthContext);

  if (!USER_ROLES[userRole]) {
    throw new Error(
      `User role '${userRole}' is not defined on root level navigation container access paths.`
    );
  }

  const userRolesAccessPaths: Array<string> = USER_ROLES[userRole].access;
  const parsedUserRolesAccessPaths: Array<string> =
    getParsedUserRole(userRolesAccessPaths);

  const accessPrivatePaths = origPrivatePaths.filter(
    (path: PrivatePathParams) => {
      return userRole && canUserAccess(parsedUserRolesAccessPaths, path.path);
    }
  );

  const initialPrivatePath =
    accessPrivatePaths.length > 0 ? accessPrivatePaths[0] : null;
  const redirectToPath = initialPrivatePath?.path;

  const canAccess =
    userRole && canUserAccess(parsedUserRolesAccessPaths, rest.path);

  return (
    <Route
      {...rest}
      element={
        isLoggedIn && restricted ? (
          <Navigate to={redirectToPath ?? '/'} replace />
        ) : userRole && canAccess ? (
          <Component />
        ) : (
          <Navigate to="/user-denied" replace />
        )
      }
    />
  );
};

export default PublicRoute;
