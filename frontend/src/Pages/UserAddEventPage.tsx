import MainEventBox from 'Components/EventPage/MainEventBox';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import * as React from 'react';
import { useState } from 'react';
import { XLg, PlusLg } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { eventApi } from 'Utils/EventAPISlice';
import { EventData } from 'Utils/EventData';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import './UserAddEventPage.scss';

export default function UserAddEventPage() {
    const navigate = useNavigate();
    const delaySetValue = useCallback(debounce(change => setValues(change), 1000), []);
    const [values, setValues] = useState<Omit<EventData, 'organiserName' | 'organiserImage' | 'organiserId' | 'id'>>(
        {
            name: 'Event name',
            description: '',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            tags: [],
            isPublicEvent: true,
            isPaidTicket: false,
            ticketPrice: 0,
            isTicketLimit: false,
            ticketLimit: 0,
            place: '',
            mainImage: undefined,
        }
    );

    const [addEventRequest] = eventApi.useAddEventMutation();
    const [addEventMainImageRequest] = eventApi.useAddEventMainImageMutation();

    async function addEvent() {
        console.log("added event");

        try {
            let response = await addEventRequest(values).unwrap();
            console.log(response);
            let formData = new FormData();
            formData.append('files', values.mainImage);
            let mainImageResponse = await addEventMainImageRequest({
                eventId: response,
                image: formData,
            });
            navigate('/user/userEvents', { replace: true });
        }
        catch (error) {
            console.log('rejected', error);
            alert('error while sending');
        }
    }

    function valueChange(id: string, value: any) {
        let and = { ...values, [id]: value };
        delaySetValue(and);
    }

    function checkInput(value: string, regex: RegExp, errorToShow: string, isValidChar: boolean = false): string {
        let error: string = '';

        if (!isValidChar && regex.test(value)) {
            error = errorToShow;
        }
        if (isValidChar)
            if (!regex.test(value)) {
                error = errorToShow;
            }
        return error;
    }

    return (
        <div className='userAddEventPage'>
            <MainEventBox className="mainBox" values={values} onValuesChange={valueChange} isReadOnly={false} />
            <div className='sideBox'>
                <div className='togglesBox'>
                    <ToggleButtonWithText fieldDesc='Public event' startIsToggled={values.isPublicEvent} id='isPublicEvent' onValueChange={valueChange} />
                    <ToggleButtonWithText fieldDesc='Paid ticket' startIsToggled={values.isPaidTicket} id='isPaidTicket' onValueChange={valueChange} />
                    {values.isPaidTicket && <SimpleEditableInput id="ticketPrice"
                        onChangeAction={valueChange} validationAction={(value: string) => checkInput(value, /^[1-9]{1}\d*(\.\d{1,2})?$/, 'Only Floating point number with max two decimals', true)} />}
                    <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={values.isTicketLimit} id='isTicketLimit' onValueChange={valueChange} />
                    {values.isTicketLimit && <SimpleEditableInput id="ticketLimit"
                        onChangeAction={valueChange} validationAction={(value: string) => checkInput(value, /\D/, 'Only Integer')} />}
                </div>

                <div className="finishAddingButtonBox">
                    <ButtonWithIcon text="Cancel" isActive={true} icon={<XLg fill='white' />} style={ButtonStyle.Border} link='/user/userEvents' replaceLink={true} />
                    <ButtonWithIcon text="Create event" isActive={true} icon={<PlusLg fill='white' />} style={ButtonStyle.Filled} onClickAction={addEvent} />
                </div>
            </div>
        </div>
    )
}
