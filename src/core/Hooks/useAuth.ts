import { useContext } from "react";
import { stateType, DefaultAuthConfigParams } from "../Types";
import { AuthContext } from "../Context";

/**
 * Hook which provides all the authentication properties
 * @returns an object with config and state props passed to Auth.Provider HOC.
 */
export function useAuth() {
  return useContext(AuthContext) as DefaultAuthConfigParams & stateType;
}
