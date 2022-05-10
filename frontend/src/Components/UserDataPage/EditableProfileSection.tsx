import { MenuButton } from 'Components/Input/MenuButton';
import * as React from 'react';
import { Person } from 'react-bootstrap-icons';
import ZiwgSkeleton from 'Utils/Skeletons';
import { userApi, UserData } from 'Utils/UserApiSlice';
import "./EditableProfileSection.scss"
import ToggleTextarea from './ToggleTextarea';

export function EditableProfileSection(props: any) {

    const { data, error, isLoading } = userApi.useGetUserDataQuery()
    const [changeDataRequest, changeDataResult] = userApi.useChangeUserDataMutation()

    const [user, setUser]: [UserData, any] = React.useState(data)
    const [disabled, setEnabled]: [boolean, any] = React.useState(true)

    React.useEffect(() => setUser(data), [data])

    const onToggle = () => setEnabled(!disabled)
    const onChange = (e: any) => setUser({ ...user, [e.target.name]: e.target.value })
    const onSave = () => {
        changeDataRequest(user).unwrap()
            .then((_) => onToggle())
            .catch((err) => console.error(err))
    }
    const wip = () => alert("Work in progress")

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
                        {!user ? <ZiwgSkeleton /> :
                            <input type="text" disabled={disabled} value={user.displayName ?? ""} name="name" onChange={onChange} />}
                    </span>
                </div>
                <div className='profileData'>
                    <label>Location</label>
                    <span>
                        {!user ? <ZiwgSkeleton /> :
                            <input type="text" disabled={disabled} value={user.location ?? ""} name="location" onChange={onChange} />}
                    </span>
                </div>

                <hr />

                <div className='profileData'>
                    <label>Description</label>
                    <span>
                        {!user ? <ZiwgSkeleton /> :
                            <ToggleTextarea disabled={disabled} value={user.description ?? ""} name="description" onChange={onChange} />}
                    </span>
                </div>

                <div className='profileData' hidden={disabled}>
                    <label>Options</label>
                    <MenuButton value="Change password" onClick={wip} />
                    <MenuButton value="Delete account" onClick={wip} />
                </div>
            </div>
            <div id="buttonMenu">
                <span hidden={disabled}>
                    <MenuButton value="Cancel" onClick={onToggle} />
                </span>
                <MenuButton value={disabled ? "Edit profile" : "Save"} onClick={disabled ? onToggle : onSave} />
            </div>
        </section>
    );
}
