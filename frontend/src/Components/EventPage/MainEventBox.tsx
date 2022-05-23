import * as React from 'react';
import './MainEventBox.scss';
import { Images } from 'react-bootstrap-icons';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import { useEffect, useState } from 'react';
import TagList from './TagList';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import { PinMapFill } from 'react-bootstrap-icons';
import EventDatePicker from 'Components/DatePicker';
import { ImageSelectPopup } from 'Components/ImageSelectPopup';
import { EventData } from 'Utils/EventData';
import LocationPicker from 'Components/LocationPicker';
import Popup from 'Components/Popup';
import { useModal } from 'Utils/Hooks';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { useAppDispatch } from 'Utils/Store';
import { nominatimApi } from 'Utils/NominatimAPISlice';
import { ErrorMsg } from 'Components/Input/ErrorMsg';
import { Image } from 'Components/Image';
import ZiwgSkeleton from 'Utils/Skeletons';
import Throbber from 'Components/Throbber';
import { longLocaleDateFormat } from 'Utils/DateFormatter';


type MainEventBoxProps = {
    className?: string,
    isReadOnly: boolean,
    values: Partial<EventData>,
    onValuesChange?: (id: string, value: any) => void,
    isLoading?: boolean,
}

export default function MainEventBox(props: MainEventBoxProps) {
    const [popupOpened, setPopupOpened] = useState(false);
    const [isPopupOpen, , togglePopup] = useModal(false);
    const [localizationText, setLocalizationText] = useState('');
    const delayCallApi = useCallback(debounce(location => callApi(location), 2000), []);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (props.values.place) {
            try {
                let loc = JSON.parse(props.values.place);
                delayCallApi([loc.lat, loc.lon]);
            }
            catch (e) {
                console.warn(e);
            }
        }
    }, [props.values.place, delayCallApi]);

    function handleInputChange(inputId: string, value: string) {
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

    function onGalleryPopupClose(state: boolean, selected: File) {
        if (props.onValuesChange) {
            props.onValuesChange('mainImage', selected);
            setPopupOpened(false);
        }
    }

    function onPinnedLocationChange(lat: number, lon: number) {
        if (props.onValuesChange) {
            props.onValuesChange('place', `{"lat":${lat},"lon":${lon}}`);
        }
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

    function validateName(value: string): string {
        if (value.length <= 0)
            return 'Event must have a name';
        return '';
    }

    return (
        <div className={`mainEventBox ${props.className}`}>
            <div className='galleryBox' onClick={(event) => onDropBoxClick(event)}>
                {props.values.mainImage && <Image className={'mainImage'} src={props.values.mainImage} />}
                {!props.values.mainImage && <div className='galleryIconWithText'>
                    <Images className='galleryIcon' />
                    {!props.isReadOnly && <p>Click to add Image</p>}
                    {props.isReadOnly && <p>No images</p>}
                </div>}
            </div>

            <ImageSelectPopup image={props.values.mainImage} open={popupOpened} onClose={onGalleryPopupClose} />

            {returnLocationPickerPopup()}

            <div className='inputEventStack'>
                <SimpleEditableInput defaultValue={props.values.name} id={"name"} onChangeAction={handleInputChange} inputDescription={"Event Name"} validationAction={validateName} inputClassName='eventNameInput' isReadOnly={props.isReadOnly} isLoading={props.isLoading} />

                <div>
                    <p className='descText'>Tags</p>
                    <TagList isLoading={props.isLoading} tags={props.values.tags} isReadOnly={props.isReadOnly} />
                </div>
                <div>
                    <p className='descText'>Localization</p>
                    {props.isLoading &&
                        <div className='localizationInputBox'>
                            <ZiwgSkeleton />
                        </div>}
                    {!props.isLoading &&
                        <>
                            <div className='localizationInputBox'>
                                {props.isReadOnly && <>
                                    {!localizationText ? <Throbber className='localizationThrobber' /> : <></>}
                                    <p className='sizedText'>{localizationText ? localizationText : 'Loading'}</p>
                                </>}
                                {!props.isReadOnly && <p className='sizedText'>{localizationText ? localizationText : 'No localization'}</p>}
                                {!props.isReadOnly && <ButtonWithIcon text="Pick place" icon={<PinMapFill fill='white' />} style={ButtonStyle.Filled} isActive={true} isLoading={props.isLoading} onClickAction={togglePopup} />}
                            </div>
                            {!props.isReadOnly && localizationText === '' && <ErrorMsg className='localizationError'>Must contain localization</ErrorMsg>}
                        </>
                    }
                </div>

                <div>
                    <p className='descText'>Start date - end date</p>
                    {!props.isReadOnly &&
                        <EventDatePicker onDateChange={pickCalendarDate} startDate={props.values.startDate} endDate={props.values.endDate} isLoading={props.isLoading} />}
                    {props.isReadOnly && <>
                        {!props.values.startDate && <p className='noPaddingMargin'>{'No date selected'}</p>}
                        {props.values.startDate && <p className='noPaddingMargin'>
                            {longLocaleDateFormat(props.values.startDate)} — {longLocaleDateFormat(props.values.endDate)}
                        </p>}
                    </>
                    }
                </div>

                <SimpleEditableInput defaultValue={props.values.description === '' ? 'No description' : props.values.description} id={"description"} onChangeAction={handleInputChange} inputDescription={"Description"} inputClassName='descriptionInput' rows={3} maxChars={1000} isReadOnly={props.isReadOnly} isLoading={props.isLoading} />
            </div>
        </div >
    )
}

