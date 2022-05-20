import * as React from 'react';
import { useCallback, useRef } from 'react';
import ZiwgSkeleton from 'Utils/Skeletons';
import './SimpleEditableInput.scss';
import { debounce } from 'lodash';

type SimpleEditableInputProps = {
    id: string,
    inputClassName?: string,
    defaultValue?: string,
    inputDescription?: string,
    maxChars?: number,
    minChars?: number,
    isReadOnly?: boolean,
    required?: boolean,
    rows?: number,
    isClearOnEnter?: boolean,
    onChangeAction?: (id: string, value: any) => void,
    validationAction?: (value: string) => string,
    onKeyDownAction?: (event: React.KeyboardEvent<HTMLTextAreaElement>, currentValue: string) => void,
    isLoading?: boolean,
    isNumber?: boolean
}
export default function SimpleEditableInput(props: SimpleEditableInputProps) {
    const [validationText, setValidationText] = React.useState("");
    const [text, setText] = React.useState<string>();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const delayCallSetValues = useCallback(debounce(value => callChangeAction(value), 2000), []);

    React.useEffect(() => {
        if (props.defaultValue && textAreaRef.current.value !== props.defaultValue) {
            setText(props.defaultValue)
        }
    }, [props.defaultValue])

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let validation: string = '';

        if (props.validationAction) {
            validation = props.validationAction(event.target.value);
            setValidationText(validation);
        }
        if (validation === '') {
            setText(event.target.value);
            if (props.onChangeAction)
                delayCallSetValues(event.target.value);
        }
    }

    function callChangeAction(newValue: string) {
        if (props.onChangeAction) {
            props.onChangeAction(props.id, props.isNumber ? parseFloat(newValue) : newValue);
        }
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (props.onKeyDownAction) {
            props.onKeyDownAction(event, textAreaRef.current.value);
        }
        if (props.isClearOnEnter && event.key === 'Enter') {
            textAreaRef.current.value = "";
        }
    }
    if (props.isLoading)
        return (<div className='simpleInputBox'>{props.inputDescription && <p className='simpleInputDesc'>{props.inputDescription}</p>}<ZiwgSkeleton count={props.rows} /></div>)
    else
        return (
            <div className='simpleInputBox'>
                {props.inputDescription && <p className='simpleInputDesc'>{props.inputDescription}</p>}

                <textarea className={`${props.inputClassName ?? ''} simpleInput`} readOnly={props.isReadOnly} maxLength={props.maxChars} value={text} required={props.required} onKeyDown={e => { onKeyDown(e) }} onChange={event => { onChange(event) }} rows={props.rows ?? 1} minLength={props.minChars} ref={textAreaRef} />

                {validationText.length > 0 && <p className='simpleInputError'>{validationText}</p>}
            </div>
        )


}
