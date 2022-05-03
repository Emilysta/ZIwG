import * as React from 'react';
import './EventTile.scss'
import { Image } from 'Components/Image'
import { Link } from 'react-router-dom';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { EventDataSimple } from 'Utils/EventData';
import ZiwgSkeleton from 'Utils/Skeletons';

type LinkButtonProps = { to: string };

function LinkButton(props: LinkButtonProps) {
    return <Link to={props.to}><BoxArrowRight /></Link>;
}

type EventTileProps = {
    data?: EventDataSimple,
    isLoading?: boolean,
}

export default function EventTile(props: EventTileProps) {

    return (
        <div className='eventTile'>
            <div className='imageCon'>
                <Image src="http://placeimg.com/640/480/transport" isLoading={props.isLoading} />
            </div>
            <div className='title'>
                {props.isLoading && <ZiwgSkeleton />}
                {!props.isLoading && 'brjkhtg'}
                {/* //{props.data.EventName} */}
            </div>
            <div className='organizer'>

                {props.isLoading && <ZiwgSkeleton containerClassName='img' />}
                {!props.isLoading && <Image className='img' src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/846.jpg" />}

                {props.isLoading && <ZiwgSkeleton containerClassName='text' />}
                {!props.isLoading && <p className='text'>nriu {/* {props.data.OrganizerName} */}</p>}

            </div>
            <div className='details'>
                {props.isLoading && <div className='detailsDate'><ZiwgSkeleton /><ZiwgSkeleton /></div>}
                {!props.isLoading && <div className='detailsDate'>
                    <p>From: <strong>15.05.2022</strong></p>
                    <p>To: <strong>21.05.2022</strong></p>
                </div>}
                <div>
                    {props.isLoading && <ZiwgSkeleton />}
                    {!props.isLoading && <LinkButton to={`${props.data.EventId}`} />}
                </div>
            </div>
        </div>
    );
}
