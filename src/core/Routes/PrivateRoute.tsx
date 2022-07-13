import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext, NavigationContext } from '../Context';
import { PublicPathParams } from '../Types';
import { getParsedUserRole, canUserAccess } from '../Utilities';

// Private Routes
const PrivateRoute = (props: {
  path: string;
  component: React.ComponentType;
  exact: boolean;
}) => {
  const { component: Component, ...rest } = props;
  const { userRoles: USER_ROLES, origPublicPaths } =
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

  const accessPublicPath = origPublicPaths.filter((path: PublicPathParams) => {
    return userRole && canUserAccess(parsedUserRolesAccessPaths, path.path);
  });
  const initialPublicPath =
    accessPublicPath.length > 0 ? accessPublicPath[0] : null;
  const redirectToPath = initialPublicPath?.path;

  const canAccess =
    userRole && canUserAccess(parsedUserRolesAccessPaths, rest.path);

  return isLoggedIn ? (
    userRole && canAccess ? (
      <Component />
    ) : (
      <Navigate to={redirectToPath ?? '/'} />
    )
  ) : (
    <Navigate to={redirectToPath ?? '/'} />
  );
};

export default PrivateRoute;
