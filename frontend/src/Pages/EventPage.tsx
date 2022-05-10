import * as React from 'react';
import { useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import './EventPage.scss';
import { useGetEventQuery } from 'Utils/EventAPISlice';
import Dropdown from 'Components/Dropdown';
import LeafletBoxWithPopup from 'Components/EventPage/LeafletBoxWithPopup';
import { StarFill, X } from 'react-bootstrap-icons';

export default function EventPage() {
    const { id } = useParams();
    const { data, error, isLoading } = useGetEventQuery(id);

    if (error)
        return <div className='eventPage'>
            <h2 className='errorText'>
                Oh no, there was an error, while fetching data </h2>
        </div>
    else {
        return (
            <div className='eventPage'>
                <MainEventBox className="mainBox" values={data ?? {}} isReadOnly={true} isLoading={isLoading} />
                <div className='sideBox'>
                    <Dropdown items={[{ text: 'Not interested', icon: <X /> }, { text: 'Interested', icon: '' }, { text: 'Going', icon: <StarFill /> }]} initialSelected={-1} initialState={false} isLoading={isLoading} />
                    <LeafletBoxWithPopup mapID='mapEvent' currentPoint={{ lat: 51.5, lon: -0.11 }} isReadOnly isLoading={isLoading} />
                </div>
            </div>
        )
    }
}


