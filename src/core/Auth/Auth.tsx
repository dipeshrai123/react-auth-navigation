import * as React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

import { AuthProviderParams } from "../Types";
import { AuthContext, NavigationContext } from "../Context";
import AuthScreens from "./AuthScreens";

/**
 * Higher Order Component which wraps overall component tree
 * Auth
 * @state prop accepts anything and acts as a context for overall app, can be accessed with useAuth() hook
 * @config prop accepts an object with isLoggedIn and userRole keys, can be accessed with useAuth() hook
 */
function Auth(props: AuthProviderParams) {
  const { children, config, state } = props;
  const { routerType } = React.useContext(NavigationContext);
  return (
    <AuthContext.Provider value={{ ...config, ...state }}>
      {routerType === "hash" ? (
        <HashRouter>{children}</HashRouter>
      ) : (
        <BrowserRouter>{children}</BrowserRouter>
      )}
    </AuthContext.Provider>
  );
}

Auth.Screens = AuthScreens;
export default Auth;
