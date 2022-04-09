import * as React from 'react';
import { EventData } from './Calendar';
import './CalendarCard.scss';

export enum CalendarCardStyle {
    Normal = 'cardNormal',
    Filled = 'cardFilled',
    NotInMonth = 'cardNotInMonth',
    Selected = 'cardSelected',
}

type CalendarCardProps = {
    events: EventData[],
    dayNumber: number,
    column: number,
    row: number,
    style: CalendarCardStyle,
    onClickAction?: (event: React.MouseEvent<HTMLDivElement>) => void,
}

export default function CalendarCard(props: CalendarCardProps) {
    return (
        <div className={`calendarCardBase ${props.style}`} onClick={props.onClickAction}>
            <div className='textStack'>
                <h1 className='text dayNumber'>{props.dayNumber < 10 ? '0' + props.dayNumber : props.dayNumber}</h1>
                {props.events.slice(0, 2).map((event: EventData, i: number) =>
                    <p className='text' key={i}> {event.name} </p>)}
                {props.events.length > 2 && <p className='text tasksNumer'>{props.events.length - 2} more </p>}
            </div>
        </div >
    );
}
