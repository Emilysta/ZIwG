import * as React from "react";

export function HighlightedMenuItem(props: { children?: string | React.ReactNode }) {
  return <ul><a className='highlighted'>{props.children}</a></ul>;
}
