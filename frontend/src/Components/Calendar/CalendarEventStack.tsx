import * as React from 'react'
import CalendarEvent, { CalendarEventProps } from './CalendarEvent'
import './CalendarEventStack.scss'

export default function CalendarEventStack(props: { eventsList: CalendarEventProps[] }) {
    return (
        <div className='eventStack'> 
            <h1 className='yourDayHeader'>Your Day</h1>
            <div className='eventStackList'>{props.eventsList.map((event: CalendarEventProps, i) => {
                return (
                    <CalendarEvent hours={event.hours} eventName={event.eventName} key={i} />
                )
            })}</div>
        </div >
    )
}
