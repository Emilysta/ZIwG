import * as React from 'react';
import { useState } from 'react';
import './CalendarCard.scss';
type CalendarCardProps = {
    tasks: string[],
    dayNumber: number,
    column: number,
    row: number,
    notInMonth?: boolean
}

export default function CalendarCard(props: CalendarCardProps) {
    const [style, setStyle] = useState(props.notInMonth ? 'cardNotInMonth' : (props.tasks.length > 0 ? 'cardFilled' : 'cardNormal'));

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log("click");
        setStyle('cardSelected');
        event.preventDefault();
    };

    let generateTasks;// = (
    generateTasks = props.tasks.slice(0, 2).map((task: string) => {
        return <p className='text' > {task} </p>
    });

    return (
        <div className={`calendarCardBase ${style}`} onClick={handleClick} style={{
            gridArea: `${props.column} / ${props.row}`
        }}>
            <div className='textStack'>
                <h1 className='text dayNumber'>{props.dayNumber}</h1>
                {generateTasks}
                {props.tasks.length > 2 && <p className='text tasksNumer'>{props.tasks.length - 2} more </p>}
            </div>
        </div >
    )
}
