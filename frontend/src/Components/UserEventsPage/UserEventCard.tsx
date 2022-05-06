import * as React from 'react';
import './UserEventCard.scss';
import ZiwgSkeleton from 'Utils/Skeletons';
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
                <div className='image visualiseImage'>{props.loading ? <ZiwgSkeleton /> : props.eventName}</div>
                <div className='textCon'>
                    <h1 className='title'>{props.loading ? <ZiwgSkeleton width={200} /> : 'Blah' + props.eventName} </h1>
                    <p className='location date'>{props.loading ? <ZiwgSkeleton width={400} /> : 'Blah' + props.eventLocation}</p>
                </div>
            </div>

            <div className='secondaryCon'>
                {props.loading ? <ZiwgSkeleton width={200} /> : <Link to={'/user/userEvents/' + props.eventID}> Show information</Link>}
            </div>
        </div >
    );
}
