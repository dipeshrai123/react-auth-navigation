import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../Modules";
import { PublicPathParams, PrivatePathParams } from "../Types";
import { NavigationContext } from "../Context";
import { getParsedPaths } from "../Utils";

/**
 * Higher Order Component which wraps overall component tree
 * Auth.Screens
 * @path prop accepts a string or null, null represents "/" while any other string path for nested navigation
 */
function AuthScreens({ path }: { path?: string }) {
  const { publicPaths: PUBLIC_PATHS, privatePaths: PRIVATE_PATHS } =
    React.useContext(NavigationContext);

  if (!!path) {
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

    return (
      <Switch>
        {
          // PUBLIC ROUTES
          filteredNestedPublicRoutes.length &&
            filteredNestedPublicRoutes
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
                    <PublicRoute
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
          filteredNestedPrivateRoutes.length &&
            filteredNestedPrivateRoutes.map(
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
                  <PrivateRoute
                    key={index}
                    path={path}
                    component={component}
                    exact={_exact}
                  />
                );
              }
            )
        }
      </Switch>
    );
  } else {
    return (
      <Switch>
        {
          // PUBLIC ROUTES
          PUBLIC_PATHS.length &&
            PUBLIC_PATHS.filter(({ path }: PublicPathParams) => path !== null) // Other than Not Found Page
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
                    <PublicRoute
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
          PRIVATE_PATHS.length &&
            PRIVATE_PATHS.map(
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
                  <PrivateRoute
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
          PUBLIC_PATHS.length &&
            PUBLIC_PATHS.filter(
              ({ path }: PublicPathParams) => path === null
            ).map(
              ({ component: Component }: PublicPathParams, index: number) =>
                index === 0 && (
                  <Route key={index} render={() => <Component />} />
                )
            )
        }
      </Switch>
    );
  }
}

export default AuthScreens;
