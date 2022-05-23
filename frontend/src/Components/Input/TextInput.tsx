import * as React from "react";
import { Validator } from "Utils/Validator";
import { ErrorMsg } from "./ErrorMsg";
import './TextInput.scss'

export type TextInputProps = {
  placeHolder: string,
  defaultValue?: string
  name?: string,
  overrideType?: string,
  onChange?: (value: string) => void,
  validate?: Validator,
  required?: boolean,
  autoComplete?: string,
  additionalError?: string,
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

  React.useEffect(() => {
    if (props.additionalError) {
      if (error === '')
        setError(props.additionalError);
    }
  }, [props.additionalError])

  React.useEffect(() => props.defaultValue && setValue(props.defaultValue), [props.defaultValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

  const renderInput = () => {
    return <div className="inputBox" >
      <input type={props.overrideType ?? "text"} defaultValue={value} placeholder={props.placeHolder} onChange={handleChange} autoComplete={props.autoComplete} required={props.required} />
      {<ErrorMsg className={'textInputError'}>{error}</ErrorMsg>}
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
