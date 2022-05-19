import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import MainEventBox from 'Components/EventPage/MainEventBox';
import './EventPage.scss';
import { useAddEventMainImageMutation, useGetEventQuery, useModifyEventMutation } from 'Utils/EventAPISlice';
import Dropdown from 'Components/Dropdown';
import { StarFill, X } from 'react-bootstrap-icons';
import { RootState, useAppSelector } from 'Utils/Store';
import { MenuButton } from 'Components/Input/MenuButton';
import { EventData } from 'Utils/EventData';
import { subscribeToEvent, unsubscribeFromEvent } from 'Utils/UserApiSlice';

export default function EventPage() {
    const [isReadOnly, setReadOnly]: [boolean, any] = React.useState(true)
    const [values, setValues] = React.useState<EventData>(null)

    const { id } = useParams();
    const { data, error, isLoading } = useGetEventQuery(id);
    React.useEffect(() => setValues(data), [data])

    const userId = useAppSelector((state: RootState) => state.userLogin.userId)

    const [editRequest] = useModifyEventMutation()
    const [pushImageRequest] = useAddEventMainImageMutation()

    const isOrganiser = values && values.organiserId === userId;
    console.log(isOrganiser);

    const edit = () => isOrganiser && setReadOnly(false)
    const save = () => {
        editRequest({
            eventId: values.id,
            data: values
        }).unwrap()
            .then((res) => {
                if (values.mainImage != null) {
                    let formData = new FormData();
                    formData.append('files', values.mainImage);
                    pushImageRequest({
                        eventId: values.id,
                        image: formData
                    }).then((_) => setReadOnly(true))
                }
                setReadOnly(true)
            })
            .catch((err) => console.error(err))
    }

    const onEdit = (id: string, value: string) => {
        setValues({ ...values, [id]: value })
    }

    function onSelectionChange(selectedIndex: number) {
        console.log(selectedIndex);
        if (selectedIndex === 1)
            subscribeToEvent(values.id);
        else if (selectedIndex === 0)
            unsubscribeFromEvent(values.id);
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

    if (error)
        return <div className='eventPage'>
            <h2 className='errorText'>
                Oh no, there was an error, while fetching data </h2>
        </div>
    else {
        return (
            <>
                <div className='eventPage'>
                    <MainEventBox className="mainBox" values={values ?? {}} isReadOnly={isReadOnly} isLoading={isLoading} onValuesChange={onEdit} />
                    <div className='sideBox'>
                        {!isOrganiser && <Dropdown items={[{ text: 'Not interested', icon: <X /> }, { text: 'Going', icon: <StarFill /> }]} initialSelected={-1} initialState={false} isLoading={isLoading} onSelectionChange={onSelectionChange} />}
                        {/* <LeafletBoxWithPopup mapID='mapEvent' isLoading={isLoading} point={location} /> */}
                        {isOrganiser && isReadOnly && <MenuButton onClick={edit} value="Modify" />}
                        {!isReadOnly && <MenuButton onClick={save} value="Save" className="save" />}
                    </div>
                </div>
            </>
        )
    }
}


