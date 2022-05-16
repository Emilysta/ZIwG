import * as React from 'react';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { longDateFormat } from 'Utils/DateFormatter';
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


    React.useEffect(() => {
        let startTemp = new Date(props.startDate);
        let endTemp = new Date(props.endDate);
        setStartDate(startTemp);
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
    else if (props.isReadOnly) {
        if (startDate === null)
            return (<p className='noPaddingMargin'>No date selected</p>)
        else
            return (<p className='noPaddingMargin'>{longDateFormat(startDate)} — {longDateFormat(endDate)}</p>)
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
