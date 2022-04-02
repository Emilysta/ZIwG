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

export function TextInput(props: TextInputProps) {

  const [state, setState]: [TextInputState, any] = React.useState({ value: '', error: '' })

  const validation = (value: string) => {
    if (props.validate)
      for (let fun of props.validate) {
        let val = fun(value)
        if (val != null)
          return val
      }
    return null
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.currentTarget.value;
    setState({
      ...state,
      value: currentValue,
      error: validation(currentValue)
    })
    if (props.onChange)
      props.onChange(event)
  }

  const renderInput = () => {
    return <div className="inputBox">
      <input type={props.overrideType ?? "text"} value={state.value} placeholder={props.placeHolder} onChange={handleChange} />
      <p className="inputError">{state.error}</p>
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
