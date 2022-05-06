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

    const tempIsLoading = false;
    if (0)
        return <div className='eventPage'>
            <h2 className='errorText'>
                Oh no, there was an error, while fetching data </h2>
        </div>
    else
        return (
            <div className='eventPage'>
                <MainEventBox className="mainBox" values={data ?? {}} isReadOnly={true} isLoading={tempIsLoading} />
                <div className='sideBox'>
                    <Dropdown items={[{ text: 'Not interested', icon: <X /> }, { text: 'Interested', icon: '' }, { text: 'Going', icon: <StarFill /> }]} initialSelected={-1} initialState={false} isLoading={tempIsLoading} />
                    <LeafletBoxWithPopup mapID='mapEvent' currentPoint={{ lat: 51.5, lng: -0.11 }} isReadOnly isLoading={tempIsLoading} />
                </div>
            </div>
        )
}


