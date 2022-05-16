import * as React from 'react';
import { useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
import './EventPage.scss';
import { useGetEventQuery, useModifyEventMutation } from 'Utils/EventAPISlice';
import Dropdown from 'Components/Dropdown';
import LeafletBoxWithPopup from 'Components/EventPage/LeafletBoxWithPopup';
import { StarFill, X } from 'react-bootstrap-icons';
import { RootState, useAppSelector } from 'Utils/Store';
import { MenuButton } from 'Components/Input/MenuButton';
import { EventData } from 'Utils/EventData';

export default function EventPage() {
    const [isReadOnly, setReadOnly]: [boolean, any] = React.useState(true)
    const [values, setValues] = React.useState<EventData>(null)

    const { id } = useParams();
    const { data, error, isLoading } = useGetEventQuery(id);
    React.useEffect(() => setValues(data), [data])

    const userName = useAppSelector((state: RootState) => state.userLogin?.userData?.displayName)

    const [editRequest] = useModifyEventMutation()

    const isOrganiser = values && values.organiserName === userName;
    const edit = () => isOrganiser && setReadOnly(false)
    const save = () => {
        editRequest({
            eventId: values.id,
            data: values
        }).unwrap()
            .then((res) => setReadOnly(true))
            .catch((err) => console.error(err))
    }

    const onEdit = (id: string, value: string) => {
        console.log("Update: ", id, " ", value)
        setValues({ ...values, [id]: value })
    }
    let location: { lat: number, lon: number };
    if (values?.place) {
        try {
            location = JSON.parse(values.place);
        }
        catch {
            console.log('error');
        }
    }
    console.log(values);
    if (error)
        return <div className='eventPage'>
            <h2 className='errorText'>
                Oh no, there was an error, while fetching data </h2>
        </div>
    else {
        return (
            <div className='eventPage'>
                <MainEventBox className="mainBox" values={values ?? {}} isReadOnly={isReadOnly} isLoading={isLoading} onValuesChange={onEdit} />
                <div className='sideBox'>
                    <Dropdown items={[{ text: 'Not interested', icon: <X /> }, { text: 'Interested', icon: '' }, { text: 'Going', icon: <StarFill /> }]} initialSelected={-1} initialState={false} isLoading={isLoading} />
                    <LeafletBoxWithPopup mapID='mapEvent' isLoading={isLoading} point={location} />
                    {isOrganiser && isReadOnly && <MenuButton onClick={edit} value="Modify" />}
                    {!isReadOnly && <MenuButton onClick={save} value="Save" className="save" />}
                </div>
            </div>
        )
    }
}


