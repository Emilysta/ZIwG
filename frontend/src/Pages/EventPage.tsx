import * as React from 'react';
import { useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
import './EventPage.scss';
import { useGetEventQuery } from 'Utils/EventAPISlice';
import Dropdown from 'Components/Dropdown';
import LeafletBoxWithPopup from 'Components/EventPage/LeafletBoxWithPopup';
import { StarFill, X } from 'react-bootstrap-icons';
import Stat from 'Components/Stat';
import { userApi } from 'Utils/UserApiSlice';
import { RootState, useAppSelector } from 'Utils/Store';

const dropdownList = [{ text: 'Not interested', icon: <X /> }, { text: 'Going', icon: <StarFill /> }];

export default function EventPage() {
    const { id } = useParams();
    const { data, error, isLoading } = useGetEventQuery(id);

    const [subscribeToEvent] = userApi.useSubscribeToEventMutation();
    const [unsubscribeFromEvent] = userApi.useUnsubscribeFromEventMutation();
    const [getUserData] = userApi.useLazyGetUserDataQuery();

    const userId = useAppSelector((state: RootState) => state.userLogin.userId);

    async function onDropdownSelectionChange(selectedIndex: number) {
        if (selectedIndex === 0) {
            await unsubscribeFromEvent({ eventId: id });
            await getUserData();
        }
        else
            await subscribeToEvent({ eventId: id });
        await getUserData();
    }

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
                        {userId !== data?.organiserId &&
                            <Dropdown items={dropdownList} initialSelected={data?.isInterested ? 1 : 0} isLoading={isLoading} onSelectionChange={onDropdownSelectionChange} />
                        }

                        <LeafletBoxWithPopup mapID='mapEvent' isLoading={isLoading} point={data?.place} eventName={data?.name} />
                    </div>
                </div>
                <div className='eventStatsContainer'>

                    <Stat name='Attending users' value={data?.signed.toString()} />
                    <Stat name='Available tickets' value={data?.isTicketLimit ? data.available.toString() : 'No limit'} />
                    <Stat name='Capacity' value={data?.isTicketLimit ? data.ticketLimit.toString() : 'No limit'} />
                </div>
            </div>
        )
    }

}


