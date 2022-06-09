import * as React from 'react';
import './TicketsList.scss'
import { Ticket } from './Ticket';
import { EventDataSimple } from 'Utils/EventData';

type TicketListProps = {
    list: EventDataSimple[],
    isLoading?: boolean,
}

export function TicketsList(props: TicketListProps) {

    if (props.isLoading)
        return (
            <div className='ticketListContainer'>
                {[...Array(5)]?.map((_, i) => {
                    return (<Ticket isLoading key={i} />)
                })}
            </div>
        );
    else
        return (
            <div className='ticketListContainer'>
                {props.list?.map((event, i) => {
                    return (<Ticket event={event} key={i} />)
                })}
                {!props.list && <h1>No tickets</h1>}
            </div>
        );
}
