import { MenuButton } from 'Components/Input/MenuButton';
import * as React from 'react';
import { Person } from 'react-bootstrap-icons';
import "./EditableProfileSection.scss"
import ToggleTextarea from './ToggleTextarea';

export function EditableProfileSection(props: any) {

    const [state, setState] = React.useState({disabled: true})

    const onClick = () => {
        setState({disabled: !state.disabled})
    }

    return (
        <section className='profileSection'>
            <div className='leftColumn'>
                <div>
                    <Person id="profilePicture" />
                </div>
            </div>
            <div className='rightColumn'>
                <div className='profileData'>
                    <label>Name</label>
                    <span>
                        <input type="text" disabled={state.disabled} defaultValue='Jan Kowalski' />
                    </span>
                </div>
                <div className='profileData'>
                    <label>Location</label>
                    <span>
                        <input type="text" disabled={state.disabled} defaultValue='Wrocław, Woj. Dolnośląskie, Polska' />
                    </span>
                </div>

                <hr />

                <div className='profileData'>
                    <label>Description</label>
                    <span>
                        <ToggleTextarea disabled={state.disabled} />
                    </span>
                </div>
            </div>
            <div id="buttonMenu">
                <MenuButton value={state.disabled ? "Edit profile" : "Save"} onClick={onClick} />
            </div>
        </section>
    );
}
