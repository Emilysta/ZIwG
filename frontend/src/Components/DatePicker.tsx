import * as React from 'react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ZiwgSkeleton from 'Utils/Skeletons';
import "./DatePicker.scss";


type EventDatePickerProps = {
    isReadOnly?: boolean,
    className?: string,
    onDateChange?: (value: string, id: string) => void,
    startDate: string,
    endDate: string,
    isLoading?: boolean,
}

export default function EventDatePicker(props: EventDatePickerProps) {
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);

    React.useEffect(() => { setStartDate(props.startDate); setEndDate(props.endDate) });

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    function onStartDateChange(startDateUp: string) {
        setStartDate(startDateUp);
        if (props.onDateChange)
            props.onDateChange(startDateUp, 'startDate');
    }

    function onEndDateChange(endDateUp: string) {
        setEndDate(endDateUp);
        if (props.onDateChange)
            props.onDateChange(endDateUp, 'endDate');
    }

    if (props.isLoading) {
        return (<div className='datePickerBox'><ZiwgSkeleton /><p> — </p><ZiwgSkeleton /></div>)
    }
    else if (props.isReadOnly) {
        if (startDate === null)
            return (<p className='noPaddingMargin'>No date selected</p>)
        else
            return (<p className='noPaddingMargin'>{new Date(startDate).toDateString()} — {new Date(endDate).toDateString()}</p>)
    }
    else {
        return (
            <div className='datePickerBox'>
                <ReactDatePicker
                    dateFormat="dd/MM/yyyy, HH:mm"
                    className='simplePickerInput'
                    calendarClassName='calendar'
                    selected={new Date(startDate)}
                    minDate={new Date()}
                    onChange={(update) => { onStartDateChange(update.toISOString()) }}
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
                    selected={new Date(endDate)}
                    minDate={new Date()}
                    onChange={(update) => { onEndDateChange(update.toISOString()) }}
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
