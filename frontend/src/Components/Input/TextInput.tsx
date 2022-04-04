import * as React from "react";
import { Validator } from "Utils/Validator";
import './TextInput.scss'

export type TextInputProps = {
  placeHolder: string,
  defaultValue?: string
  name?: string,
  overrideType?: string,
  onChange?: (value: string) => void,
  validate?: Validator
}

export function TextInput(props: TextInputProps) {
  const [value, setValue]: [string, any] = React.useState('');
  const [error, setError]: [string, any] = React.useState('');

  if (props.validate)
    props.validate.injectSource(() => value)

  React.useEffect(() => {
    if (props.onChange) props.onChange(value)
    if (value && value.length > 0) setError(props.validate?.validate())
  }, [value])

  React.useEffect(() => props.defaultValue && setValue(props.defaultValue), [props.defaultValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

  const renderInput = () => {
    return <div className="inputBox">
      <input type={props.overrideType ?? "text"} defaultValue={value} placeholder={props.placeHolder} onChange={handleChange} />
      <p className="inputError">{error}</p>
    </div>
  }

  if (props.name)
    return <>
      <label>{props.name}</label>
      {renderInput()}
    </>
  else
    return renderInput()
}
