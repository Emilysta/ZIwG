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
import { EventData } from 'Utils/EventData';
import LocationPicker from 'Components/LocationPicker';
import Popup from 'Components/Popup';
import { useModal } from 'Utils/Hooks';

type MainEventBoxProps = {
    className?: string,
    isReadOnly?: boolean,
    values: Partial<EventData>,
    onValuesChange?: (id: string, value: any) => void,
    isLoading?: boolean,
}

export default function MainEventBox(props: MainEventBoxProps) {
    const [values, setValues] = useState<Partial<EventData>>(props.values);
    const [popupOpened, setPopupOpened] = useState(false);
    const [isPopupOpen, setPopupOpen, togglePopup] = useModal(false);

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
        if (!props.isReadOnly) {
            setPopupOpened(true)
        }
    }

    function onGalleryPopupClose(state: boolean, images: string[]) {
        setValues({ ...values, Images: images });
        if (props.onValuesChange) {
            props.onValuesChange('Images', images);
            setPopupOpened(false);
        }
    }

    function returnLocationPickerPopup() {
        if (!props.isLoading)
            return (<Popup open={isPopupOpen} onClose={(state) => togglePopup()}>
                <LocationPicker />
            </Popup>)
    }

    return (
        <div className={`mainEventBox ${props.className}`}>
            <div className='galleryBox'>
                <div className='galleryIconWithText' onClick={(event) => onDropBoxClick(event)}>
                    <Images className='galleryIcon' />
                    {props.isReadOnly && <p>No images</p>}
                    {!props.isReadOnly && <p>Drop images or click</p>}
                </div>
            </div>

            <GaleryPopup images={values.Images} open={popupOpened} onClose={onGalleryPopupClose} />

            {returnLocationPickerPopup()}

            <div className='inputEventStack'>
                <SimpleEditableInput defaultValue={values.EventName} id={"EventName"} onChangeAction={handleInputChange} inputDescription={"Event Name"} inputClassName='eventNameInput' readonly={props.isReadOnly} isLoading={props.isLoading} />

                <div>
                    <p className='descText'>Tags</p>
                    <TagList isLoading={props.isLoading} tags={values.Tags} isReadOnly={props.isReadOnly} />
                </div>

                <div className='localizationInputBox'>
                    <SimpleEditableInput defaultValue={values.Localization === '' ? 'no localization' : values.Description} id={"Localization"} onChangeAction={handleInputChange} inputDescription={"Localization"} inputClassName='localizationInput' maxChars={1000} readonly={props.isReadOnly} isLoading={props.isLoading} />
                    {!props.isReadOnly && <ButtonWithIcon text="Pick place" icon={<PinMapFill fill='white' />} style={ButtonStyle.Filled} isActive={true} isLoading={props.isLoading} onClickAction={togglePopup} />}
                </div>

                <div>
                    <p className='descText'>Start date - end date</p>
                    <EventDatePicker onDateChange={pickCalendarDate} isReadOnly={props.isReadOnly} startDate={values.StartDate} endDate={values.EndDate} isLoading={props.isLoading} />
                </div>

                <SimpleEditableInput defaultValue={values.Description === '' ? 'No description' : values.Description} id={"Description"} onChangeAction={handleInputChange} inputDescription={"Description"} inputClassName='descriptionInput' rows={3} maxChars={1000} readonly={props.isReadOnly} isLoading={props.isLoading} />
            </div>
        </div>
    )
}
