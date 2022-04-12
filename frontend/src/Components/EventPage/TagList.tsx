import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import Tag from 'Components/Tag';
import * as React from 'react';
import './TagList.scss';
import { Plus } from 'react-bootstrap-icons';
import { useState } from 'react';


export type TagListProps = {
    tags: Array<string>,
    isEditable: boolean,
}

export default function TagList(props: TagListProps) {
    const [tags, setTags] = useState(props.tags);

    function onTagClose(id: number) {
        setTags(tags.filter(function (value, index, arr) {
            return index !== id;
        }));
    }

    return (
        <div className='tagListBox'>
            <ul className='tagListUL'>
                {tags.map((value, index) => { return (<li key={index}><Tag text={value} isCloseable={props.isEditable} id={index} onCloseAction={onTagClose} /></li>) })}
            </ul>
            {props.isEditable && <Plus /> && <SimpleEditableInput id='tagInput' />}
        </div>
    )
}
