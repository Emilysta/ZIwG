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
import { EventData } from 'Pages/UserAddEventPage';

type MainEventBoxProps = {
    className?: string,
    isReadOnly?: boolean,
    values: EventData,
    onValuesChange?: (id: string, value: any) => void,
}

export default function MainEventBox(props: MainEventBoxProps) {
    const [values, setValues] = useState<EventData>(props.values);
    const [popupOpened, setPopupOpened] = useState(false);

    const handleInputChange = (inputId: string, value: string) => {
        setValues({ ...values, [inputId]: value });
        if (props.onValuesChange)
            props.onValuesChange(inputId, value);
    };

    function pickCalendarDate(updateDate: [Date, Date]) {
        setValues((prev) => { prev.StartDate = updateDate[0]; return prev; });
        setValues((prev) => { prev.EndDate = updateDate[1]; return prev; });
        if (props.onValuesChange) {
            props.onValuesChange('StartDate', updateDate[0]);
            props.onValuesChange('EndDate', updateDate[1]);
        }
    }


    function onDropBoxClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        setPopupOpened(true)
    }

    function onGalleryPopupClose(state: boolean, images: string[]) {
        setValues({ ...values, Images: images });
        if (props.onValuesChange) {
            props.onValuesChange('Images', images);
            setPopupOpened(false);
        }
    }

    return (
        <div className={`mainEventBox ${props.className}`}>
            <div className='galleryBox'>
                <div className='galleryIconWithText' onClick={(event) => onDropBoxClick(event)}>
                    <Images className='galleryIcon' />
                    <p>Drop images or click</p>
                </div>
            </div>

            <GaleryPopup images={values.Images} open={popupOpened} onClose={onGalleryPopupClose} />
            <div className='inputEventStack'>
                <SimpleEditableInput defaultValue={values.EventName} id={"EventName"} onChangeAction={handleInputChange} inputDescription={"Event Name"} inputClassName='eventNameInput' readonly={props.isReadOnly} />

                <TagList tags={values.Tags} isEditable={props.isReadOnly} />

                <div>
                    <p className='descText'>Location</p>
                    <ButtonWithIcon text="Pick place" icon={<PinMapFill fill='white' />} style={ButtonStyle.Filled} isActive={true} />
                </div>

                <div>
                    <p className='descText'>Start date - end date</p>
                    <EventDatePicker onDateChange={pickCalendarDate} isReadOnly={props.isReadOnly} startDate={values.StartDate} endDate={values.EndDate} />
                </div>

                <SimpleEditableInput defaultValue={values.Description} id={"Description"} onChangeAction={handleInputChange} inputDescription={"Description"} inputClassName='descriptionInput' rows={3} maxChars={1000} readonly={props.isReadOnly} />
            </div>
        </div>
    )
}
