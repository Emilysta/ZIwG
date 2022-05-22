import * as React from 'react';
import './UserEventsList.scss'
import { UserEventCard } from './UserEventCard';
import { useGetUserEventsQuery } from 'Utils/EventAPISlice';
import { RootState, useAppSelector } from 'Utils/Store';

type UserEventsListProps = { isArchived: boolean }

export function UserEventsList(props: UserEventsListProps) {
    const userId = useAppSelector((state: RootState) => state.userLogin.userId)
    const { data, error, isLoading } = useGetUserEventsQuery({ organiserId: userId });

    if (isLoading)
        return (
            <>
                {[...Array(10)].map((x, i) => <UserEventCard key={i} loading={true} />)}
            </>
        )
    else if (error) {
        return (<>error</>)
    }
    else
        return (
            <div className='listContainer' >
                {
                    data.map((val, i) =>
                        <UserEventCard key={i} eventData={val} />
                    )
                }
            </div >
        );
}
