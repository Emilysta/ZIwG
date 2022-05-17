import * as React from 'react';
import './UserEventCard.scss';
import ZiwgSkeleton from 'Utils/Skeletons';
import { Link } from 'react-router-dom';
import { EventDataSimple } from 'Utils/EventData';
import { longLocaleDateFormat } from 'Utils/DateFormatter';
import { Image } from 'Components/Image';

type UserEventCardProps = {
    loading?: boolean,
    eventData?: EventDataSimple
}

export function UserEventCard(props: UserEventCardProps) {

    function formatDateIfExists(date: string): string {
        if (date)
            return longLocaleDateFormat(date);
        return '';
    }

    return (
        <div className='userEventCard'>
            <div className='mainCon'>
                <div className='imageCon visualiseImage'>
                    {props.loading ?
                        <ZiwgSkeleton containerClassName='userEventCardImageSkeleton' /> :
                        <Image src={props.eventData?.mainImage} />
                    }
                </div>
                <div className='textCon'>
                    <h1 className='title'>
                        {props.loading ?
                            <ZiwgSkeleton width={200} /> :
                            'Test name ' + props.eventData?.name
                        }
                    </h1>
                    <p className='location date'>
                        {props.loading ?
                            <ZiwgSkeleton width={400} /> :
                            'Blah ' + formatDateIfExists(props.eventData?.startDate) + '-' + formatDateIfExists(props.eventData?.endDate)}
                    </p>
                </div>
            </div>

            <div className='secondaryCon'>
                {props.loading ? <ZiwgSkeleton width={200} containerClassName='secondaryConSkeleton' /> : <Link to={'/user/userEvents/' + props.eventData?.id}> Show information</Link>}
            </div>
        </div >
    );
}
