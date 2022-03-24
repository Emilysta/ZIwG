import * as React from "react";
import './TextInput.css'

export type TextInputProps = { placeHolder: string, name?: string, overrideType?: string }
export type TextInputState = { value: string }

export class TextInput extends React.Component<TextInputProps, TextInputState> {
  constructor(props: any) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const currentValue = event.currentTarget.value;
    this.setState({ value: currentValue });
  }

  render(): React.ReactNode {
    if (this.props.name)
      return <>
        <label>{this.props.name}</label>
        {this.renderInput()}
      </>;

    else
      return this.renderInput();
  }

  private renderInput(): React.ReactNode {
    return <input type={this.props.overrideType ?? "text"} value={this.state.value} placeholder={this.props.placeHolder} onChange={this.handleChange} />;
  }
}
