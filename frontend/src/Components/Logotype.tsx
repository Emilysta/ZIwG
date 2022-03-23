import * as React from "react";
import { Logo } from "./Logo";


export class Logotype extends React.Component {
  render(): React.ReactNode {
    return <div className='Logotype'>
      <Logo />
      <a>EventColab</a>
    </div>;
  }
}
