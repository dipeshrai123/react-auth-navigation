import { matchPath } from 'react-router-dom';

// Support (*) feature for user roles access
export const canUserAccess = (userRoles: Array<string>, path: string) => {
  if (userRoles.indexOf(path) >= 0) {
    return true;
  }

  const asteriskUserRoles = userRoles.filter((val) => val.indexOf('*') >= 0);
  if (asteriskUserRoles.length > 0) {
    const canAccess = asteriskUserRoles
      .map((role) => {
        console.log(matchPath(path, role), path, role);
        return {
          role,
          access: role === '*' || !!matchPath(path, role),
        };
      })
      .filter((val) => val.access);

    if (canAccess.length > 0) return true;

    return false;
  }

  return false;
};
