import * as React from 'react';

type State = {
    value: string
}

type ToggleTextareaProps = {
    disabled?: boolean,
    value?: string,
    onValueChange?: (event: React.FormEvent<HTMLSpanElement>) => void
}

export function ToggleTextarea(props: ToggleTextareaProps) {
    const span: React.MutableRefObject<HTMLElement> = React.useRef()

    const [state, setState]: [State, any] = React.useState()

    const onChange = (e: React.FormEvent<HTMLSpanElement>) => {
        setState({value: span.current.innerText})
        console.log(state)
    }

    return (
        <span
            ref={span}
            className={`textarea ${props.disabled ? null : "editable"}`}
            role="textbox"
            contentEditable={!props.disabled}
            onInput={onChange}
        />
    );
}
