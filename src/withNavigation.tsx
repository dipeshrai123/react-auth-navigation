import * as React from 'react';

import mergeSubPaths from './utils/mergeSubPaths';
import { PublicPath, PrivatePath } from './types';

export const NavigationContext = React.createContext<{
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
