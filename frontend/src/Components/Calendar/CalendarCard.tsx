import * as React from 'react';
import { EventData } from './Calendar';
import './CalendarCard.scss';
import { useMediaQuery } from 'react-responsive'

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
    const isBigScreen = useMediaQuery({ query: '(min-width: 1335px)' })
    return (
        <div className={`calendarCardBase ${props.style}`} onClick={props.onClickAction}>
            <div className='textStack'>
                <h1 className='text dayNumber'>{props.dayNumber < 10 ? '0' + props.dayNumber : props.dayNumber}</h1>
                {isBigScreen &&
                    props.events.slice(0, 2).map((event: EventData, i: number) =>
                        <p className='text' key={i}> {event.name} </p>)}
                {props.events.length > 2 && <p className='text tasksNumer'>{props.events.length - 2} more </p>}
            </div>
        </div >
    );
}
