import * as React from "react";
import '../../Assets/Input.css'

export type TextInputProps = {
  placeHolder: string,
  name?: string,
  overrideType?: string,
  onChange?: any
}
export type TextInputState = { value: string }

export class TextInput extends React.Component<TextInputProps, TextInputState> {
  get value() {
    return this.state.value
  }

  constructor(props: any) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const currentValue = event.currentTarget.value;
    this.setState({ value: currentValue });
    if (this.props.onChange)
      this.props.onChange(this)
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
