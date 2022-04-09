import CalendarCard, { CalendarCardStyle } from 'Components/Calendar/CalendarCard'
import * as React from 'react'
import './Calendar.scss'
import * as dateFns from 'date-fns';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import CalendarEventStack from './CalendarEventStack';


export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedCard, setSelectedCard] = useState<number>(null);

    const getNextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1));
        setSelectedCard(null);
    }

    const getPrevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1));
        setSelectedCard(null);
    }

    const selectedCardChanged = (event: React.MouseEvent<HTMLDivElement>, day: number) => {
        event.preventDefault();

        if (selectedCard === day)
            setSelectedCard(null)
        else
            setSelectedCard(day);
    }


    const generateCards = () => {
        let calendarCards = [];
        let startOfMmonth = dateFns.startOfMonth(currentMonth);
        let enfOfMonth = dateFns.endOfMonth(currentMonth);
        let startWeekOfMonth = dateFns.startOfWeek(startOfMmonth, { weekStartsOn: 1 });
        let endWeekOfMonth = dateFns.endOfWeek(enfOfMonth, { weekStartsOn: 1 });
        let day = startWeekOfMonth;
        let j = 0;
        while (day < endWeekOfMonth) {
            let tasks = ['Lor', 'Ipsum'];
            let dayNumber = day.getDate();
            if (!dateFns.isSameMonth(day, currentMonth)) {
                calendarCards.push(<CalendarCard tasks={['Lorem', 'ipsum']} style={CalendarCardStyle.NotInMonth}
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
                calendarCards.push(<CalendarCard tasks={tasks} style={styleCard}
                    dayNumber={dayNumber} column={j % 7} row={(j / 7) + 1} key={j} onClickAction={(e) => selectedCardChanged(e, dayNumber)} />)
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
                    <CalendarEventStack eventsList={[{ hours: "12-14", eventName: "Otwarcie" }, { hours: "16-18", eventName: "Otwarcie" }, { hours: "10-20", eventName: "Otwarcie" }, { hours: "10-20", eventName: "Otwarcie rfgrgisregb ieudgf" }, { hours: "10-20", eventName: "Otwarcie" }, { hours: "12-14", eventName: "Otwarcierhserhsrethrsthdthssh" }, { hours: "16-18", eventName: "Otwarcie" }, { hours: "10-20", eventName: "Otwarcie" }, { hours: "10-20", eventName: "Otwarcie" }, { hours: "10-20", eventName: "Otwarcie" }]} />
                </div>
            </div>

        </>
    )
}
