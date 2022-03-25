import * as React from "react";
import './TextInput.css'

export type TextInputProps = {
  placeHolder: string,
  name?: string,
  overrideType?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  checkIfError?: (inputValue: string) => string
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

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = event.currentTarget.value;
    this.setState({ value: currentValue });
    if (this.props.onChange)
      this.props.onChange(event)
    if (this.props.checkIfError) {
      this.setState({ error: this.props.checkIfError(this.state.value) })
    }
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
      {this.state.error && <p className="inputError">{this.state.error}</p>}
    </div>
  }
}
