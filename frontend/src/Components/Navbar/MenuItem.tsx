import * as React from "react";

export function MenuItem(props: { children?: string | React.ReactNode }) {
  return <ul><a>{props.children}</a></ul>;
}
