import { useContext } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  matchPath,
} from "react-router-dom";
import { stateType, DefaultAuthConfigParams, publicReturnType } from "./Types";
import { AuthContext, NavigationContext } from "./Context";
import { getParsedUserRole, canUserAccess, getParsedPaths } from "./Utils";

/**
 * Hook which provides all the authentication properties
 * @returns an object with config and state props passed to Auth.Provider HOC.
 */
export const useAuth = () => {
  return useContext(AuthContext) as DefaultAuthConfigParams & stateType;
};

/**
 * Hook for getting all navigation properties, methods and routes
 * @returns Object with navigation, history, location and params
 */
export const useNavigation = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const { isLoggedIn, userRole } = useContext(AuthContext);
  const {
    origPublicPaths: PUBLIC_PATHS,
    origPrivatePaths: PRIVATE_PATHS,
    userRoles: USER_ROLES,
  } = useContext(NavigationContext);

  // FOR FLATTING NESTED PATHS
  const parser = getParsedPaths("nestedPaths");
  const parsedPublicPaths = parser(PUBLIC_PATHS);
  const parsedPrivatePaths = parser(PRIVATE_PATHS);

  const userRolesAccessPaths: Array<string> = USER_ROLES[userRole].access;
  const parsedUserRolesAccessPaths: Array<string> =
    getParsedUserRole(userRolesAccessPaths);

  const filteredPublicRoutes = parsedPublicPaths.filter(
    ({
      path,
      restricted,
      visible = true,
    }: {
      path: string;
      restricted: boolean;
      visible: boolean;
    }) => {
      const canAccess =
        userRole && canUserAccess(parsedUserRolesAccessPaths, path);

      return restricted && isLoggedIn ? false : visible && canAccess;
    }
  );

  const publicRoutes: publicReturnType = {};
  filteredPublicRoutes.forEach(
    ({
      key,
      name,
      path,
      props = null,
    }: {
      key: string;
      name: string;
      path: string;
      props: any;
    }) => {
      const active = !!matchPath(location.pathname, path);
      const routeKey = key || name;
      publicRoutes[routeKey] = Object.assign({}, { name, path, active, props });
    }
  );

  const filteredPrivateRoutes = parsedPrivatePaths.filter(
    ({ path, visible = true }: { path: string; visible: boolean }) => {
      const canAccess =
        userRole && canUserAccess(parsedUserRolesAccessPaths, path);

      return isLoggedIn ? visible && canAccess : false;
    }
  );

  const privateRoutes: publicReturnType = {};
  filteredPrivateRoutes.forEach(
    ({
      key,
      name,
      path,
      props = null,
    }: {
      key: string;
      name: string;
      path: string;
      props: any;
    }) => {
      const active = !!matchPath(location.pathname, path);
      const routeKey = key || name;
      privateRoutes[routeKey] = Object.assign(
        {},
        { name, path, active, props }
      );
    }
  );

  const combinedRoutes = { ...publicRoutes, ...privateRoutes };

  return {
    navigation: {
      routes: combinedRoutes,
      navigate: (path: string | object) => history.push(path),
      goBack: () => history.goBack(),
      goForward: () => history.goForward(),
    },
    history,
    location,
    params,
  };
};

/**
 * Get query params for current url location
 * @param queryStr Query params string can be pass which overrides the current location query
 * @returns Object with key value pair
 */
export const useQuery = (queryStr = null) => {
  const { location } = useNavigation();
  const queryParams = new URLSearchParams(queryStr ?? location.search);

  const resultObject = {};
  for (let [key, value] of queryParams.entries()) {
    resultObject[key] = value;
  }

  return resultObject;
};
