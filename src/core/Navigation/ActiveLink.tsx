import * as React from "react";
import {
  NavLink as InternalNavLink,
  NavLinkProps as InternalNavLinkProps,
} from "react-router-dom";

/**
 * ActiveLink for highlighting currently active link
 */
function ActiveLink(
  props: React.PropsWithoutRef<InternalNavLinkProps> &
    React.RefAttributes<HTMLAnchorElement>
) {
  return <InternalNavLink {...props} />;
}

export default ActiveLink;
