import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { parseSubPaths } from './utils/getParsedPaths';
import { PublicPath, PrivatePath } from './types';

const NavigationContext = React.createContext<{
  publicPaths: PublicPath[];
  privatePaths: PrivatePath[];
  userRoles: any;
}>({
  publicPaths: [],
  privatePaths: [],
  userRoles: undefined,
});

export const withNavigation = (
  Component: React.ComponentType,
  config: {
    publicPaths: PublicPath[];
    privatePaths: PrivatePath[];
    userRoles: any;
  }
) => {
  return function (props: any) {
    return (
      <NavigationContext.Provider value={config}>
        <Component {...props} />
      </NavigationContext.Provider>
    );
  };
};

export const Screens = () => {
  const { publicPaths, privatePaths } = React.useContext(NavigationContext);
  const paths = parseSubPaths([...publicPaths, ...privatePaths]);

  console.log('paths', paths);
  return (
    <BrowserRouter>
      <Routes>
        {paths.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
