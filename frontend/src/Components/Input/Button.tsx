import * as React from "react";

export enum ButtonStateEnum {
  Inactive,
  Active
}

type ButtonProps = { type: string, value: string }
type ButtonState = { state: ButtonStateEnum }

export class StateButton extends React.Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props)
    this.state = { state: ButtonStateEnum.Inactive }
  }

  render(): React.ReactNode {
    return <input type={this.props.type} value={this.props.value} className={this.getClass()} />;
  }

  private getClass(): string {
    return ButtonStateEnum[this.state.state];
  }
}

