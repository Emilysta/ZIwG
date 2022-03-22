import * as React from "react";
import { HeaderUserArea } from './HeaderUserArea';
import { MenuItem } from './MenuItem';


export class VerticalMenu extends React.Component {
  render(): React.ReactNode {
    return <li className='VerticalMenu'>
      <MenuItem>Events</MenuItem>
      <HeaderUserArea />
    </li>;
  }
}
