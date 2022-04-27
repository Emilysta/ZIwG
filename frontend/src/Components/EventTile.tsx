import * as React from 'react';
import './EventTile.scss'
import { Image } from 'Components/Image'
import { Link } from 'react-router-dom';
import { BoxArrowRight } from 'react-bootstrap-icons';

type LinkButtonProps = { to: string };

function LinkButton(props: LinkButtonProps) {
    return <Link to={props.to}><BoxArrowRight /></Link>;
}

export default function EventTile(props: any) {
    return (
        <div className='eventTile'>
            <div className='imageCon'>
                <Image src="http://placeimg.com/640/480/transport" />
            </div>
            <div className='title'>
                Title
            </div>
            <div className='organizer'>
                <Image src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/846.jpg" />
                Organizator
            </div>
            <div className='details'>
                <div>
                    From: <strong>15.05.2022</strong><br />
                    To: <strong>21.05.2022</strong>
                </div>
                <div>
                    <LinkButton to='' />
                </div>
            </div>
        </div>
    );
}
