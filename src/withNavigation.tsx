import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Path = { name: string; path: string; component: React.ReactNode };
type PublicPaths = (Path & { restricted?: boolean })[];
type PrivatePaths = Path[];

const NavigationContext = React.createContext<{
  publicPaths: PublicPaths;
  privatePaths: PrivatePaths;
  userRoles: any;
}>({
  publicPaths: [],
  privatePaths: [],
  userRoles: undefined,
});

export const withNavigation = (
  Component: React.ComponentType,
  config: {
    publicPaths: PublicPaths;
    privatePaths: PrivatePaths;
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

  const paths = [...publicPaths, ...privatePaths];
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
