import * as React from 'react';
import { useRef } from 'react';
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
    isClearOnEnter?: boolean,
    onChangeAction?: (id: string, value: string) => void,
    validationAction?: () => string,
    onKeyDownAction?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void,
}
export default function SimpleEditableInput(props: SimpleEditableInputProps) {
    const [validationText, setValidationText] = React.useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (props.validationAction) {
            setValidationText(props.validationAction());
        }
        if (props.onChangeAction) {
            props.onChangeAction(props.id, event.target.value);
        }
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (props.onKeyDownAction) {
            props.onKeyDownAction(event);
        }
        if (props.isClearOnEnter && event.key === 'Enter') {
            textAreaRef.current.value = "";
        }
    }

    return (
        <div className='simpleInputBox'>
            {props.inputDescription && <p className='simpleInputDesc'>{props.inputDescription}</p>}

            <textarea className={`${props.inputClassName ?? ''} simpleInput`} defaultValue={props.defaultValue} readOnly={props.readonly} maxLength={props.maxChars} required={props.required} onKeyDown={e => { onKeyDown(e) }} onChange={event => { onChange(event) }} rows={props.rows ?? 1} minLength={props.minChars} ref={textAreaRef}
            />

            {validationText.length > 0 && <p className='simpleInputError'>{validationText}</p>}
        </div>
    )


}
