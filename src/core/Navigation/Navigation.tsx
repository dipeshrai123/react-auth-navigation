import * as React from "react";

import { NavigationProviderParams } from "../Types";
import { NavigationContext } from "../Context";
import { getParsedPaths, reOrderPaths } from "../Utilities";

/**
 * Higher Order Component to define private, public and protected routes for different user roles.
 * @publicPaths prop accepts an array with key, name, path, component, restricted, subPaths, nestedPaths and props.
 * @privatePaths prop accepts an array with key, name, path, component, subPaths, nestedPaths and props.
 * @userRoles prop an object with any number of user role key with its access end points path.
 * @routerType prop either "hash" or "browser"
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
