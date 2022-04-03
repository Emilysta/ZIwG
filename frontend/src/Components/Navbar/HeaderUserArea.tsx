import * as React from "react";
import { MenuItem } from "./MenuItem";
import { HighlightedMenuItem } from "./HighlightedMenuItem";

export function HeaderUserArea() {
  const logged = Math.random() < 0.5;

  if (logged)
    return <MenuItem>
      <img />
      Logout
    </MenuItem>;

  else
    return <>
      <MenuItem>Log In</MenuItem>
      <HighlightedMenuItem>Sign In</HighlightedMenuItem>
    </>;
}
