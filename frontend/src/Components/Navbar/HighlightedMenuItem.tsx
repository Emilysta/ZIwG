import * as React from "react";


export class HighlightedMenuItem extends React.Component {
  render(): React.ReactNode {
    return <ul><a className='highlighted'>{this.props.children}</a></ul>;
  }
}
