import * as React from 'react';
import './UserEventsList.scss'
import { UserEventCard } from './UserEventCard';
import { useEffect } from 'react';

type UserEventsListProps = { isArchived: boolean }

export function UserEventsList(props: UserEventsListProps) {
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className='listContainer'>
            {!props.isArchived ? <>
                <UserEventCard loading={loading} eventID='1' />
            </> : <>
                <UserEventCard loading={loading} eventID='1' />
                <UserEventCard loading={loading} eventID='2' />
                <UserEventCard loading={loading} eventID='3' />
                <UserEventCard loading={loading} eventID='4' />
                <UserEventCard loading={loading} eventID='5' />
                <UserEventCard loading={loading} eventID='6' />
                <UserEventCard loading={loading} eventID='7' />
                <UserEventCard loading={loading} eventID='8' />
            </>
            }
        </div>
    );
}
