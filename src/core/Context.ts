import * as React from "react";
import {
  AuthConfig,
  NavigationConfigParams,
  PublicPathParams,
  PrivatePathParams,
} from "./Types";

export const DefaultAuthConfig: AuthConfig = {
  isLoggedIn: false,
  userRole: "",
};

export const AuthContext = React.createContext(DefaultAuthConfig);

interface InternalNavigationConfig extends NavigationConfigParams {
  origPublicPaths: PublicPathParams[];
  origPrivatePaths: PrivatePathParams[];
}

export const navigationConfig: InternalNavigationConfig = {
  publicPaths: [],
  privatePaths: [],
  userRoles: {},
  routerType: "browser",
  origPublicPaths: [],
  origPrivatePaths: [],
};

export const NavigationContext = React.createContext(navigationConfig);
