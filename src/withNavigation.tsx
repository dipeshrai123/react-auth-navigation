import * as React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

import mergeSubPaths from './utils/mergeSubPaths';
import { PublicPath, PrivatePath } from './types';

const NavigationContext = React.createContext<{
  paths: PublicPath[] | PrivatePath[];
  userRoles: any;
  routerType?: 'browser' | 'hash';
}>({
  paths: [],
  userRoles: undefined,
  routerType: 'browser',
});

interface NavigationConfig {
  publicPaths: PublicPath[];
  privatePaths: PrivatePath[];
  userRoles: any;
  routerType?: 'browser' | 'hash';
}

export const withNavigation = (
  Component: React.ComponentType,
  config: NavigationConfig
) => {
  return function (props: any) {
    const { publicPaths, privatePaths, userRoles, routerType } = config;
    const paths = mergeSubPaths([...publicPaths, ...privatePaths]);
    return (
      <NavigationContext.Provider
        value={{
          paths,
          userRoles,
          routerType,
        }}
      >
        <Component {...props} />
      </NavigationContext.Provider>
    );
  };
};

const Screens = () => {
  const { paths } = React.useContext(NavigationContext);
  console.log('paths', paths);
  return (
    <Routes>
      {paths.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export interface AuthConfig {
  isLoggedIn: boolean;
  userRole: string;
}

interface AuthProps {
  children: React.ReactNode;
  config: AuthConfig;
  state?: any;
}

export const AuthContext = React.createContext({
  isLoggedIn: false,
  userRole: '',
});

export const Auth = (props: AuthProps) => {
  const { children, config, state } = props;
  const { routerType } = React.useContext(NavigationContext);
  return (
    <AuthContext.Provider value={{ ...config, ...state }}>
      {routerType === 'hash' ? (
        <HashRouter>{children}</HashRouter>
      ) : (
        <BrowserRouter>{children}</BrowserRouter>
      )}
    </AuthContext.Provider>
  );
};

Auth.Screens = Screens;
