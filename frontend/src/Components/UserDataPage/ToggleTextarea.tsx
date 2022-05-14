import * as React from 'react';
import ContentEditable from 'react-contenteditable';

type State = {
    name: string
    value: string
}

type Props = {
    value?: string
    name?: string
    disabled?: boolean
    onChange?: (state: any) => void
    maxLength?: number
}

export default function ToggleTextarea(props: Props) {
    const [state, setState]: [State, any] = React.useState({
        value: props.value,
        name: props.name
    })

    const onChange = (e: React.FormEvent<HTMLSpanElement>) => {
        let value: string = e.currentTarget.innerText

        setState({
            ...state,
            value: value.substring(0, props.maxLength)
        })

        props.onChange({
            target: {
                name: state.name,
                value: state.value
            }
        })
    }

    const onBlur = (e: React.FormEvent<HTMLSpanElement>) => { }

    return (
        <ContentEditable
            html={state.value}
            className={`textarea ${props.disabled ? null : "editable"}`}
            disabled={props.disabled}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}
