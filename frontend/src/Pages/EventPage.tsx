import * as React from 'react';
import { useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
import './EventPage.scss';
import { useGetEventQuery } from 'Utils/EventAPISlice';
import Dropdown from 'Components/Dropdown';
import LeafletBoxWithPopup from 'Components/EventPage/LeafletBoxWithPopup';
import { StarFill, X } from 'react-bootstrap-icons';
import { RootState, useAppSelector } from 'Utils/Store';
import { MenuButton } from 'Components/Input/MenuButton';

export default function EventPage() {
    const [isReadOnly, setReadOnly]: [boolean, any] = React.useState(true)

    const { id } = useParams();
    const { data, error, isLoading } = useGetEventQuery(id);
    const userName = useAppSelector((state: RootState) => state.userLogin.userData.displayName)

    const isOrganiser = data && data.organiserName == userName;
    const edit = () => isOrganiser && setReadOnly(false)
    const save = () => setReadOnly(true)

    if (error)
        return <div className='eventPage'>
            <h2 className='errorText'>
                Oh no, there was an error, while fetching data </h2>
        </div>
    else {
        return (
            <div className='eventPage'>
                <MainEventBox className="mainBox" values={data ?? {}} isReadOnly={isReadOnly} isLoading={isLoading} />
                <div className='sideBox'>
                    <Dropdown items={[{ text: 'Not interested', icon: <X /> }, { text: 'Interested', icon: '' }, { text: 'Going', icon: <StarFill /> }]} initialSelected={-1} initialState={false} isLoading={isLoading} />
                    <LeafletBoxWithPopup mapID='mapEvent' isLoading={isLoading} />
                    {isOrganiser && isReadOnly && <MenuButton onClick={edit} value="Modify" />}
                    {!isReadOnly && <MenuButton onClick={save} value="Save" />}
                </div>
            </div>
        )
    }
}


