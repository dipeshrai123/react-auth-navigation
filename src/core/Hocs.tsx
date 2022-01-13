import * as React from "react";
import {
  NavLink as InternalNavLink,
  NavLinkProps as InternalNavLinkProps,
} from "react-router-dom";

import { NavigationConfigParams } from "./Types";
import AuthProvider from "./Auth/AuthProvider";
import AuthScreens from "./Auth/AuthScreens";
import NavigationProvider from "./Navigation/NavigationProvider";

export const Auth = {
  Provider: AuthProvider,
  Screens: AuthScreens,
};

export const Navigation = {
  Provider: NavigationProvider,
};

/**
 * Functional Higher Order Component which is alternative to Navigation HOC.
 * @param Component Top level component of entire component tree.
 * @param navigationConfig Object with publicPaths, privatePaths, userRoles and routerType
 */
export function withNavigation(
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
      <Navigation.Provider
        {...{ routerType, publicPaths, privatePaths, userRoles }}
      >
        <Component {...props} />
      </Navigation.Provider>
    );
  };
}

// NavLink Component as ActiveLink
export function ActiveLink(
  props: React.PropsWithoutRef<InternalNavLinkProps> &
    React.RefAttributes<HTMLAnchorElement>
) {
  return <InternalNavLink {...props} />;
}
