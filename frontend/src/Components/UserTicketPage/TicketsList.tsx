import * as React from 'react';
import './TicketsList.scss'
import { Ticket } from './Ticket';

type TicketListProps = { type: string }

export function TicketsList(props: TicketListProps) {
    return (
        <div className='ticketListContainer'>
            {props.type === "validated" ? <>
                <Ticket />
            </> : <>
                <Ticket />
                <Ticket />
                <Ticket />
                <Ticket />
            </>
            }
        </div>
    );
}
