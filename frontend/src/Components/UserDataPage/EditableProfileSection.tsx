import { ErrorMsg } from 'Components/Input/ErrorMsg';
import { MenuButton } from 'Components/Input/MenuButton';
import * as React from 'react';
import { Person } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import ZiwgSkeleton from 'Utils/Skeletons';
import { RootState, useAppDispatch, useAppSelector } from 'Utils/Store';
import { EditableUserData, updateUserThunk, userApi } from 'Utils/UserApiSlice';
import "./EditableProfileSection.scss"
import ToggleTextarea from './ToggleTextarea';



export function EditableProfileSection(props: any) {

    const data = useAppSelector((state: RootState) => state.userLogin.userData);
    const [changeDataRequest, response] = userApi.useChangeUserDataMutation()
    const [deleteUserRequest] = userApi.useDeleteUserMutation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [user, setUser]: [EditableUserData, any] = React.useState(
        {
            displayName: data.displayName,
            description: data.description,
            location: data.location,
        })

    const [disabled, setEnabled]: [boolean, any] = React.useState(true)

    const onToggle = () => setEnabled(!disabled)
    const onChange = (e: any) => setUser({ ...user, [e.target.name]: e.target.value })
    const onSave = () => {
        changeDataRequest(user).unwrap()
            .then(
                () => {
                    dispatch(updateUserThunk())
                    onToggle();
                }
            )
            .catch((err) => { console.error(err); console.log(response); })
    }
    const onDelete = () => {
        if (window.confirm("Are you sure to delete account?")) {
            deleteUserRequest().unwrap()
                .then((data) => navigate('/'))
                .catch((err) => console.log(err))
        }
    }

    const onCancel = () => {
        setUser(
            {
                displayName: data.displayName,
                description: data.description,
                location: data.location,
            })
        onToggle();
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
                            <input type="text" disabled={disabled} value={user.displayName ?? ""} maxLength={25} name="displayName" onChange={onChange} />}
                    </span>
                </div>
                <div className='profileData'>
                    <label>Location</label>
                    <span>
                        {!user ? <ZiwgSkeleton /> :
                            <input type="text" disabled={disabled} value={user.location ?? ""} maxLength={25} name="location" onChange={onChange} />}
                    </span>
                </div>

                <hr />

                <div className='profileData'>
                    <label>Description</label>
                    <span>
                        {!user ? <ZiwgSkeleton /> : <ToggleTextarea disabled={disabled} value={user.description ?? ""} maxLength={150} name="description" onChange={onChange} />}
                    </span>
                </div>

                <div className='profileData' hidden={disabled}>
                    <label>Options</label>
                    <MenuButton value="Change password" onClick={wip} />
                    <MenuButton value="Delete account" onClick={onDelete} />
                </div>
            </div>
            <div id="buttonMenu">
                <span hidden={disabled}>
                    <MenuButton value="Cancel" onClick={onCancel} />
                </span>
                <MenuButton value={disabled ? "Edit profile" : "Save"} onClick={disabled ? onToggle : onSave} />
            </div>
        </section>
    );
}
