import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainEventBox from 'Components/EventPage/MainEventBox';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import './EventPage.scss';
import { EventData } from 'Utils/EventData'

export default function EventPage() {
    const [values, setValues] = useState<EventData>({
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
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    // useEffect(() => { //temporary loading
    //     setLoading(true);
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div className='eventPage'>
            <MainEventBox className="mainBox" values={values} isReadOnly={true} loading={loading} />
            <div className='sideBox'>
                <div className='togglesBox'>
                    <ToggleButtonWithText fieldDesc='Public event' startIsToggled={values.IsPublicEvent} id='IsPublicEvent' isReadOnly loading={loading} />
                    <ToggleButtonWithText fieldDesc='Paid ticket' startIsToggled={values.IsPaidTicket} id='IsPaidTicket' isReadOnly loading={loading} />
                    {values.IsPaidTicket && <SimpleEditableInput id="TicketPrice" loading={loading} readonly />}
                    <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={values.IsTicketLimit} id='IsTicketLimit' isReadOnly loading={loading} />
                    {values.IsTicketLimit && <SimpleEditableInput id="TicketCount" loading={loading} readonly />}
                </div>
            </div>
        </div>
    )
}


