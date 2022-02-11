import * as React from "react";

import { NavigationProviderParams } from "../Types";
import { NavigationContext } from "../Context";
import { getParsedPaths, reOrderPaths } from "../Utilities";

/**
 * Higher Order Component to define private, public and protected routes for different user roles.
 * @prop { array } publicPaths - PublicPath array type
 * @prop { array } privatePaths - PrivatePath array type
 * @prop { object } userRoles - UserRole object type
 * @prop { string } routerType - "hash" | "browser"
 */
function Navigation(props: NavigationProviderParams) {
  const { children, privatePaths, publicPaths, userRoles, routerType } = props;

  const parser = getParsedPaths("subPaths");

  const parsedPrivatePaths = parser(privatePaths);
  const parsedPublicPaths = parser(publicPaths);

  const _privatePaths = reOrderPaths(parsedPrivatePaths);
  const _publicPaths = reOrderPaths(parsedPublicPaths);

  return (
    <NavigationContext.Provider
      value={{
        privatePaths: _privatePaths,
        publicPaths: _publicPaths,
        userRoles: userRoles,
        origPrivatePaths: parsedPrivatePaths,
        origPublicPaths: parsedPublicPaths,
        routerType,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export default Navigation;
