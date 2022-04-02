import * as React from "react";
import './StateButton.scss'

export enum ButtonStateEnum {
  Inactive,
  Active
}

type ButtonProps = { type: string, value: string, state?: ButtonStateEnum }

export function StateButton(props: ButtonProps) {
  return <input type={props.type} value={props.value} className={ButtonStateEnum[props.state]} />;
}
