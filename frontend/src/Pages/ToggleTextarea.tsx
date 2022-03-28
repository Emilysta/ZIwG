import * as React from 'react';
import ContentEditable from 'react-contenteditable';

type State = {
    value: string
}

type Props = {
    disabled?: boolean,
    onValueChange?: (state: State) => void
}

export default function ToggleTextarea(props: Props) {
    const [state, setState]: [State, any] = React.useState({value: ''})

    const onChange = (e: React.FormEvent<HTMLSpanElement>) => {
    }

    const onBlur = (e: React.FormEvent<HTMLSpanElement>) => {
        setState({ value: e.currentTarget.innerText })
        props.onValueChange(state)
    }

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
