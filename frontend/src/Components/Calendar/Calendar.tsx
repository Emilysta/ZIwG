import CalendarCard, { CalendarCardStyle } from 'Components/Calendar/CalendarCard'
import * as React from 'react'
import './Calendar.scss'
import * as dateFns from 'date-fns';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import CalendarEventStack from './CalendarEventStack';
import { useMediaQuery } from 'react-responsive'
import { useLazyGetUserEventsQuery } from 'Utils/EventAPISlice';
import { RootState, useAppSelector } from 'Utils/Store';
import { EventDataSimple } from 'Utils/EventData';

type DayData = {
    day: Date,
    events: EventDataSimple[];
}

function isSameDate(date1: Date, date2: Date): boolean {
    if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth()
        && date1.getFullYear() === date2.getFullYear())
        return true;
    else
        return false;
}

export default function Calendar() {
    const isBigScreen = useMediaQuery({ query: '(min-width: 980px)' })
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedCard, setSelectedCard] = useState<number>(null);
    const [currentEvents, setCurrentEvents] = useState<EventDataSimple[]>(new Array<EventDataSimple>());
    const userId = useAppSelector((state: RootState) => state.userLogin.userId)
    const [trigger] = useLazyGetUserEventsQuery();
    const [mappedData, setMappedData] = useState<DayData[]>(null);

    useEffect(() => {
        async function fetchData() {
            if (currentMonth) {
                try {
                    let monthAndYear = `${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`;

                    let result = await trigger({ userId: userId, monthAndYear: monthAndYear });

                    mapData(result.data);
                } catch (error) {
                    console.error('rejected', error);
                }
            }
        }
        fetchData();
    }, [currentMonth]);

    function mapData(data: EventDataSimple[]) {
        let newArray: DayData[] = [];

        let day = dateFns.startOfMonth(currentMonth);
        for (let i: number = 0; i < dateFns.endOfMonth(currentMonth).getDate(); i++) {
            let tempDay = day;
            let list = data?.filter(function (e) { return isSameDate(new Date(e.startDate), tempDay) });

            if (list.length > 0)
                newArray.push({ day: tempDay, events: list })

            day = dateFns.addDays(day, 1);
        }

        setMappedData(newArray);
    }

    const getNextMonth = () => {
        setCurrentMonth(dateFns.addMonths(currentMonth, 1));
        setSelectedCard(null);
    }

    const getPrevMonth = () => {
        setCurrentMonth(dateFns.subMonths(currentMonth, 1));
        setSelectedCard(null);
    }

    const selectedCardChanged = (event: React.MouseEvent<HTMLDivElement>, day: number, events: EventDataSimple[]) => {
        event.preventDefault();

        if (selectedCard === day)
            setSelectedCard(null)
        else
            setSelectedCard(day);
        setCurrentEvents(events);
    }


    const generateCards = () => {
        let daysEventsList: DayData[] = mappedData;
        let calendarCards = [];
        let startOfMmonth = dateFns.startOfMonth(currentMonth);
        let enfOfMonth = dateFns.endOfMonth(currentMonth);
        let startWeekOfMonth = dateFns.startOfWeek(startOfMmonth, { weekStartsOn: 1 });
        let endWeekOfMonth = dateFns.endOfWeek(enfOfMonth, { weekStartsOn: 1 });
        let day = startWeekOfMonth;
        let j = 0;
        while (day < endWeekOfMonth) {
            let tasks: EventDataSimple[] = [];
            let dayData: DayData[] = [];
            if (daysEventsList)
                dayData = daysEventsList.filter((element) => isSameDate(element.day, day));

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
                {isBigScreen && <div className='myCalendarEventsStack'>
                    <CalendarEventStack eventsList={currentEvents} />
                </div>}
            </div>

        </>
    )
}
