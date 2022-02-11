/**
 * Auth config for Auth context hoc
 * @param { boolean } isLoggedIn - is the user logged in or not
 * @param { string } userRole - string which defines the role of currently logged user
 */
export interface AuthConfig {
  isLoggedIn: boolean;
  userRole: string;
}

/**
 * Auth state object which can accept any parameters
 */
export type AuthState = { [key: string]: () => void } | { [key: string]: any };

export interface AuthProviderParams {
  children: React.ReactNode;
  config: AuthConfig;
  state?: AuthState;
}

/**
 * Path Params interface defines the common interface for both
 * public and private params
 */
interface PathParams {
  key?: string | number;
  name: string | ""; // "" is only for not found
  path: string | ""; // "" is only for not found
  component: React.ComponentType<any>;
  exact?: boolean;
  visible?: boolean;
  props?: any;
}

export interface PublicPathParams extends PathParams {
  subPaths?: PublicPathParams[];
  nestedPaths?: PublicPathParams[];
  restricted: boolean | null; // null is for not found
}

export interface PrivatePathParams extends PathParams {
  subPaths?: PrivatePathParams[];
  nestedPaths?: PrivatePathParams[];
}

export type PublicPath = PublicPathParams[];
export type PrivatePath = PrivatePathParams[];

export type UserRole = { [role: string]: { access: string[] } };

export interface NavigationConfigParams {
  publicPaths: PublicPath;
  privatePaths: PrivatePath;
  userRoles: UserRole;
  routerType?: "browser" | "hash";
}

export interface NavigationProviderParams extends NavigationConfigParams {
  children: React.ReactNode;
}

export type publicReturnType = {
  [key: string]: { name: string; path: string; props: any; active: boolean };
};
