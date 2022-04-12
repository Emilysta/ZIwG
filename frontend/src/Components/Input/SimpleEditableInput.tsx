import * as React from 'react';
import './SimpleEditableInput.scss'

type SimpleEditableInputProps = {
    id: string,
    className?: string,
    defaultValue?: string,
    inputDescription?: string,
    readonly?: boolean,
    onChangeAction?: (id: string, value: string) => void,
    validationAction?: () => void,
}
export default function SimpleEditableInput(props: SimpleEditableInputProps) {

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (props.validationAction !== null) {
            props.validationAction();
        }
        if (props.onChangeAction !== null) {
            props.onChangeAction(props.id, event.target.value);
        }
    }

    if (props.inputDescription) {
        return (
            <div>
                <p>{props.inputDescription}</p>
                <input className='simpleInput' defaultValue={props.defaultValue} readOnly={props.readonly}
                    onChange={event => { onChange(event) }}></input>
            </div>
        )
    }
    else {
        return (
            <input className='simpleInput' defaultValue={props.defaultValue} readOnly={props.readonly}
                onChange={event => { onChange(event) }}></input>
        )
    }
}
