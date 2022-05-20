import * as React from 'react';
import { useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
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
            <div className='centerContent'>
                <div className='eventPage'>
                    <MainEventBox className="mainBox" values={data ?? {}} isReadOnly={true} isLoading={isLoading} />
                    <div className='sideBox'>
                        <Dropdown items={[{ text: 'Not interested', icon: <X /> }, { text: 'Going', icon: <StarFill /> }]} initialSelected={-1} initialState={false} isLoading={isLoading} />
                        <LeafletBoxWithPopup mapID='mapEvent' isLoading={isLoading} point={data?.place} />
                    </div>
                </div>
            </div>
        )
    }
}


