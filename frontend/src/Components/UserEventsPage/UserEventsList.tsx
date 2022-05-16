import * as React from 'react';
import './UserEventsList.scss'
import { UserEventCard } from './UserEventCard';
import { useEffect } from 'react';
import { useGetUserEventsQuery } from 'Utils/EventAPISlice';
import { RootState, useAppSelector } from 'Utils/Store';

type UserEventsListProps = { isArchived: boolean }

export function UserEventsList(props: UserEventsListProps) {
    const userId = useAppSelector((state: RootState) => state.userLogin.userId)
    const { data, error, isLoading } = useGetUserEventsQuery({ UserId: userId });

    return (
        <div className='listContainer'>
            {!props.isArchived ? <>
                <UserEventCard loading={isLoading} />
            </> : <>
                <UserEventCard loading={isLoading} />
                <UserEventCard loading={isLoading} />
                <UserEventCard loading={isLoading} />
                <UserEventCard loading={isLoading} />
                <UserEventCard loading={isLoading} />
                <UserEventCard loading={isLoading} />
                <UserEventCard loading={isLoading} />
                <UserEventCard loading={isLoading} />
            </>
            }
        </div>
    );
}
