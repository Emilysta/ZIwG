import * as React from "react";
import { Validator } from "Utils/TextInputValidation";
import './TextInput.scss'

export type TextInputProps = {
  placeHolder: string,
  name?: string,
  overrideType?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  validate?: Validator
}

export function TextInput(props: TextInputProps) {
  const [value, setValue]: [string, any] = React.useState('');
  const [error, setError]: [string, any] = React.useState('');

  if (props.validate)
    props.validate.injectSource(() => value)

  React.useEffect(() => {
    if (value.length > 0)
      setError(props.validate?.validate())
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.currentTarget.value;
    setValue(currentValue)
    if (props.onChange)
      props.onChange(event)
  }

  const renderInput = () => {
    return <div className="inputBox">
      <input type={props.overrideType ?? "text"} value={value} placeholder={props.placeHolder} onChange={handleChange} />
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
