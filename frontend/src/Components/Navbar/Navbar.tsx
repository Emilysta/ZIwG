import * as React from "react";
import './Navbar.css'
import { Logotype } from "../Logotype";
import { VerticalMenu } from "./VerticalMenu";


export class Navbar extends React.Component {
  render() {
    return <div className='HeadBar'>
      <nav>
        <Logotype />
        <VerticalMenu />
      </nav>
    </div>;
  }
}
