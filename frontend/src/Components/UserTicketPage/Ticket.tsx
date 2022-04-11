import * as React from 'react';
import './Ticket.scss'

type TicketProps = {}

export function Ticket(props: TicketProps) {
    return (
        <div className='ticket ticketHuge'>
            <div>
                <div className='mainCon'>
                    <span className='title'>EventCollab</span>
                    <span className='location'>Wrocław</span>
                    <span className='date'>01.04.2020, 18:00</span>
                </div>
                <div className='secondaryCon'>
                    <a>Download ticket</a>
                </div>
            </div>
        </div>
    );
}
