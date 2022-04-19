import * as React from 'react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";


type EventDatePickerProps = {
    isReadOnly?: boolean,
    className?: string,
    onDateChange?: (value: [Date, Date]) => void,
    startDate: Date,
    endDate: Date,
}

export default function EventDatePicker(props: EventDatePickerProps) {
    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate);

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    function onStartDateChange(startDateUp: Date) {
        setStartDate(startDateUp);
        if (props.onDateChange)
            props.onDateChange([startDate, endDate]);
    }

    function onEndDateChange(endDateUp: Date) {
        setEndDate(endDateUp);
        if (props.onDateChange)
            props.onDateChange([startDate, endDate]);
    }
    if (props.isReadOnly) {
        if (startDate === null)
            return (<p className='noPaddingMargin'>No date selected</p>)
        else
            return (<p className='noPaddingMargin'>{startDate.toDateString()} — {endDate.toDateString()}</p>)
    }
    else {
        return (
            <div className='datePickerBox'>
                <ReactDatePicker
                    dateFormat="dd/MM/yyyy, HH:mm"
                    className='simplePickerInput'
                    calendarClassName='calendar'
                    selected={startDate}
                    minDate={new Date()}
                    onChange={(update) => { onStartDateChange(update) }}
                    filterTime={filterPassedTime}
                    isClearable={true}
                    placeholderText="Start date"
                    disabled={props.isReadOnly}
                    timeInputLabel="Start time:"
                    timeFormat="HH:mm"
                    showYearDropdown
                    showTimeInput
                    id='startDate'
                    scrollableYearDropdown
                />
                <p> — </p>
                < ReactDatePicker
                    dateFormat="dd/MM/yyyy, HH:mm"
                    className='simplePickerInput'
                    calendarClassName='calendar'
                    selected={endDate}
                    minDate={new Date()}
                    onChange={(update) => { onEndDateChange(update) }}
                    filterTime={filterPassedTime}
                    isClearable={true}
                    placeholderText="End date"
                    disabledKeyboardNavigation
                    disabled={props.isReadOnly}
                    timeInputLabel="End time:"
                    timeFormat="HH:mm"
                    showYearDropdown
                    showTimeInput
                    scrollableYearDropdown
                    id='endDate'
                />
            </div>
        )
    }
}
