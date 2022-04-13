import { MenuButton } from 'Components/Input/MenuButton';
import * as React from 'react';
import { Person } from 'react-bootstrap-icons';
import "./EditableProfileSection.scss"
import ToggleTextarea from './ToggleTextarea';

type State = {
    disabled: boolean,
    name: string,
    location: string,
    description: string
}

export function EditableProfileSection(props: any) {

    const [state, setState]: [State, any] = React.useState({
        disabled: true,
        name: "Jan Kowalski",
        location: "Wrocław, Dolnośląskie, Polska",
        description: "Voluptate a debitis ipsum eum quis enim iure. Sunt voluptatem in ad ut voluptatem maiores nihil. Eos sapiente accusantium quis ut quae. Officiis quos aut sit eos nesciunt alias similique similique."
    })

    const onClick = () => {
        setState({
            ...state,
            disabled: !state.disabled
        })
        console.log(state)
    }

    const onChange = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
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
                        <input type="text" disabled={state.disabled} value={state.name} name="name" onChange={onChange} />
                    </span>
                </div>
                <div className='profileData'>
                    <label>Location</label>
                    <span>
                        <input type="text" disabled={state.disabled} value={state.location} name="location" onChange={onChange} />
                    </span>
                </div>

                <hr />

                <div className='profileData'>
                    <label>Description</label>
                    <span>
                        <ToggleTextarea disabled={state.disabled} value={state.description} name="description" onChange={onChange} />
                    </span>
                </div>

                <div className='profileData' hidden={state.disabled}>
                    <label>Options</label>
                    <MenuButton value="Change password" onClick={null} />
                    <MenuButton value="Delete account" onClick={null} />
                </div>
            </div>
            <div id="buttonMenu">
                <span hidden={state.disabled}>
                    <MenuButton value="Cancel" onClick={null} />
                </span>
                <MenuButton value={state.disabled ? "Edit profile" : "Save"} onClick={onClick} />
            </div>
        </section>
    );
}
