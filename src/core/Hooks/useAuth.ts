import { useContext } from "react";
import { AuthState, AuthConfig } from "../Types";
import { AuthContext } from "../Context";

/**
 * Hook which provides all the authentication properties
 * @returns an object with config and state props passed to Auth HOC.
 */
export function useAuth() {
  return useContext(AuthContext) as AuthConfig & AuthState;
}
