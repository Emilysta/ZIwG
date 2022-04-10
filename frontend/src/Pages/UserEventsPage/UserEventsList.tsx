import * as React from 'react';
import './UserEventsList.scss'
import { UserEventCard } from './UserEventCard';
import { useEffect } from 'react';

type UserEventsListProps = { type: string }

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
            {props.type == "validated" ? <>
                <UserEventCard loading={loading} />
            </> : <>
                <UserEventCard loading={loading} />
                <UserEventCard loading={loading} />
                <UserEventCard loading={loading} />
                <UserEventCard loading={loading} />
            </>
            }
        </div>
    );
}
