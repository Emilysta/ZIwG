import { MenuButton } from 'Components/Input/MenuButton';
import SimpleEditableInput from 'Components/Input/SimpleEditableInput';
import * as React from 'react';
import { Person } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import ZiwgSkeleton from 'Utils/Skeletons';
import { RootState, useAppDispatch, useAppSelector } from 'Utils/Store';
import { updateUserThunk, userApi } from 'Utils/UserApiSlice';
import "./EditableProfileSection.scss"

const reducer = (state, action) => {
    if (action.type === "set") {
        return action.data;
    }
    const result = { ...state };
    result[action.type] = action.value;
    return result;
};

export function EditableProfileSection(props: any) {
    const data = useAppSelector((state: RootState) => state.userLogin.userData);
    const [changeDataRequest, response] = userApi.useChangeUserDataMutation()
    const [deleteUserRequest] = userApi.useDeleteUserMutation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [user, setUser] = React.useReducer(reducer,
        {
            displayName: data.displayName,
            description: data.description,
            location: data.location,
        });

    const [disabled, setEnabled] = React.useState(true);

    const onToggle = () => setEnabled(!disabled)

    const onChange = (name: string, value: any) => {
        console.log(`name: ${name} val: ${value}`);
        setUser({ type: name, value })
    }

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
        onToggle();
        setUser({ type: 'set', data });

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
                    <span>
                        {!user ? <ZiwgSkeleton /> : <SimpleEditableInput inputClassName='userDisplayNameInputBox' id={'displayName'} inputDescription='Name' defaultValue={user.displayName ?? ""} onChangeAction={(id, value) => onChange(id, value)} isReadOnly={disabled} maxChars={25} delayTime={1000} />}
                    </span>
                </div>
                <div className='profileData'>
                    <span>
                        {!user ? <ZiwgSkeleton /> : <SimpleEditableInput inputClassName='userLocInputBox' id={'location'} inputDescription='Location' defaultValue={user.location ?? ""} onChangeAction={(id, value) => onChange(id, value)} isReadOnly={disabled} maxChars={25} delayTime={1000} />}
                    </span>
                </div>
                <div className='profileData'>
                    <span>
                        {!user ? <ZiwgSkeleton /> : <SimpleEditableInput inputClassName='userDescInputBox' id={'description'} inputDescription='Description' defaultValue={user.description ?? ""} onChangeAction={(id, value) => onChange(id, value)} isReadOnly={disabled} maxChars={150} delayTime={1000} />}
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
