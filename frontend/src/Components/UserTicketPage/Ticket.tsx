import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import * as React from 'react';
import { longLocaleDateFormat } from 'Utils/DateFormatter';
import { EventDataSimple } from 'Utils/EventData';
import ZiwgSkeleton from 'Utils/Skeletons';
import { FileEarmarkPdf } from 'react-bootstrap-icons';
import './Ticket.scss'

type TicketProps = {
    event?: EventDataSimple,
    isLoading?: boolean,
}

export function Ticket(props: TicketProps) {
    if (props.isLoading)
        return (
            <div className='ticket'>
                <div className='mainCon'>
                    <span className='title'><ZiwgSkeleton /></span>
                    <span className='date'><ZiwgSkeleton /></span>
                    <span className='date'><ZiwgSkeleton /></span>
                </div>
                <div className='secondaryCon'>
                    <ZiwgSkeleton />
                </div>
            </div>
        );
    else
        return (
            <div className='ticket'>
                <div className='mainCon'>
                    <span className='title'>{props.event.name}</span>
                    <span className='date'><strong>start:</strong> {longLocaleDateFormat(props.event.startDate)}</span>
                    <span className='date'><strong>end:</strong> {longLocaleDateFormat(props.event.endDate)}</span>
                </div>
                <div className='secondaryCon'>
                    <ButtonWithIcon style={ButtonStyle.Border} text='Show ticket' isActive={true} icon={<FileEarmarkPdf />} />
                </div>
            </div>
        );
}
