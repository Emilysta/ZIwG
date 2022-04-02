import * as React from "react";
import { ValidationFun } from "Utils/TextInputValidation";
import './TextInput.scss'

export type TextInputProps = {
  placeHolder: string,
  name?: string,
  overrideType?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  validate?: ValidationFun[]
}

export type TextInputState = { value: string, error: string }

export class TextInput extends React.Component<TextInputProps, TextInputState> {
  get value() {
    return this.state.value
  }

  constructor(props: any) {
    super(props);
    this.state = { value: "", error: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  validation(value: string) {
    for (let fun of this.props.validate) {
      let val = fun(value)
      if (val != null)
        return val
    }
    return null
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = event.currentTarget.value;
    this.setState({
      ...this.state,
      value: currentValue,
      error: this.validation(currentValue)
    })
    if (this.props.onChange)
      this.props.onChange(event)
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
    return <div className="inputBox">
      <input type={this.props.overrideType ?? "text"} value={this.state.value} placeholder={this.props.placeHolder} onChange={this.handleChange} />
      <p className="inputError">{this.state.error}</p>
    </div>
  }
}
