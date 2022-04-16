import MainEventBox from 'Components/EventPage/MainEventBox';
import ButtonWithIcon, { ButtonStyle } from 'Components/Input/ButtonWithIcon';
import ToggleButtonWithText from 'Components/Input/ToggleButtonWithText';
import * as React from 'react';
import { XLg, PlusLg } from 'react-bootstrap-icons';
import './UserAddEventPage.scss';

export default function UserAddEventPage() {
    return (
        <div className='userAddEventPage'>
            <MainEventBox className="mainBox" />
            <div className='sideBox'>
                <div className='togglesBox'>
                    <ToggleButtonWithText fieldDesc='Public event' startIsToggled={true} />
                    <ToggleButtonWithText fieldDesc='Paid ticket' startIsToggled={false} />
                    <ToggleButtonWithText fieldDesc='Limit tickets' startIsToggled={false} />
                </div>

                <div className="finishAddingButtonBox">
                    <ButtonWithIcon text="Cancel" isActive={true} icon={<XLg fill='white' />} style={ButtonStyle.Border} />
                    <ButtonWithIcon text="Create event" isActive={true} icon={<PlusLg fill='white' />} style={ButtonStyle.Filled} />
                </div>
            </div>
        </div>
    )
}
