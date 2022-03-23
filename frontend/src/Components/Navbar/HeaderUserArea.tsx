import * as React from "react";
import { MenuItem } from "./MenuItem";
import { HighlightedMenuItem } from "./HighlightedMenuItem";

export class HeaderUserArea extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { logged: Math.random() < 0.5 };
  }

  render(): React.ReactNode {
    if (this.state.logged)
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
}
