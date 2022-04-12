import * as React from 'react';
import './SimpleEditableInput.scss'

type SimpleEditableInputProps = {
    id: string,
    inputClassName?: string,
    defaultValue?: string,
    inputDescription?: string,
    maxChars?: number,
    minChars?: number,
    readonly?: boolean,
    required?: boolean,
    rows?: number,
    onChangeAction?: (id: string, value: string) => void,
    validationAction?: () => string,
}
export default function SimpleEditableInput(props: SimpleEditableInputProps) {
    const [validationText, setValidationText] = React.useState("");

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (props.validationAction) {
            setValidationText(props.validationAction());
        }
        if (props.onChangeAction) {
            props.onChangeAction(props.id, event.target.value);
        }
    }

    return (
        <div className='simpleInputBox'>
            {props.inputDescription !== null && <p className='simpleInputDesc'>{props.inputDescription}</p>}
            <textarea className={`${props.inputClassName ?? ''} simpleInput`} defaultValue={props.defaultValue} readOnly={props.readonly} maxLength={props.maxChars} required={props.required}
                onChange={event => { onChange(event) }} rows={props.rows ?? 1} minLength={props.minChars} />
            {validationText.length > 0 && <p className='simpleInputError'>{validationText}</p>}
        </div>
    )


}
