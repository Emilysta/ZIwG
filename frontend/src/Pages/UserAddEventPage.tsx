import MainEventBox from 'Components/EventPage/MainEventBox';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import * as React from 'react';
import { useState } from 'react';
import { XLg, PlusLg } from 'react-bootstrap-icons';
import './UserAddEventPage.scss';

export type EventData = {
    EventName: string,
    Description: string,
    StartDate: Date,
    EndDate: Date,
    Tags: string[],
    IsPublicEvent: boolean,
    IsPaidTicket: boolean,
    TicketPrice: string,
    IsTicketLimit: boolean,
    TicketCount: string,
    Images: string[],
}

export default function UserAddEventPage() {
    const [values, setValues] = useState<EventData>(
        {
            EventName: "Event name",
            Description: "",
            StartDate: new Date(),
            EndDate: new Date(),
            Tags: [],
            IsPublicEvent: true,
            IsPaidTicket: false,
            IsTicketLimit: false,
            TicketPrice: '',
            TicketCount: '',
            Images: [],
        });

    function addEvent() {
        console.log("added event");
        console.log(values);
    }

    function valueChange(id: string, value: any) {
        setValues({ ...values, [id]: value });
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
            <MainEventBox className="mainBox" values={values} onValuesChange={valueChange} />
            <div className='sideBox'>
                <div className='togglesBox'>
                    <ToggleButtonWithText fieldDesc='Public event' startIsToggled={values.IsPublicEvent} id='IsPublicEvent' onValueChange={valueChange} />
                    <ToggleButtonWithText fieldDesc='Paid ticket' startIsToggled={values.IsPaidTicket} id='IsPaidTicket' onValueChange={valueChange} />
                    {values.IsPaidTicket && <SimpleEditableInput id="TicketPrice"
                        onChangeAction={valueChange} validationAction={(value: string) => checkInput(value, /^[1-9]{1}\d*(\.\d{1,2})?$/, 'Only Floating point number with max two decimals', true)} />}
                    <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={values.IsTicketLimit} id='IsTicketLimit' onValueChange={valueChange} />
                    {values.IsTicketLimit && <SimpleEditableInput id="TicketCount"
                        onChangeAction={valueChange} validationAction={(value: string) => checkInput(value, /\D/, 'Only Integer')} />}
                </div>

                <div className="finishAddingButtonBox">
                    <ButtonWithIcon text="Cancel" isActive={true} icon={<XLg fill='white' />} style={ButtonStyle.Border} link='/user/userEvents' replaceLink={true} />
                    <ButtonWithIcon text="Create event" isActive={true} icon={<PlusLg fill='white' />} style={ButtonStyle.Filled} onClickAction={addEvent} replaceLink={true} link='/user/userEvents' />
                </div>
            </div>
        </div>
    )
}
