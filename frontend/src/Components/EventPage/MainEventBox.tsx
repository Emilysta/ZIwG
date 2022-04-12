import * as React from 'react';
import './MainEventBox.scss';
import { Images } from 'react-bootstrap-icons';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import { useState } from 'react';
import TagList from './TagList';

type MainEventBoxProps = {
    className?: string,
    isInEditing: boolean,
}

export default function MainEventBox(props: MainEventBoxProps) {
    const [values, setValues] = useState({});

    const handleInputChange = (inputId: string, value: string) => {
        setValues({ ...values, [inputId]: value });
    };
    return (
        <div className='mainEventBox ${props.className}'>
            <div className='galleryBox'>
                <div className='galleryIconWithText'>
                    <Images className='galleryIcon' />
                    <p>Drop images or click</p>
                </div>
            </div>
            <div className='inputEventStack'>
                <SimpleEditableInput defaultValue='Event Name' id={"eventName"} onChangeAction={handleInputChange} inputDescription={"Event Name"} inputClassName='eventNameInput' />

                <TagList tags={["xd", "meh", "buu"]} isEditable={false} />

                <SimpleEditableInput defaultValue='Description' id={"eventName"} onChangeAction={handleInputChange} inputDescription={"Description"} inputClassName='descriptionInput' rows={3} maxChars={1000} />
            </div>
        </div>
    )
}
