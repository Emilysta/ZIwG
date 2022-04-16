import * as React from 'react';
import './MainEventBox.scss';
import { Images } from 'react-bootstrap-icons';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import { useState } from 'react';
import TagList from './TagList';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import { PinMapFill } from 'react-bootstrap-icons';
import EventDatePicker from 'Components/DatePicker';
import { GaleryPopup } from 'Components/GaleryPopup';

type MainEventBoxProps = {
    className?: string,
    isReadOnly?: boolean,
}

export default function MainEventBox(props: MainEventBoxProps) {
    const [values, setValues] = useState({});
    const [popupOpened, setPopupOpened] = useState(false);

    const handleInputChange = (inputId: string, value: string) => {
        setValues({ ...values, [inputId]: value });
    };

    function pickCalendarDate(updateDate: [Date, Date]) {
        setValues({ ...values, ['startDate']: updateDate[0] });
        setValues({ ...values, ['endDate']: updateDate[1] });
    }

    function onDropBoxClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        setPopupOpened(true)
    }

    return (
        <div className={`mainEventBox ${props.className}`}>
            <div className='galleryBox'>
                <div className='galleryIconWithText' onClick={(event) => onDropBoxClick(event)}>
                    <Images className='galleryIcon' />
                    <p>Drop images or click</p>
                </div>
            </div>
            <GaleryPopup open={popupOpened} onClose={() => setPopupOpened(false)} />
            <div className='inputEventStack'>
                <SimpleEditableInput defaultValue='Event Name' id={"eventName"} onChangeAction={handleInputChange} inputDescription={"Event Name"} inputClassName='eventNameInput' readonly={props.isReadOnly} />

                <TagList tags={["test", "test 2", "test 3"]} isEditable={props.isReadOnly} />

                <div>
                    <p className='descText'>Location</p>
                    <ButtonWithIcon text="Pick place" icon={<PinMapFill fill='white' />} style={ButtonStyle.Filled} isActive={true} />
                </div>

                <div>
                    <p className='descText'>Start date - end date</p>
                    <EventDatePicker onDateChange={pickCalendarDate} isReadOnly={props.isReadOnly} />
                </div>

                <SimpleEditableInput defaultValue='Description' id={"eventName"} onChangeAction={handleInputChange} inputDescription={"Description"} inputClassName='descriptionInput' rows={3} maxChars={1000} readonly={props.isReadOnly} />
            </div>
        </div>
    )
}
