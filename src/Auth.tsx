import * as React from 'react';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { PrivatePath, PublicPath } from './types';

import mergeNestedPaths from './utils/mergeNestedPaths';
import { NavigationContext } from './withNavigation';

const Screens = ({ path = '/' }: { path?: string }) => {
  const { paths } = React.useContext(NavigationContext);

  const hasPath = !!path && path !== '/';
  const filteredPath = React.useMemo(() => {
    if (hasPath) {
      const pathName = path + '/*';
      const nestedPaths = mergeNestedPaths(
        paths.filter((p) => p.path === pathName)
      );
      return nestedPaths
        .filter((p) => p.path !== pathName)
        .map((p) => ({ ...p, path: p.path.replace(pathName, '') }));
    }

    return paths;
  }, [paths, hasPath]);

  return (
    <Routes>
      {filteredPath.map(
        (
          route: (PublicPath | PrivatePath) & { isNestedParent: boolean },
          index
        ) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  {route.component}
                  {route.isNestedParent && <Outlet />}
                </>
              }
            />
          );
        }
      )}
    </Routes>
  );
};

interface AuthConfig {
  isLoggedIn: boolean;
  userRole: string;
}

interface AuthProps {
  children: React.ReactNode;
  config: AuthConfig;
  state?: any;
}

const AuthContext = React.createContext({
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
