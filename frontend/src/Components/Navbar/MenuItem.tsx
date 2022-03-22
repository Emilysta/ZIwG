import * as React from "react";


export class MenuItem extends React.Component {
  render(): React.ReactNode {
    return <ul><a>{this.props.children}</a></ul>;
  }
}
