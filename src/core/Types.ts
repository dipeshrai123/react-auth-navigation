export interface DefaultAuthConfigParams {
  isLoggedIn: boolean;
  userRole: string;
}

export type stateType = { [key: string]: () => void } | { [key: string]: any };

export interface AuthProviderParams {
  children: React.ReactNode;
  config: DefaultAuthConfigParams;
  state?: stateType;
}

export interface PublicPathParams {
  key?: string | number;
  name: string;
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  visible?: boolean;
  restricted: boolean;
  subPaths?: PublicPathParams[];
  nestedPaths?: PublicPathParams[];
  props?: any;
}

export interface PrivatePathParams {
  key?: string | number;
  name: string;
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  visible?: boolean;
  subPaths?: PrivatePathParams[];
  nestedPaths?: PrivatePathParams[];
  props?: any;
}

export type UserRoleParams = { [role: string]: { access: string[] } };

export interface NavigationConfigParams {
  publicPaths: PublicPathParams[];
  privatePaths: PrivatePathParams[];
  userRoles: UserRoleParams;
  routerType?: "browser" | "hash";
}

export interface NavigationProviderParams extends NavigationConfigParams {
  children: React.ReactNode;
}

export type publicReturnType = {
  [key: string]: { name: string; path: string; props: any; active: boolean };
};
