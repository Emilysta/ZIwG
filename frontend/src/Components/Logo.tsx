import logo from '../images/logo.svg';
import * as React from "react";

export class Logo extends React.Component {
  render(): React.ReactNode {
    return <img src={logo} className="Logo" />;
  }
}
