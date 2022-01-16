// /a/* to /a and /a/*
export const getParsedUserRole = (userRoles: Array<string>) => {
  const modifiedUserRoles: Array<string> = [];
  userRoles.forEach((role) => {
    if (role.indexOf("*") >= 0) {
      modifiedUserRoles.push(role.split("/*")[0]);
      modifiedUserRoles.push(role);
    } else {
      modifiedUserRoles.push(role);
    }
  });
  return Array.from(new Set(modifiedUserRoles));
};
