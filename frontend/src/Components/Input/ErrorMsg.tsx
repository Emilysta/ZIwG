import * as React from "react";
import './ErrorMsg.scss'

export function ErrorMsg(props: any) {
  return <p className={`inputError ${props.className ? props.className : ''}`}>{props.children}</p>;
}
