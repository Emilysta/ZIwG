import * as React from 'react';
import './MainEventBox.scss';
import { Images } from 'react-bootstrap-icons';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import { useEffect, useState } from 'react';
import TagList from './TagList';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import { PinMapFill } from 'react-bootstrap-icons';
import EventDatePicker from 'Components/DatePicker';
import { GaleryPopup } from 'Components/GaleryPopup';
import { EventData } from 'Utils/EventData';
import LocationPicker from 'Components/LocationPicker';
import Popup from 'Components/Popup';
import { useModal } from 'Utils/Hooks';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { useAppDispatch } from 'Utils/Store';
import { nominatimApi } from 'Utils/NominatimAPISlice';


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
    const [localizationText, setLocalizationText] = useState('');
    const delayCallApi = useCallback(debounce(location => callApi(location), 2000), []);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (props.values.place) {
            let loc = JSON.parse(props.values.place);
            delayCallApi([loc.lat, loc.lon]);
        }
    }, []);

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

    function onPinnedLocationChange(lat: number, lon: number) {
        if (props.onValuesChange) {
            props.onValuesChange('place', `{"lat":${lat},"lon":${lon}}`);
        }
        delayCallApi([lat, lon]);
    }

    async function callApi(location: number[]) {
        let promise = dispatch(nominatimApi.endpoints.getLocationByLatLon.initiate({ lat: location[0].toString(), lon: location[1].toString(), format: "json" }));
        let result = await promise;

        if (result.isSuccess)
            setLocalizationText(result.data);
    }

    function returnLocationPickerPopup() {
        if (!props.isLoading)
            return (<Popup open={isPopupOpen} onClose={(state) => togglePopup()}>
                <LocationPicker onPinnedLocationChange={onPinnedLocationChange} />
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
                <div>
                    <p className='descText'>Localization</p>
                    <div className='localizationInputBox'>
                        <p className='sizedText'>{localizationText ? localizationText : 'no localization'}</p>
                        {!props.isReadOnly && <ButtonWithIcon text="Pick place" icon={<PinMapFill fill='white' />} style={ButtonStyle.Filled} isActive={true} isLoading={props.isLoading} onClickAction={togglePopup} />}
                    </div>
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

