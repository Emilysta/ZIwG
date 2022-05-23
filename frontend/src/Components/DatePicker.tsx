import * as React from 'react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { longLocaleDateFormat, longLocaleDateFormatForDate } from 'Utils/DateFormatter';
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
    const [startDate, setStartDate]: [Date, (s: Date) => void] = useState(undefined);
    const [endDate, setEndDate]: [Date, (s: Date) => void] = useState(undefined);

    React.useEffect(() => {
        let startTemp = new Date(props.startDate);
        let endTemp = new Date(props.endDate);
        if (isNaN(startTemp.getTime()) || isNaN(endTemp.getTime()))
            return

        setStartDate(startTemp);
        setEndDate(endTemp);
    }, []);

    React.useEffect(() => {
        let startTemp = new Date(props.startDate);
        let endTemp = new Date(props.endDate);
        if (isNaN(startTemp.getTime()) || isNaN(endTemp.getTime()))
            return

        setStartDate(startTemp);
        let change = startTemp.getTime() > endTemp.getTime() ? startTemp : endTemp;
        if (change !== endTemp)
            onEndDateChange(startTemp.getTime() > endTemp.getTime() ? startTemp : endTemp)
    }, [props.startDate]);

    const filterPassedTime = (time: Date) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };

    function onStartDateChange(startDateUp: Date) {
        if (props.onDateChange && startDateUp)
            props.onDateChange(startDateUp.toISOString(), 'startDate');
        setStartDate(startDateUp);
    }

    function onEndDateChange(endDateUp: Date) {
        if (props.onDateChange)
            props.onDateChange(endDateUp?.toISOString(), 'endDate');
        setEndDate(endDateUp);
    }

    if (props.isLoading) {
        return (<div className='datePickerBox'><ZiwgSkeleton /><p> — </p><ZiwgSkeleton /></div>)
    }
    else if (!props.isReadOnly) {
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
                    isClearable={false}
                    placeholderText="Start date"
                    disabled={props.isReadOnly}
                    timeInputLabel="Start time:"
                    timeFormat="HH:mm"
                    showYearDropdown
                    showTimeInput
                    id='startDate'
                    scrollableYearDropdown
                    required
                    onChangeRaw={(e) => e.preventDefault()}
                />
                <p> — </p>
                < ReactDatePicker
                    dateFormat="dd/MM/yyyy, HH:mm"
                    className='simplePickerInput'
                    calendarClassName='calendar'
                    selected={endDate}
                    minDate={startDate}
                    onChange={(update) => { onEndDateChange(update) }}
                    filterTime={filterPassedTime}
                    isClearable={false}
                    placeholderText="End date"
                    disabled={props.isReadOnly}
                    timeInputLabel="End time:"
                    timeFormat="HH:mm"
                    showYearDropdown
                    showTimeInput
                    scrollableYearDropdown
                    id='endDate'
                    required
                    onChangeRaw={(e) => e.preventDefault()}
                />
            </div>
        )
    }
}
