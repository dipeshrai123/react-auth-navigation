import * as React from "react";
import * as ReactRouterDOM from "react-router-dom";

import * as Modules from "../Modules";
import { PublicPathParams, PrivatePathParams } from "../Types";
import { NavigationContext } from "../Context";
import { getParsedPaths } from "../Utils";

interface AuthScreensProps {
  path?: string;
}

/**
 * Higher Order Component which wraps overall component tree
 * Auth.Screens
 * @path prop accepts a string or null, null represents "/" while any other string path for nested navigation
 */
const AuthScreens: React.FC<AuthScreensProps> = (props: AuthScreensProps) => {
  const { path } = props;
  const { publicPaths: PUBLIC_PATHS, privatePaths: PRIVATE_PATHS } =
    React.useContext(NavigationContext);

  const hasPath = !!path;
  let publicPaths = [];
  let privatePaths = [];

  if (hasPath) {
    const parser = getParsedPaths("nestedPaths");
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
    <div>
      <ReactRouterDOM.Switch>
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
                    <Modules.PublicRoute
                      key={index}
                      path={path}
                      component={component}
                      restricted={!!restricted}
                      exact={_exact}
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
                {
                  path,
                  component,
                  exact = true,
                  nestedPaths,
                }: PrivatePathParams,
                index: number
              ) => {
                let _exact = exact;
                if (!!nestedPaths) {
                  _exact = false;
                }

                return (
                  <Modules.PrivateRoute
                    key={index}
                    path={path}
                    component={component}
                    exact={_exact}
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
                  index === 0 && (
                    <ReactRouterDOM.Route
                      key={index}
                      render={() => <Component />}
                    />
                  )
              )
        }
      </ReactRouterDOM.Switch>
    </div>
  );
};

export default AuthScreens;
