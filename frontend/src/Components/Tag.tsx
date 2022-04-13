import * as React from 'react';
import "./Tag.scss";
import { XCircleFill } from 'react-bootstrap-icons';

type TagProps = {
    text: string,
    isCloseable: boolean,
    id?: number,
    onCloseAction?: (key: number) => void,
}

export default function Tag(props: TagProps) {

    function onTagClose() {
        if (props.onCloseAction)
            props.onCloseAction(props.id);
    }
    return (
        <div className='tagBox'>
            {props.text}
            <XCircleFill className='tagClose' onClick={onTagClose} />
        </div>
    )
}
