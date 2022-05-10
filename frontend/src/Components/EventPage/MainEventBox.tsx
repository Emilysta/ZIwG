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
    isReadOnly: boolean,
    values: Partial<EventData>,
    onValuesChange?: (id: string, value: any) => void,
    isLoading?: boolean,
}

export default function MainEventBox(props: MainEventBoxProps) {
    const [popupOpened, setPopupOpened] = useState(false);
    const [isPopupOpen, setPopupOpen, togglePopup] = useModal(false);

    const handleInputChange = (inputId: string, value: string) => {
        if (props.onValuesChange)
            props.onValuesChange(inputId, value);
    };

    function pickCalendarDate(updateDate: string, id: string) {
        if (props.onValuesChange) {
            props.onValuesChange(id, updateDate);
        }
    }


    function onDropBoxClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!props.isReadOnly) {
            setPopupOpened(true)
        }
    }

    function onGalleryPopupClose(state: boolean, images: string[]) {
        if (props.onValuesChange) {
            props.onValuesChange('images', images);
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

            <GaleryPopup images={props.values.images} open={popupOpened} onClose={onGalleryPopupClose} />

            {returnLocationPickerPopup()}

            <div className='inputEventStack'>
                <SimpleEditableInput defaultValue={props.values.name} id={"name"} onChangeAction={handleInputChange} inputDescription={"Event Name"} inputClassName='eventNameInput' readonly={props.isReadOnly} isLoading={props.isLoading} />

                <div>
                    <p className='descText'>Tags</p>
                    <TagList isLoading={props.isLoading} tags={props.values.tags} isReadOnly={props.isReadOnly} />
                </div>

                <div className='localizationInputBox'>
                    <SimpleEditableInput defaultValue={props.values.place === '' ? 'no localization' : props.values.description} id={"place"} onChangeAction={handleInputChange} inputDescription={"Localization"} inputClassName='localizationInput' maxChars={1000} readonly={props.isReadOnly} isLoading={props.isLoading} />
                    {!props.isReadOnly && <ButtonWithIcon text="Pick place" icon={<PinMapFill fill='white' />} style={ButtonStyle.Filled} isActive={true} isLoading={props.isLoading} onClickAction={togglePopup} />}
                </div>

                <div>
                    <p className='descText'>Start date - end date</p>
                    <EventDatePicker onDateChange={pickCalendarDate} isReadOnly={props.isReadOnly} startDate={props.values.startDate} endDate={props.values.endDate} isLoading={props.isLoading} />
                </div>

                <SimpleEditableInput defaultValue={props.values.description === '' ? 'No description' : props.values.description} id={"description"} onChangeAction={handleInputChange} inputDescription={"Description"} inputClassName='descriptionInput' rows={3} maxChars={1000} readonly={props.isReadOnly} isLoading={props.isLoading} />
            </div>
        </div>
    )
}
