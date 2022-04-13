import * as React from 'react';
import './UserEventCard.scss';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';

type UserEventCardProps = {
    loading: boolean,
    eventID: string,
    eventName?: string,
    eventLocation?: string,
    eventDate?: Date,
}

export function UserEventCard(props: UserEventCardProps) {
    return (
        <div className='userEventCard'>
            <div className='mainCon'>
                <div className='image visualiseImage'>{props.loading ? <Skeleton containerClassName="my" /> : props.eventName}</div>
                <div className='textCon'>
                    <h1 className='title'>{props.loading ? <Skeleton containerClassName='my' width={200} /> : 'Blah' + props.eventName} </h1>
                    <p className='location date'>{props.loading ? <Skeleton containerClassName='my' width={400} /> : 'Blah' + props.eventLocation}</p>
                </div>
            </div>

            <div className='secondaryCon'>
                {props.loading ? <Skeleton containerClassName='my' width={200} /> : <Link to={'/user/userEvents/' + props.eventID}> Show information</Link>}
            </div>
        </div >
    );
}
