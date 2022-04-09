import * as React from 'react';
import './CalendarCard.scss';

export enum CalendarCardStyle {
    Normal = 'cardNormal',
    Filled = 'cardFilled',
    NotInMonth = 'cardNotInMonth',
    Selected = 'cardSelected',
}

type CalendarCardProps = {
    tasks: string[],
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
                {props.tasks.slice(0, 2).map((task: string, i: number) =>
                    <p className='text' key={i}> {task} </p>)}
                {props.tasks.length > 2 && <p className='text tasksNumer'>{props.tasks.length - 2} more </p>}
            </div>
        </div >
    );
}
