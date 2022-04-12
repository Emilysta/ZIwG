import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import Tag from 'Components/Tag';
import * as React from 'react';
import './TagList.scss';
import { Plus, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { useState } from 'react';

export type TagListProps = {
    tags: Array<string>,
    isEditable: boolean,
}

export default function TagList(props: TagListProps) {
    const [tags, setTags] = useState(props.tags);
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(props.isEditable);
    const [isTagInputVisible, setIsTagInputVisible] = useState(false);
    const [tagInputValue, setTagInputValue] = useState("");
    const [tagPage, setTagPage] = useState(0);

    function onTagClose(id: number) {
        setTags(tags.filter(function (value, index, arr) {
            return index !== id;
        }));
    }

    function showInput() {
        setIsAddButtonVisible(false);
        setIsTagInputVisible(true);
    }

    function tagInputChange(id: string, value: string) {
        setTagInputValue(value);
    }

    function tagInputKeyDetection(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter') //enter
        {
            let arr = tags;
            arr.push(tagInputValue);
            setTags(arr);
            setTagPage(Math.floor((arr.length - 1) / 3));
        }
    }

    function tagIndexLeft() {
        let x = tagPage - 1;
        if (x >= 0)
            setTagPage(x);
    }

    function tagIndexRight() {
        let x = tagPage + 1;
        if (x <= ((tags.length - 1) / 3))
            setTagPage(x);
    }

    return (
        <div className='tagListBox'>
            <ChevronLeft onClick={tagIndexLeft} />
            <ul className='tagListUL'>
                {
                    tags.slice(tagPage * 3, (tagPage * 3) + 3).map((value, index) => { return (<li key={index} className='tagListLI'><Tag text={value} isCloseable={props.isEditable} id={index} onCloseAction={onTagClose} /></li>) })}
            </ul>
            <ChevronRight onClick={tagIndexRight} />
            {props.isEditable && isAddButtonVisible && <Plus className='addTagButton' onClick={showInput} />}
            {props.isEditable && isTagInputVisible && <SimpleEditableInput id='tagInput' inputClassName='tagInput' onChangeAction={tagInputChange} onKeyDownAction={tagInputKeyDetection} isClearOnEnter={true} />}
        </div>
    )
}
