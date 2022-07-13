import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { PublicPathParams, PrivatePathParams } from '../Types';
import { NavigationContext } from '../Context';
import { getParsedPaths } from '../Utilities';
import { PublicRoute, PrivateRoute } from '../Routes';

/**
 * Higher Order Component which wraps overall component tree
 * Auth.Screens
 * @path prop accepts a string or null, null represents "/" while any other string path for nested navigation
 */
const AuthScreens = (props: { path?: string }) => {
  const { path } = props;
  const { publicPaths: PUBLIC_PATHS, privatePaths: PRIVATE_PATHS } =
    React.useContext(NavigationContext);

  const hasPath = !!path && path !== '/';
  let publicPaths = [];
  let privatePaths = [];

  if (hasPath) {
    const parser = getParsedPaths('nestedPaths');
    const parsedPublicPaths = parser(PUBLIC_PATHS);
    const parsedPrivatePaths = parser(PRIVATE_PATHS);

    const nestedPublicPathsArray = parsedPublicPaths.filter(
      (val: any) => val.path === path
    );
    const nestedPrivatePathsArray = parsedPrivatePaths.filter(
      (val: any) => val.path === path
    );
    const nestedPublicRoutes = parser(nestedPublicPathsArray);
    const nestedPrivateRoutes = parser(nestedPrivatePathsArray);
    const filteredNestedPublicRoutes = nestedPublicRoutes.filter(
      (val: any) => val.path !== path
    );
    const filteredNestedPrivateRoutes = nestedPrivateRoutes.filter(
      (val: any) => val.path !== path
    );

    publicPaths = filteredNestedPublicRoutes;
    privatePaths = filteredNestedPrivateRoutes;
  } else {
    publicPaths = PUBLIC_PATHS;
    privatePaths = PRIVATE_PATHS;
  }

  return (
    <Routes>
      {
        // PUBLIC ROUTES
        publicPaths.length &&
          publicPaths
            .filter(({ path }: PublicPathParams) => path !== null) // Other than Not Found Page
            .map(
              (
                {
                  path,
                  component,
                  restricted,
                  exact = true,
                  nestedPaths,
                }: PublicPathParams,
                index: number
              ) => {
                let _exact = exact;
                if (!!nestedPaths) {
                  _exact = false;
                }

                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <PublicRoute
                        component={component}
                        restricted={!!restricted}
                        exact={_exact}
                        path={path}
                      />
                    }
                  />
                );
              }
            )
      }
      {
        // PRIVATE ROUTES
        privatePaths.length &&
          privatePaths.map(
            (
              { path, component, exact = true, nestedPaths }: PrivatePathParams,
              index: number
            ) => {
              let _exact = exact;
              if (!!nestedPaths) {
                _exact = false;
              }

              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <PrivateRoute
                      component={component}
                      exact={_exact}
                      path={path}
                    />
                  }
                />
              );
            }
          )
      }

      {
        // NOT FOUND
        !hasPath &&
          publicPaths.length &&
          publicPaths
            .filter(({ path }: PublicPathParams) => path === null)
            .map(
              ({ component: Component }: PublicPathParams, index: number) =>
                index === 0 && <Route key={index} element={<Component />} />
            )
      }
    </Routes>
  );
};

export default AuthScreens;
