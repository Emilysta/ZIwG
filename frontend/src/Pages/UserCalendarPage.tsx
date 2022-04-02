import CalendarCard from 'Components/Calendar/CalendarCard'
import * as React from 'react'
import './UserCalendarPage.scss'

function daysInMonth() {
    let currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
}
function weekDay() {
    let currentDate = new Date();
    let firstDayInAMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return firstDayInAMonth.getDay();
}
export default function UserCalendarPage() {
    let calendarCards = [];

    for (let j = 1; j <= daysInMonth(); j++)
        calendarCards.push(<CalendarCard tasks={['Lorem', 'ipsum']}
            dayNumber={j} column={j % 7} row={(j / 7) + 1} />)


    return (

        <div className='container'>
            {calendarCards}
        </div>
    )
}
