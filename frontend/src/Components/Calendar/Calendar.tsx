import CalendarCard, { CalendarCardStyle } from 'Components/Calendar/CalendarCard'
import * as React from 'react'
import './Calendar.scss'
import * as dateFns from 'date-fns';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import CalendarEventStack from './CalendarEventStack';

export type EventData = {
    name: string,
    date: Date,
    organizator: string,
}

type DayData = {
    day: Date,
    events: EventData[];
}

function isSameDate(date1: Date, date2: Date): boolean {
    if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear())
        return true;
    else
        return false;
}

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedCard, setSelectedCard] = useState<number>(null);
    const [currentEvents, setCurrentEvents] = useState<EventData[]>(new Array<EventData>());

    const getNextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1));
        setSelectedCard(null);
    }

    const getPrevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1));
        setSelectedCard(null);
    }

    const selectedCardChanged = (event: React.MouseEvent<HTMLDivElement>, day: number, events: EventData[]) => {
        event.preventDefault();

        if (selectedCard === day)
            setSelectedCard(null)
        else
            setSelectedCard(day);
        setCurrentEvents(events);
    }


    const generateCards = () => {
        let daysEventsList: DayData[] = [{ day: new Date(), events: [{ name: "dvcbhdv", date: new Date(), organizator: "dcvbhvb" }] }];
        let calendarCards = [];
        let startOfMmonth = dateFns.startOfMonth(currentMonth);
        let enfOfMonth = dateFns.endOfMonth(currentMonth);
        let startWeekOfMonth = dateFns.startOfWeek(startOfMmonth, { weekStartsOn: 1 });
        let endWeekOfMonth = dateFns.endOfWeek(enfOfMonth, { weekStartsOn: 1 });
        let day = startWeekOfMonth;
        let j = 0;
        while (day < endWeekOfMonth) {
            let tasks: EventData[] = [];

            let dayData = daysEventsList.filter((element) => isSameDate(element.day, day));

            if (dayData.length > 0) {
                tasks = dayData.at(0).events;
            }
            let dayNumber = day.getDate();
            if (!dateFns.isSameMonth(day, currentMonth)) {
                calendarCards.push(<CalendarCard events={tasks} style={CalendarCardStyle.NotInMonth}
                    dayNumber={dayNumber} column={j % 7} row={(j / 7) + 1} key={j} />)
            }
            else {
                let styleCard: CalendarCardStyle;
                if (selectedCard === dayNumber) {

                    styleCard = CalendarCardStyle.Selected
                }
                else if (tasks.length === 0) {
                    styleCard = CalendarCardStyle.Normal;
                }
                else
                    styleCard = CalendarCardStyle.Filled;
                calendarCards.push(<CalendarCard events={tasks} style={styleCard}
                    dayNumber={dayNumber} column={j % 7} row={(j / 7) + 1} key={j} onClickAction={(e) => selectedCardChanged(e, dayNumber, tasks)} />)
            }
            day = dateFns.addDays(day, 1);
            j++;
        }
        return calendarCards;
    }

    return (
        <>
            <div className='wholeCalendarBox'>
                <div className='calendarBox'>
                    <div className='monthBar'>
                        <ChevronLeft className='changeMonthIcon' onClick={getPrevMonth} />
                        <p>{currentMonth.toLocaleString('en', { month: 'long', year: 'numeric' })}</p>
                        <ChevronRight className='changeMonthIcon' onClick={getNextMonth} />
                    </div>
                    <div className='container'>
                        {generateCards()}
                    </div>
                </div>
                <div className='myCalendarEventsStack'>
                    <CalendarEventStack eventsList={currentEvents} />
                </div>
            </div>

        </>
    )
}
