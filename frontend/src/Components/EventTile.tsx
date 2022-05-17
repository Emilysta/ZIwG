import * as React from 'react';
import './EventTile.scss'
import { Image } from 'Components/Image'
import { Link } from 'react-router-dom';
import { BoxArrowRight, Person } from 'react-bootstrap-icons';
import { EventDataSimple } from 'Utils/EventData';
import ZiwgSkeleton from 'Utils/Skeletons';
import { longLocaleDateFormat } from 'Utils/DateFormatter';

type LinkButtonProps = { to: string, isLoading?: boolean };

function LinkButton(props: LinkButtonProps) {
    if (props.isLoading)
        return <ZiwgSkeleton containerClassName='linkButtonSkeleton' />
    else
        return <Link to={props.to} className='detailsLinkAElement'><BoxArrowRight /></Link>;
}

type EventTileProps = {
    data?: EventDataSimple,
    isLoading?: boolean,
}

export default function EventTile(props: EventTileProps) {
    return (
        <div className='eventTile'>
            <div className='eventTileImageCon'>
                {props.isLoading && <ZiwgSkeleton containerClassName='eventTileImageSkeleton' />}
                {!props.isLoading && <Image src={props.data.mainImage} />}
            </div>
            <div className='title'>
                {props.isLoading && <ZiwgSkeleton />}
                {!props.isLoading && props.data.name}
            </div>
            <div className='organiser'>

                {props.isLoading && <ZiwgSkeleton containerClassName='imgSkeleton' circle={true} width={25} height={25} />}
                {!props.isLoading && <Person className='img' />}

                {props.isLoading && <ZiwgSkeleton containerClassName='text' />}
                {!props.isLoading && <p className='text'>{props.data.organiserName}</p>}

            </div>
            <div className='details'>
                {props.isLoading && <div className='detailsDate'><ZiwgSkeleton /><ZiwgSkeleton /></div>}
                {!props.isLoading && <div className='detailsDate'>
                    <p>From: <strong>{longLocaleDateFormat(props.data.startDate)}</strong></p>
                    <p>To: <strong>{longLocaleDateFormat(props.data.endDate)}</strong></p>
                </div>}
                <div className='detailsLink'>
                    <LinkButton to={`${props.data?.id}`} isLoading={props.isLoading} />
                </div>
            </div>
        </div>
    );
}
