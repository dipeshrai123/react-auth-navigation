import * as React from "react";

import { NavigationConfigParams } from "../Types";
import Navigation from "./Navigation";

/**
 * Functional Higher Order Component which is alternative to Navigation HOC.
 * @param Component Top level component of entire component tree.
 * @param navigationConfig Object with publicPaths, privatePaths, userRoles and routerType
 */
function withNavigation(
  Component: React.ComponentType,
  navigationConfig: NavigationConfigParams
) {
  const {
    publicPaths,
    privatePaths,
    userRoles,
    routerType = "browser",
  } = navigationConfig;
  return function (props: any) {
    return (
      <Navigation {...{ routerType, publicPaths, privatePaths, userRoles }}>
        <Component {...props} />
      </Navigation>
    );
  };
}

export default withNavigation;
