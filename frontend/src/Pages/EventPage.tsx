import * as React from 'react';
import { useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import './EventPage.scss';
import { useGetEventQuery } from 'Utils/EventAPISlice';

export default function EventPage() {
    const { id } = useParams();
    const { data, error, isLoading } = useGetEventQuery(id);
    if (error)
        return <div className='eventPage'>
            <h2 className='errorText'>
                Oh no, there was an error, while fetching data </h2>
        </div>
    else
        return (
            <div className='eventPage'>
                <MainEventBox className="mainBox" values={data ?? {}} isReadOnly={true} isLoading={true} />
                {/* 
                <div className='sideBox'>
                    <div className='togglesBox'>
                        <ToggleButtonWithText fieldDesc='Public event' startIsToggled={data.IsPublicEvent} id='IsPublicEvent' isReadOnly loading={isLoading} />
                        <ToggleButtonWithText fieldDesc='Paid ticket' startIsToggled={data.IsPaidTicket} id='IsPaidTicket' isReadOnly loading={isLoading} />
                        {data.IsPaidTicket && <SimpleEditableInput id="TicketPrice" isLoading={isLoading} readonly />}
                        <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={data.IsTicketLimit} id='IsTicketLimit' isReadOnly loading={isLoading} />
                        {data.IsTicketLimit && <SimpleEditableInput id="TicketCount" isLoading={isLoading} readonly />}
                    </div>
                </div> */}
            </div>
        )
}


