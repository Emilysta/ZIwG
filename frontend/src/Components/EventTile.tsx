import * as React from 'react';
import './EventTile.scss'
import { Image } from 'Components/Image'
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    function onClickRedirect() {
        navigate(`/events/${props.data?.id}`);
    }

    return (
        <div className='eventTile'>
            <div className='eventTileImageCon' style={{ cursor: 'pointer' }} >
                {props.isLoading && <ZiwgSkeleton containerClassName='eventTileImageSkeleton' />}
                {!props.isLoading && <Image src={props.data?.mainImage} onClick={onClickRedirect} />}
            </div>
            <div className='title'>
                {props.isLoading && <ZiwgSkeleton />}
                {!props.isLoading && <p onClick={onClickRedirect} >{props.data?.name}</p>}
            </div>
            <div className='organiser'>

                {props.isLoading && <ZiwgSkeleton containerClassName='imgSkeleton' circle={true} width={25} height={25} />}
                {!props.isLoading && <Person className='img' />}

                {props.isLoading && <ZiwgSkeleton containerClassName='text' />}
                {!props.isLoading && <p className='text'>{props.data?.organiserName}</p>}

            </div>
            <div className='details'>
                {props.isLoading && <div className='detailsDate'><ZiwgSkeleton /><ZiwgSkeleton /></div>}
                {!props.isLoading && <div className='detailsDate'>
                    <p>From: <strong>{longLocaleDateFormat(props.data?.startDate, true)}</strong></p>
                    <p>To: <strong>{longLocaleDateFormat(props.data?.endDate, true)}</strong></p>
                </div>}
                <div className='detailsLink'>
                    <LinkButton to={`/events/${props.data?.id}`} isLoading={props.isLoading} />
                </div>
            </div>
        </div >
    );
}
